from __future__ import annotations

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import AppConfig
from app.seeds.constants import (
    DEMO_DATASET_ID,
    REQUIRED_PROPERTY_NAMES,
    USER_IDS,
)


class SeedValidationError(RuntimeError):
    """Raised when seeded preview data is missing required demoA records."""


def validate_seed_documents(seed_documents: dict[str, list[dict]], config: AppConfig) -> None:
    required_collections = ["platform_settings", "users", "properties", "residents"]
    for collection_name in required_collections:
        if not seed_documents.get(collection_name):
            raise SeedValidationError(
                f"Seed documents missing required collection payload: {collection_name}"
            )

    property_names = {doc.get("name") for doc in seed_documents["properties"]}
    missing_property_names = [
        property_name
        for property_name in REQUIRED_PROPERTY_NAMES
        if property_name not in property_names
    ]
    if missing_property_names:
        raise SeedValidationError(
            f"Seed documents missing required properties: {', '.join(missing_property_names)}"
        )

    user_emails = {doc.get("email") for doc in seed_documents["users"]}
    required_emails = {
        "admin@happyco.com",
        "manager@riverside.com",
        "alex.chen@email.com",
    }
    missing_emails = required_emails - user_emails
    if missing_emails:
        raise SeedValidationError(
            f"Seed documents missing required users: {', '.join(sorted(missing_emails))}"
        )

    alex = next(
        (
            resident
            for resident in seed_documents["residents"]
            if resident.get("fullName") == "Alex Chen"
        ),
        None,
    )
    if not alex or not alex.get("isQaResident"):
        raise SeedValidationError(
            "Seed documents must include Alex Chen marked as the main QA resident"
        )

    for collection_name, documents in seed_documents.items():
        for document in documents:
            if document.get("datasetId") != DEMO_DATASET_ID:
                raise SeedValidationError(
                    f"Collection '{collection_name}' contains a non-demoA datasetId"
                )
            if not document.get("id"):
                raise SeedValidationError(
                    f"Collection '{collection_name}' contains a record without a stable id"
                )

    if config.demo_dataset_id != DEMO_DATASET_ID:
        raise SeedValidationError(
            f"Configured DEMO_DATASET_ID must be {DEMO_DATASET_ID} for preview seeding"
        )


async def validate_seed_database_state(
    db: AsyncIOMotorDatabase,
    config: AppConfig,
) -> dict[str, int]:
    platform_settings_count = await db.platform_settings.count_documents(
        {"datasetId": DEMO_DATASET_ID}
    )
    properties_count = await db.properties.count_documents({"datasetId": DEMO_DATASET_ID})
    users_count = await db.users.count_documents({"datasetId": DEMO_DATASET_ID})
    residents_count = await db.residents.count_documents({"datasetId": DEMO_DATASET_ID})

    property_names = await db.properties.distinct("name", {"datasetId": DEMO_DATASET_ID})
    missing_property_names = [
        property_name
        for property_name in REQUIRED_PROPERTY_NAMES
        if property_name not in property_names
    ]

    alex_count = await db.residents.count_documents(
        {
            "datasetId": DEMO_DATASET_ID,
            "fullName": "Alex Chen",
            "isQaResident": True,
        }
    )

    admin_user_count = await db.users.count_documents(
        {
            "id": USER_IDS["admin"],
            "datasetId": DEMO_DATASET_ID,
            "role": "admin",
        }
    )

    missing_reasons: list[str] = []
    if platform_settings_count < 1:
        missing_reasons.append("platform settings")
    if users_count < 3:
        missing_reasons.append("seeded users")
    if properties_count < 3:
        missing_reasons.append("seeded properties")
    if residents_count < 1:
        missing_reasons.append("seeded residents")
    if alex_count < 1:
        missing_reasons.append("Alex Chen QA resident")
    if admin_user_count < 1:
        missing_reasons.append("admin user")
    if missing_property_names:
        missing_reasons.append(
            f"properties missing: {', '.join(missing_property_names)}"
        )

    if missing_reasons:
        raise SeedValidationError(
            f"Preview seed validation failed. Missing core records: {', '.join(missing_reasons)}"
        )

    if config.demo_dataset_id != DEMO_DATASET_ID:
        raise SeedValidationError(
            f"Configured DEMO_DATASET_ID must be {DEMO_DATASET_ID} for preview validation"
        )

    return {
        "platform_settings": platform_settings_count,
        "users": users_count,
        "properties": properties_count,
        "residents": residents_count,
    }
