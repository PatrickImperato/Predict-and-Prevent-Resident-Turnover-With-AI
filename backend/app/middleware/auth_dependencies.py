from fastapi import Depends, HTTPException, Request, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import get_config
from app.core.database import get_database
from app.services.auth_service import get_session_user


async def get_optional_current_user(
    request: Request,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    return await get_session_user(request, db, get_config())


async def require_authenticated_user(
    current_user: dict | None = Depends(get_optional_current_user),
):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
        )
    return current_user


async def require_admin(current_user: dict = Depends(require_authenticated_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin role required",
        )
    return current_user


async def require_super_admin(current_user: dict = Depends(require_admin)):
    if not bool(current_user.get("isSuperAdmin", False)):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super-admin role required",
        )
    return current_user
