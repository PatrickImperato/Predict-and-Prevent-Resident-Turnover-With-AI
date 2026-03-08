from __future__ import annotations

from datetime import datetime, timedelta, timezone
import hashlib
import hmac
import secrets
import uuid

import bcrypt
from fastapi import HTTPException, Request, Response, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import AppConfig
from app.services.audit_service import write_audit_event


FOUNDATION_USERS = [
    {
        "id": "5ef29d39-94c9-4fb4-bcad-fc48664fb9de",
        "email": "admin@happyco.com",
        "password": "admin123",
        "displayName": "HappyCo Admin",
        "role": "admin",
        "isSuperAdmin": True,
        "isDemo": True,
        "defaultPropertyId": None,
    },
    {
        "id": "ed940c9d-c58c-4b58-920a-8511a6eaf989",
        "email": "sarah.mitchell@riverside.com",
        "password": "manager123",
        "displayName": "Sarah Mitchell",
        "role": "manager",
        "isSuperAdmin": False,
        "isDemo": True,
        "defaultPropertyId": None,
    },
    {
        "id": "0c7b51d0-f5eb-4e3b-88d8-7474c95fe157",
        "email": "alex.chen@email.com",
        "password": "demo123",
        "displayName": "Alex Chen",
        "role": "resident",
        "isSuperAdmin": False,
        "isDemo": True,
        "defaultPropertyId": None,
    },
]


