from __future__ import annotations

from datetime import datetime, timedelta, timezone

from app.core.config import AppConfig
from app.services.auth_service import hash_password
from app.seeds.constants import (
    DEMO_DATASET_ID,
    PLATFORM_SETTINGS_ID,
    PROPERTY_IDS,
    RESIDENT_IDS,
    USER_IDS,
)


def _now() -> datetime:
    return datetime.now(timezone.utc)


def build_demo_seed_documents(config: AppConfig) -> dict[str, list[dict]]:
    now = _now()
    dataset_id = DEMO_DATASET_ID

    lakeside_created = now - timedelta(days=180)
    downtown_created = now - timedelta(days=160)
    metropolitan_created = now - timedelta(days=140)

    platform_settings = [
        {
            "id": PLATFORM_SETTINGS_ID,
            "seedKey": "platform-settings-demoa",
            "datasetId": dataset_id,
            "default_turnover_cost": 6500,
            "global_predictive_model_enabled": True,
            "platform_margin_percent": 10,
            "proactive_retention_enabled": True,
            "demoModeEnabled": config.demo_mode_enabled,
            "environment": config.app_env,
            "createdAt": now - timedelta(days=30),
            "updatedAt": now,
        }
    ]

    users = [
        {
            "id": USER_IDS["admin"],
            "seedKey": "user-admin-demoa",
            "datasetId": dataset_id,
            "email": "admin@happyco.com",
            "passwordHash": hash_password("admin123"),
            "displayName": "HappyCo Admin",
            "role": "admin",
            "isSuperAdmin": True,
            "isDemo": True,
            "defaultPropertyId": None,
            "createdAt": now - timedelta(days=90),
            "updatedAt": now,
            "lastLoginAt": None,
        },
        {
            "id": USER_IDS["manager"],
            "seedKey": "user-manager-demoa",
            "datasetId": dataset_id,
            "email": "manager@riverside.com",
            "passwordHash": hash_password("manager123"),
            "displayName": "Property Manager",
            "role": "manager",
            "isSuperAdmin": False,
            "isDemo": True,
            "defaultPropertyId": PROPERTY_IDS["metropolitan"],
            "createdAt": now - timedelta(days=86),
            "updatedAt": now,
            "lastLoginAt": None,
        },
        {
            "id": USER_IDS["resident"],
            "seedKey": "user-resident-demoa",
            "datasetId": dataset_id,
            "email": "alex.chen@email.com",
            "passwordHash": hash_password("demo123"),
            "displayName": "Alex Chen",
            "role": "resident",
            "isSuperAdmin": False,
            "isDemo": True,
            "defaultPropertyId": PROPERTY_IDS["metropolitan"],
            "createdAt": now - timedelta(days=82),
            "updatedAt": now,
            "lastLoginAt": None,
        },
    ]

    properties = [
        {
            "id": PROPERTY_IDS["lakeside"],
            "seedKey": "property-lakeside-commons",
            "datasetId": dataset_id,
            "name": "Lakeside Commons",
            "code": "LC-001",
            "address": {
                "street": "1550 Lakeview Avenue",
                "city": "Seattle",
                "state": "WA",
                "postalCode": "98101",
            },
            "timezone": "America/Los_Angeles",
            "unitCount": 96,
            "occupiedUnits": 88,
            "occupancyRate": 91.7,
            "status": "active",
            "createdAt": lakeside_created,
            "updatedAt": now,
        },
        {
            "id": PROPERTY_IDS["downtown"],
            "seedKey": "property-downtown-tower",
            "datasetId": dataset_id,
            "name": "Downtown Tower",
            "code": "DT-002",
            "address": {
                "street": "221 Market Street",
                "city": "Austin",
                "state": "TX",
                "postalCode": "78701",
            },
            "timezone": "America/Chicago",
            "unitCount": 128,
            "occupiedUnits": 119,
            "occupancyRate": 93.0,
            "status": "active",
            "createdAt": downtown_created,
            "updatedAt": now,
        },
        {
            "id": PROPERTY_IDS["metropolitan"],
            "seedKey": "property-metropolitan-riverside",
            "datasetId": dataset_id,
            "name": "The Metropolitan at Riverside",
            "code": "MR-003",
            "address": {
                "street": "901 Riverside Drive",
                "city": "Denver",
                "state": "CO",
                "postalCode": "80202",
            },
            "timezone": "America/Denver",
            "unitCount": 100,
            "occupiedUnits": 94,
            "occupancyRate": 94.0,
            "status": "active",
            "createdAt": metropolitan_created,
            "updatedAt": now,
        },
    ]

    residents = [
        {
            "id": RESIDENT_IDS["alex"],
            "seedKey": "resident-alex-chen",
            "datasetId": dataset_id,
            "userId": USER_IDS["resident"],
            "propertyId": PROPERTY_IDS["metropolitan"],
            "fullName": "Alex Chen",
            "unit": "501",
            "email": "alex.chen@email.com",
            "phone": "(555) 210-4501",
            "riskScore": 80,
            "riskTier": "high",
            "isQaResident": True,
            "tags": ["QA Example", "Flagship Resident"],
            "moveInDate": now - timedelta(days=420),
            "lastInteractionAt": now - timedelta(days=2),
            "createdAt": metropolitan_created + timedelta(days=5),
            "updatedAt": now,
        },
        {
            "id": RESIDENT_IDS["maria"],
            "seedKey": "resident-maria-santos",
            "datasetId": dataset_id,
            "userId": None,
            "propertyId": PROPERTY_IDS["lakeside"],
            "fullName": "Maria Santos",
            "unit": "312",
            "email": "maria.santos@example.com",
            "phone": "(555) 210-4488",
            "riskScore": 74,
            "riskTier": "high",
            "isQaResident": False,
            "tags": ["Retention Outreach"],
            "moveInDate": now - timedelta(days=260),
            "lastInteractionAt": now - timedelta(days=6),
            "createdAt": lakeside_created + timedelta(days=7),
            "updatedAt": now,
        },
        {
            "id": RESIDENT_IDS["james"],
            "seedKey": "resident-james-wilson",
            "datasetId": dataset_id,
            "userId": None,
            "propertyId": PROPERTY_IDS["downtown"],
            "fullName": "James Wilson",
            "unit": "205",
            "email": "james.wilson@example.com",
            "phone": "(555) 210-4433",
            "riskScore": 68,
            "riskTier": "medium",
            "isQaResident": False,
            "tags": ["Watchlist"],
            "moveInDate": now - timedelta(days=180),
            "lastInteractionAt": now - timedelta(days=12),
            "createdAt": downtown_created + timedelta(days=5),
            "updatedAt": now,
        },
    ]

    return {
        "platform_settings": platform_settings,
        "users": users,
        "properties": properties,
        "residents": residents,
    }
