from __future__ import annotations

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import AppConfig
from app.seeds.constants import (
    DEMO_DATASET_ID,
    FLAGSHIP_PROPERTY_ID,
    REQUIRED_PROPERTY_NAMES,
    RESIDENT_IDS,
    USER_IDS,
)


class SeedValidationError(RuntimeError):
    """Raised when seeded preview data is missing required demoA records."""


REQUIRED_COLLECTIONS = [
    "platform_settings",
    "users",
    "properties",
    "units",
    "residents",
    "maintenance_history",
    "churn_prediction_history",
    "churn_score_history",
    "interventions_log",
    "discount_impacts",
    "offers",
    "bookings",
    "providers",
    "property_metrics",
    "monthly_revenue",
    "concierge_messages",
]


def validate_seed_documents(seed_documents: dict[str, list[dict]], config: AppConfig) -> None:
    for collection_name in REQUIRED_COLLECTIONS:
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
        "sarah.mitchell@riverside.com",
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

    flagship_units = [
        unit
        for unit in seed_documents["units"]
        if unit.get("propertyId") == FLAGSHIP_PROPERTY_ID
    ]
    if len(flagship_units) != 100:
        raise SeedValidationError(
            "The Metropolitan at Riverside must contain exactly 100 seeded unit records"
        )

    alex_unit = next(
        (unit for unit in flagship_units if unit.get("number") == "501"), None
    )
    if not alex_unit or alex_unit.get("assignedResidentId") != alex.get("id"):
        raise SeedValidationError(
            "Alex Chen must be assigned to unit 501 in the flagship property"
        )

    alex_messages = [
        item
        for item in seed_documents["concierge_messages"]
        if item.get("residentId") == alex.get("id")
    ]
    if len(alex_messages) < 3:
        raise SeedValidationError(
            "Alex Chen must include proactive AI concierge communication history"
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
    units_count = await db.units.count_documents(
        {"datasetId": DEMO_DATASET_ID, "propertyId": FLAGSHIP_PROPERTY_ID}
    )
    predictions_count = await db.churn_prediction_history.count_documents(
        {"datasetId": DEMO_DATASET_ID}
    )
    messages_count = await db.concierge_messages.count_documents(
        {"datasetId": DEMO_DATASET_ID, "residentId": RESIDENT_IDS["alex"]}
    )

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
    manager_user_count = await db.users.count_documents(
        {
            "id": USER_IDS["manager"],
            "datasetId": DEMO_DATASET_ID,
            "displayName": "Sarah Mitchell",
        }
    )

    alex_prediction_count = await db.churn_prediction_history.count_documents(
        {"residentName": "Alex Chen", "isLatest": True}
    )
    alex_booking_count = await db.bookings.count_documents({"residentId": RESIDENT_IDS["alex"]})

    missing_reasons: list[str] = []
    if platform_settings_count < 1:
        missing_reasons.append("platform settings")
    if users_count < 3:
        missing_reasons.append("seeded users")
    if manager_user_count < 1:
        missing_reasons.append("Sarah Mitchell manager user")
    if properties_count < 3:
        missing_reasons.append("seeded properties")
    if residents_count < 3:
        missing_reasons.append("seeded residents")
    if units_count < 100:
        missing_reasons.append("flagship unit records")
    if predictions_count < 3:
        missing_reasons.append("churn prediction records")
    if alex_prediction_count < 1:
        missing_reasons.append("Alex Chen churn prediction")
    if alex_booking_count < 1:
        missing_reasons.append("Alex Chen bookings")
    if alex_count < 1:
        missing_reasons.append("Alex Chen QA resident")
    if messages_count < 3:
        missing_reasons.append("Alex Chen AI concierge messages")
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
        "units": units_count,
        "predictions": predictions_count,
    }
