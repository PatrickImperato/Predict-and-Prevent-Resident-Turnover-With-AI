from __future__ import annotations

from datetime import datetime, timezone

from fastapi import Request
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import AppConfig
from app.seeds.constants import DEMO_DATASET_ID, REQUIRED_PROPERTY_NAMES, SEED_METADATA_NAME
from app.seeds.production_bootstrap import get_production_bootstrap_placeholder_state


KNOWN_COLLECTIONS = [
    "users",
    "auth_sessions",
    "properties",
    "units",
    "residents",
    "bookings",
    "providers",
    "services",
    "offers",
    "platform_settings",
    "property_settings",
    "property_economics",
    "property_metrics",
    "retention_offers",
    "maintenance_history",
    "maintenance_tickets",
    "monthly_revenue",
    "receipts",
    "service_vendors",
    "consent_records",
    "churn_prediction_history",
    "churn_score_history",
    "discount_impacts",
    "interventions_log",
    "concierge_messages",
    "audit_events",
    "seed_metadata",
]

DATASET_TRACKED_COLLECTIONS = [
    "users",
    "properties",
    "units",
    "residents",
    "providers",
    "offers",
    "platform_settings",
    "property_settings",
    "property_economics",
    "property_metrics",
    "maintenance_history",
    "monthly_revenue",
    "churn_prediction_history",
    "churn_score_history",
    "discount_impacts",
    "interventions_log",
    "concierge_messages",
]


def _request_host(request: Request) -> str:
    return (
        request.headers.get("x-forwarded-host")
        or request.headers.get("host")
        or request.url.hostname
        or "unknown"
    )


def get_runtime_diagnostics(config: AppConfig, request: Request) -> dict:
    return {
        "app_env": config.app_env,
        "host": _request_host(request),
        "db_name": config.db_name,
        "build_channel": config.build_channel,
        "app_version": config.app_version,
        "app_build_id": config.app_build_id,
        "app_build_time": config.app_build_time,
        "demo_mode_enabled": config.demo_mode_enabled,
        "allow_preview_reset": config.allow_preview_reset,
        "dataset_default": config.demo_dataset_id,
        "config_status": "valid",
    }


async def get_session_diagnostics(user: dict) -> dict:
    return {
        "authenticated": True,
        "user_id": user.get("id"),
        "email": user.get("email"),
        "display_name": user.get("displayName"),
        "role": user.get("role"),
        "is_super_admin": bool(user.get("isSuperAdmin", False)),
        "default_property_id": user.get("defaultPropertyId"),
        "last_login_at": user.get("lastLoginAt"),
    }


async def get_collections_diagnostics(
    db: AsyncIOMotorDatabase,
    config: AppConfig,
) -> dict:
    collection_counts: dict[str, int] = {}
    dataset_breakdown: dict[str, dict[str, int]] = {}
    missing_dataset_id_counts: dict[str, int] = {}

    for collection_name in KNOWN_COLLECTIONS:
        collection = db[collection_name]
        total_count = await collection.count_documents({})
        collection_counts[collection_name] = total_count

        if collection_name not in DATASET_TRACKED_COLLECTIONS:
            continue

        pipeline = [
            {
                "$group": {
                    "_id": {"$ifNull": ["$datasetId", "__missing__"]},
                    "count": {"$sum": 1},
                }
            }
        ]
        grouped = await collection.aggregate(pipeline).to_list(length=None)
        normalized_breakdown = {
            str(item.get("_id")): int(item.get("count", 0)) for item in grouped
        }
        dataset_breakdown[collection_name] = normalized_breakdown
        missing_dataset_id_counts[collection_name] = normalized_breakdown.get(
            "__missing__", 0
        )

    required_property_names = await db.properties.distinct(
        "name", {"datasetId": DEMO_DATASET_ID}
    )
    missing_required_properties = [
        property_name
        for property_name in REQUIRED_PROPERTY_NAMES
        if property_name not in required_property_names
    ]

    seed_health = "healthy"
    if any(missing_dataset_id_counts.values()) or missing_required_properties:
        seed_health = "warning"

    return {
        "db_name": config.db_name,
        "checked_at": datetime.now(timezone.utc),
        "collection_counts": collection_counts,
        "dataset_breakdown": dataset_breakdown,
        "missing_dataset_id_counts": missing_dataset_id_counts,
        "seed_health": seed_health,
    }


async def get_seed_diagnostics(
    db: AsyncIOMotorDatabase,
    config: AppConfig,
) -> dict:
    seed_metadata = await db.seed_metadata.find_one({"name": SEED_METADATA_NAME}, {"_id": 0})
    production_placeholder = get_production_bootstrap_placeholder_state()
    if seed_metadata:
        return {
            "last_seed_action": seed_metadata.get("lastSeedAction", "startup-seed"),
            "last_seed_target_env": seed_metadata.get("lastSeedTargetEnv", config.app_env),
            "last_seed_dataset_id": seed_metadata.get(
                "lastSeedDatasetId", config.demo_dataset_id
            ),
            "last_seed_at": seed_metadata.get("lastSeedAt"),
            "last_seed_by": seed_metadata.get("lastSeedBy"),
            "seed_status": seed_metadata.get("seedStatus", "success"),
            "last_seed_error": seed_metadata.get("lastSeedError"),
            "bootstrap_lock_id": seed_metadata.get("bootstrapLockId"),
            "preview_reset_implemented": True,
            "production_bootstrap_implemented": production_placeholder["implemented"],
            "production_bootstrap_mode": production_placeholder["mode"],
        }

    return {
        "last_seed_action": "not_run",
        "last_seed_target_env": config.app_env,
        "last_seed_dataset_id": config.demo_dataset_id,
        "last_seed_at": None,
        "last_seed_by": None,
        "seed_status": "not_run",
        "last_seed_error": None,
        "bootstrap_lock_id": None,
        "preview_reset_implemented": True,
        "production_bootstrap_implemented": production_placeholder["implemented"],
        "production_bootstrap_mode": production_placeholder["mode"],
    }


async def get_health_diagnostics(
    db: AsyncIOMotorDatabase,
    config: AppConfig,
) -> dict:
    await db.command("ping")
    return {
        "api_status": "healthy",
        "db_status": "connected",
        "env_status": "valid",
        "bound_db_name": config.db_name,
        "timestamp": datetime.now(timezone.utc),
    }