def hash_password(raw_password: str) -> str:
    return bcrypt.hashpw(raw_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def _verify_password(raw_password: str, stored_hash: str) -> bool:
    if not stored_hash:
        return False

    try:
        return bcrypt.checkpw(raw_password.encode("utf-8"), stored_hash.encode("utf-8"))
    except ValueError:
        return False


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def _hash_session_token(raw_token: str, session_secret: str) -> str:
    return hmac.new(
        session_secret.encode("utf-8"),
        raw_token.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()


async def ensure_foundation_users(db: AsyncIOMotorDatabase, config: AppConfig) -> None:
    timestamp = utc_now()

    for user in FOUNDATION_USERS:
        existing = await db.users.find_one({"email": user["email"]})
        base_payload = {
            "displayName": user["displayName"],
            "role": user["role"],
            "isSuperAdmin": user["isSuperAdmin"],
            "isDemo": user["isDemo"],
            "defaultPropertyId": user["defaultPropertyId"],
            "datasetId": config.demo_dataset_id,
            "updatedAt": timestamp,
        }

        if existing:
            if not existing.get("passwordHash"):
                base_payload["passwordHash"] = hash_password(user["password"])
            await db.users.update_one({"email": user["email"]}, {"$set": base_payload})
            continue

        await db.users.insert_one(
            {
                "id": user["id"],
                "email": user["email"],
                "passwordHash": hash_password(user["password"]),
                "displayName": user["displayName"],
                "role": user["role"],
                "isSuperAdmin": user["isSuperAdmin"],
                "isDemo": user["isDemo"],
                "defaultPropertyId": user["defaultPropertyId"],
                "datasetId": config.demo_dataset_id,
                "createdAt": timestamp,
                "updatedAt": timestamp,
                "lastLoginAt": None,
            }
        )


async def _build_session_response(db: AsyncIOMotorDatabase, user: dict | None, config: AppConfig) -> dict:
    if not user:
        return {
            "authenticated": False,
            "user_id": None,
            "email": None,
            "display_name": None,
            "role": None,
            "is_super_admin": False,
            "default_property_id": None,
            "last_login_at": None,
            "retention_credit": None,
            "app_env": config.app_env,
            "demo_mode_enabled": config.demo_mode_enabled,
            "admin_route_base": "/app/admin",
        }

    # Build retention credit data if user is a resident
    retention_credit = None
    if user.get("role") == "resident":
        # Fetch resident record to get retention credit data
        resident = await db.residents.find_one({"userId": user.get("id")})
        if resident and resident.get("retentionCredit"):
            credit_data = resident.get("retentionCredit", {})
            retention_credit = {
                "amount": credit_data.get("amount", 0),
                "original_amount": credit_data.get("originalAmount", 35),
                "used_amount": credit_data.get("usedAmount", 0),
                "reason": credit_data.get("reason", "Retention reward"),
                "expires_at": credit_data.get("expiresAt"),
                "offer_id": credit_data.get("offerId"),
            }

    return {
        "authenticated": True,
        "user_id": user.get("id"),
        "email": user.get("email"),
        "display_name": user.get("displayName"),
        "role": user.get("role"),
        "is_super_admin": bool(user.get("isSuperAdmin", False)),
        "default_property_id": user.get("defaultPropertyId"),
        "last_login_at": user.get("lastLoginAt"),
        "retention_credit": retention_credit,
        "app_env": config.app_env,
        "demo_mode_enabled": config.demo_mode_enabled,
        "admin_route_base": "/app/admin",
    }


async def authenticate_user(
    db: AsyncIOMotorDatabase,
    config: AppConfig,
    email: str,
    password: str,
) -> dict:
    user = await db.users.find_one({"email": email.lower()})
    if not user or not _verify_password(password, user.get("passwordHash", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    await db.users.update_one(
        {"id": user["id"]},
        {"$set": {"lastLoginAt": utc_now(), "updatedAt": utc_now()}},
    )
    refreshed = await db.users.find_one({"id": user["id"]})
    return refreshed or user


async def create_session(
    db: AsyncIOMotorDatabase,
    config: AppConfig,
    user: dict,
    response: Response,
    request: Request,
) -> dict:
    raw_session_token = secrets.token_urlsafe(32)
    session_token_hash = _hash_session_token(raw_session_token, config.session_secret)
    created_at = utc_now()
    expires_at = created_at + timedelta(hours=config.session_ttl_hours)

    await db.auth_sessions.insert_one(
        {
            "id": str(uuid.uuid4()),
            "userId": user["id"],
            "sessionTokenHash": session_token_hash,
            "createdAt": created_at,
            "updatedAt": created_at,
            "expiresAt": expires_at,
            "userAgent": request.headers.get("user-agent"),
            "ipAddress": request.client.host if request.client else None,
        }
    )

    # Set cookie with domain that works for both preview and production
    cookie_config = {
        "key": config.session_cookie_name,
        "value": raw_session_token,
        "httponly": True,
        "secure": True,
        "samesite": "none",  # Changed from "lax" to "none" for cross-domain
        "max_age": config.session_ttl_hours * 3600,
        "path": "/",
    }
    
    response.set_cookie(**cookie_config)

    await write_audit_event(
        db,
        action="auth.login",
        status="success",
        actor_user_id=user.get("id"),
        actor_email=user.get("email"),
        meta={"appEnv": config.app_env},
    )

    return await _build_session_response(db, user, config)


async def get_session_user(
    request: Request,
    db: AsyncIOMotorDatabase,
    config: AppConfig,
) -> dict | None:
    raw_token = request.cookies.get(config.session_cookie_name)
    if not raw_token:
        return None

    session_token_hash = _hash_session_token(raw_token, config.session_secret)
    session_doc = await db.auth_sessions.find_one(
        {
            "sessionTokenHash": session_token_hash,
            "expiresAt": {"$gt": utc_now()},
        }
    )
    if not session_doc:
        return None

    await db.auth_sessions.update_one(
        {"id": session_doc["id"]},
        {"$set": {"updatedAt": utc_now()}},
    )

    user = await db.users.find_one({"id": session_doc["userId"]}, {"_id": 0})
    return user


async def get_session_response(
    request: Request,
    db: AsyncIOMotorDatabase,
    config: AppConfig,
) -> dict:
    user = await get_session_user(request, db, config)
    return await _build_session_response(db, user, config)


async def logout_current_session(
    request: Request,
    response: Response,
    db: AsyncIOMotorDatabase,
    config: AppConfig,
) -> dict:
    current_user = await get_session_user(request, db, config)
    raw_token = request.cookies.get(config.session_cookie_name)

    if raw_token:
        session_token_hash = _hash_session_token(raw_token, config.session_secret)
        await db.auth_sessions.delete_one({"sessionTokenHash": session_token_hash})

    # Delete cookie with same settings as when it was set
    response.delete_cookie(
        key=config.session_cookie_name,
        path="/",
        domain=None,
        secure=True,
        httponly=True,
        samesite="none",  # Match the cookie creation settings
    )

    await write_audit_event(
        db,
        action="auth.logout",
        status="success",
        actor_user_id=current_user.get("id") if current_user else None,
        actor_email=current_user.get("email") if current_user else None,
        meta={"appEnv": config.app_env},
    )

    return {"message": "Signed out successfully"}
