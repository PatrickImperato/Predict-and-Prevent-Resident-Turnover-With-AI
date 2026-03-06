from __future__ import annotations

from datetime import datetime, timezone

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import AppConfig
from app.services.audit_service import write_audit_event
from app.seeds.constants import (
    DEMO_DATASET_ID,
    MANAGED_COLLECTIONS,
    PREVIEW_RESET_CONFIRMATION_PHRASE,
    SEED_METADATA_NAME,
)
from app.seeds.demo_dataset import build_demo_seed_documents
from app.seeds.production_bootstrap import get_production_bootstrap_placeholder_state
from app.seeds.validators import SeedValidationError, validate_seed_database_state, validate_seed_documents


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


INSERT_ORDER = [
    "platform_settings",
    "users",
    "properties",
    "units",
    "property_settings",
    "property_economics",
    "property_metrics",
    "residents",
    "providers",
    "services",
    "service_vendors",
    "maintenance_history",
    "churn_prediction_history",
    "churn_score_history",
    "concierge_messages",
    "interventions_log",
    "discount_impacts",
    "offers",
    "bookings",
    "monthly_revenue",
    "receipts",
    "consent_records",
]


async def _update_seed_metadata(
    db: AsyncIOMotorDatabase,
    *,
    action: str,
    actor_email: str | None,
    actor_user_id: str | None,
    seed_status: str,
    last_seed_error: str | None = None,
    validation_summary: dict | None = None,
) -> dict:
    timestamp = _utc_now()
    payload = {
        "name": SEED_METADATA_NAME,
        "lastSeedAction": action,
        "lastSeedTargetEnv": "preview",
        "lastSeedDatasetId": DEMO_DATASET_ID,
        "lastSeedAt": timestamp,
        "lastSeedBy": actor_email,
        "lastSeedByUserId": actor_user_id,
        "seedStatus": seed_status,
        "lastSeedError": last_seed_error,
        "validationSummary": validation_summary or {},
        "managedCollections": MANAGED_COLLECTIONS,
        "bootstrapLockId": None,
        "updatedAt": timestamp,
    }
    await db.seed_metadata.update_one(
        {"name": SEED_METADATA_NAME},
        {"$set": payload, "$setOnInsert": {"createdAt": timestamp}},
        upsert=True,
    )
    return payload


async def run_preview_seed(
    db: AsyncIOMotorDatabase,
    config: AppConfig,
    *,
    action: str,
    actor_email: str | None,
    actor_user_id: str | None,
) -> dict:
    if not config.is_preview:
        raise SeedValidationError("Preview seed can only run when APP_ENV=preview")

    if config.demo_dataset_id != DEMO_DATASET_ID:
        raise SeedValidationError(
            f"Preview seed requires DEMO_DATASET_ID={DEMO_DATASET_ID}"
        )

    seed_documents = build_demo_seed_documents(config)
    validate_seed_documents(seed_documents, config)

    try:
        for collection_name in MANAGED_COLLECTIONS:
            await db[collection_name].delete_many({})

        for collection_name in INSERT_ORDER:
            documents = seed_documents.get(collection_name, [])
            if documents:
                await db[collection_name].insert_many(documents, ordered=True)

        validation_summary = await validate_seed_database_state(db, config)
        metadata = await _update_seed_metadata(
            db,
            action=action,
            actor_email=actor_email,
            actor_user_id=actor_user_id,
            seed_status="success",
            validation_summary=validation_summary,
        )
        await write_audit_event(
            db,
            action=f"seed.{action}",
            status="success",
            actor_user_id=actor_user_id,
            actor_email=actor_email,
            meta={
                "appEnv": config.app_env,
                "dbName": config.db_name,
                "datasetId": DEMO_DATASET_ID,
                "validationSummary": validation_summary,
            },
        )
        return metadata
    except Exception as exc:
        await _update_seed_metadata(
            db,
            action=action,
            actor_email=actor_email,
            actor_user_id=actor_user_id,
            seed_status="failed",
            last_seed_error=str(exc),
        )
        await write_audit_event(
            db,
            action=f"seed.{action}",
            status="failed",
            actor_user_id=actor_user_id,
            actor_email=actor_email,
            meta={
                "appEnv": config.app_env,
                "dbName": config.db_name,
                "datasetId": DEMO_DATASET_ID,
                "error": str(exc),
            },
        )
        raise SeedValidationError(str(exc)) from exc


async def ensure_seed_state(db: AsyncIOMotorDatabase, config: AppConfig) -> None:
    if config.is_preview:
        try:
            validation_summary = await validate_seed_database_state(db, config)
            existing_metadata = await db.seed_metadata.find_one({"name": SEED_METADATA_NAME})
            if not existing_metadata:
                await _update_seed_metadata(
                    db,
                    action="startup-validation",
                    actor_email="system@happyco.local",
                    actor_user_id=None,
                    seed_status="success",
                    validation_summary=validation_summary,
                )
        except SeedValidationError:
            await run_preview_seed(
                db,
                config,
                action="startup-seed",
                actor_email="system@happyco.local",
                actor_user_id=None,
            )
        return

    placeholder_state = get_production_bootstrap_placeholder_state()
    await db.seed_metadata.update_one(
        {"name": SEED_METADATA_NAME},
        {
            "$setOnInsert": {
                "name": SEED_METADATA_NAME,
                "lastSeedAction": "production-bootstrap-placeholder",
                "lastSeedTargetEnv": config.app_env,
                "lastSeedDatasetId": placeholder_state["datasetId"],
                "lastSeedAt": None,
                "lastSeedBy": None,
                "lastSeedByUserId": None,
                "seedStatus": "not_implemented",
                "lastSeedError": None,
                "managedCollections": MANAGED_COLLECTIONS,
                "bootstrapLockId": None,
                "updatedAt": _utc_now(),
                "createdAt": _utc_now(),
            }
        },
        upsert=True,
    )


async def preview_reset_database(
    db: AsyncIOMotorDatabase,
    config: AppConfig,
    *,
    confirmation_phrase: str,
    actor_email: str,
    actor_user_id: str,
) -> dict:
    if not config.is_preview:
        raise SeedValidationError("Preview reset is only available in preview")

    if not config.allow_preview_reset:
        raise SeedValidationError("Preview reset is disabled by configuration")

    if confirmation_phrase.strip().upper() != PREVIEW_RESET_CONFIRMATION_PHRASE:
        raise SeedValidationError("Confirmation phrase does not match the required preview reset phrase")

    return await run_preview_seed(
        db,
        config,
        action="preview-reset",
        actor_email=actor_email,
        actor_user_id=actor_user_id,
    )
