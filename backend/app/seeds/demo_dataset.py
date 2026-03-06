from __future__ import annotations

from datetime import datetime, timedelta, timezone
import uuid

from app.core.config import AppConfig
from app.services.auth_service import hash_password
from app.seeds.constants import (
    CHURN_WEIGHTS,
    DEMO_DATASET_ID,
    FLAGSHIP_PROPERTY_ID,
    PLATFORM_SETTINGS_ID,
    PROPERTY_IDS,
    PROVIDER_IDS,
    RESIDENT_IDS,
    USER_IDS,
)

SEED_NAMESPACE = uuid.UUID("bf25a1db-5947-4b4e-bbe5-24ff27ea38a9")


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _deterministic_uuid(seed_key: str) -> str:
    return str(uuid.uuid5(SEED_NAMESPACE, seed_key))


def _months_back(now: datetime, offset: int) -> str:
    year = now.year
    month = now.month - offset
    while month <= 0:
        month += 12
        year -= 1
    return f"{year:04d}-{month:02d}"


def _build_flagship_units(now: datetime, alex_resident_id: str) -> list[dict]:
    units: list[dict] = []
    vacant_units = {"1005", "1006", "1007", "1008", "1009", "1010"}
    assigned_map = {
        "501": alex_resident_id,
        "504": _deterministic_uuid("resident-nora-bennett"),
        "509": _deterministic_uuid("resident-damien-cross"),
        "608": _deterministic_uuid("resident-ivy-thompson"),
        "610": _deterministic_uuid("resident-ethan-ross"),
        "704": _deterministic_uuid("resident-paige-cooper"),
        "706": _deterministic_uuid("resident-leo-turner"),
        "802": _deterministic_uuid("resident-maya-reed"),
        "903": _deterministic_uuid("resident-owen-price"),
    }

    for floor in range(1, 11):
        for unit_index in range(1, 11):
            number = f"{floor}{unit_index:02d}"
            is_occupied = number not in vacant_units
            occupant_label = None
            if number == "501":
                occupant_label = "Alex Chen"
            elif is_occupied:
                occupant_label = f"Resident {number}"

            units.append(
                {
                    "id": _deterministic_uuid(f"unit-{number}"),
                    "seedKey": f"unit-{number}",
                    "datasetId": DEMO_DATASET_ID,
                    "propertyId": FLAGSHIP_PROPERTY_ID,
                    "number": number,
                    "status": "occupied" if is_occupied else "vacant",
                    "assignedResidentId": assigned_map.get(number),
                    "occupantLabel": occupant_label,
                    "bedrooms": 1 if unit_index <= 4 else 2,
                    "bathrooms": 1 if unit_index <= 6 else 2,
                    "squareFeet": 640 + (unit_index * 35),
                    "unitAgeYears": 18 + (floor // 3),
                    "createdAt": now - timedelta(days=500),
                    "updatedAt": now,
                }
            )
    return units


def _tracked_resident_definitions(now: datetime) -> list[dict]:
    return [
        {
            "id": RESIDENT_IDS["alex"],
            "seedKey": "resident-alex-chen",
            "datasetId": DEMO_DATASET_ID,
            "userId": USER_IDS["resident"],
            "propertyId": PROPERTY_IDS["metropolitan"],
            "fullName": "Alex Chen",
            "unit": "501",
            "email": "alex.chen@email.com",
            "phone": "(555) 210-4501",
            "riskScore": 74,
            "riskTier": "high",
            "isQaResident": True,
            "tags": ["QA Example", "Flagship Resident"],
            "moveInDate": now - timedelta(days=420),
            "lastInteractionAt": now - timedelta(hours=16),
            "createdAt": now - timedelta(days=415),
            "updatedAt": now,
        },
        {
            "id": RESIDENT_IDS["maria"],
            "seedKey": "resident-maria-santos",
            "datasetId": DEMO_DATASET_ID,
            "userId": None,
            "propertyId": PROPERTY_IDS["lakeside"],
            "fullName": "Maria Santos",
            "unit": "312",
            "email": "maria.santos@example.com",
            "phone": "(555) 210-4488",
            "riskScore": 72,
            "riskTier": "high",
            "isQaResident": False,
            "tags": ["Retention Outreach"],
            "moveInDate": now - timedelta(days=260),
            "lastInteractionAt": now - timedelta(days=5),
            "createdAt": now - timedelta(days=252),
            "updatedAt": now,
        },
        {
            "id": RESIDENT_IDS["james"],
            "seedKey": "resident-james-wilson",
            "datasetId": DEMO_DATASET_ID,
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
            "lastInteractionAt": now - timedelta(days=9),
            "createdAt": now - timedelta(days=174),
            "updatedAt": now,
        },
        {
            "id": _deterministic_uuid("resident-nora-bennett"),
            "seedKey": "resident-nora-bennett",
            "datasetId": DEMO_DATASET_ID,
            "userId": None,
            "propertyId": PROPERTY_IDS["metropolitan"],
            "fullName": "Nora Bennett",
            "unit": "504",
            "email": "nora.bennett@example.com",
            "phone": "(555) 210-4404",
            "riskScore": 67,
            "riskTier": "medium",
            "isQaResident": False,
            "tags": ["Repeat HVAC"],
            "moveInDate": now - timedelta(days=320),
            "lastInteractionAt": now - timedelta(days=3),
            "createdAt": now - timedelta(days=312),
            "updatedAt": now,
        },
        {
            "id": _deterministic_uuid("resident-damien-cross"),
            "seedKey": "resident-damien-cross",
            "datasetId": DEMO_DATASET_ID,
            "userId": None,
            "propertyId": PROPERTY_IDS["metropolitan"],
            "fullName": "Damien Cross",
            "unit": "509",
            "email": "damien.cross@example.com",
            "phone": "(555) 210-4409",
            "riskScore": 65,
            "riskTier": "medium",
            "isQaResident": False,
            "tags": ["Noise complaints"],
            "moveInDate": now - timedelta(days=210),
            "lastInteractionAt": now - timedelta(days=4),
            "createdAt": now - timedelta(days=200),
            "updatedAt": now,
        },
    ]


def _build_score_history(now: datetime, residents: list[dict]) -> tuple[list[dict], list[dict]]:
    prediction_history: list[dict] = []
    score_history: list[dict] = []

    base_scores = {
        "Alex Chen": [48, 56, 63, 72, 80, 74],
        "Maria Santos": [60, 64, 68, 72],
        "James Wilson": [52, 57, 62, 68],
        "Nora Bennett": [54, 58, 63, 67],
        "Damien Cross": [51, 55, 60, 65],
    }

    for resident in residents:
        history = base_scores.get(resident["fullName"], [44, 49, 55])
        history_points = len(history)
        for index, score in enumerate(history):
            is_latest = index == history_points - 1
            point_time = now - timedelta(days=(history_points - index) * 7)
            score_history.append(
                {
                    "id": _deterministic_uuid(f"score-history-{resident['id']}-{index}"),
                    "seedKey": f"score-history-{resident['id']}-{index}",
                    "datasetId": DEMO_DATASET_ID,
                    "residentId": resident["id"],
                    "residentName": resident["fullName"],
                    "propertyId": resident["propertyId"],
                    "score": score,
                    "riskTier": resident["riskTier"],
                    "asOfDate": point_time,
                    "createdAt": point_time,
                    "updatedAt": point_time,
                }
            )
            if is_latest:
                if resident["fullName"] == "Alex Chen":
                    drivers = [
                        {
                            "label": "Maintenance Frequency",
                            "weight": 30,
                            "impactScore": 23,
                            "signalValue": "3 requests in 45 days",
                            "narrative": "Three recent maintenance requests remain the strongest leading indicator of churn for Alex.",
                        },
                        {
                            "label": "Resolution Time",
                            "weight": 25,
                            "impactScore": 17,
                            "signalValue": "4.2 day average close time",
                            "narrative": "Resolution drift above four days increased friction before Sarah Mitchell intervened.",
                        },
                        {
                            "label": "Sentiment Analysis",
                            "weight": 25,
                            "impactScore": 18,
                            "signalValue": "Informal replies turned frustrated",
                            "narrative": "Shorter, more frustrated messages signaled churn risk before Alex said anything about moving.",
                        },
                        {
                            "label": "Engagement Level",
                            "weight": 20,
                            "impactScore": 12,
                            "signalValue": "Reply rate down 18%",
                            "narrative": "Engagement improved slightly after the concierge credit, reducing the latest score by 6 points.",
                        },
                    ]
                    prediction_history.append(
                        {
                            "id": _deterministic_uuid(f"prediction-{resident['id']}-latest"),
                            "seedKey": f"prediction-{resident['id']}-latest",
                            "datasetId": DEMO_DATASET_ID,
                            "residentId": resident["id"],
                            "residentName": resident["fullName"],
                            "propertyId": resident["propertyId"],
                            "score": score,
                            "scoreChange": -6,
                            "riskTier": resident["riskTier"],
                            "isLatest": True,
                            "driverSummary": "Maintenance volume and slower close times still lead Alex's risk profile, but proactive outreach reduced the score from its recent peak.",
                            "scoreExplanation": "After Sarah and the AI concierge issued a cleaning credit, accelerated the HVAC visit, and booked follow-up service, Alex's score eased from 80 to 74. Friction remains elevated, but the intervention arc is working.",
                            "signalSummary": {
                                "maintenanceCount": 3,
                                "negativeSentimentScore": "-2.4",
                                "avgResolutionTimeLabel": "4.2 days",
                                "engagementLabel": "Response rate recovering",
                            },
                            "drivers": drivers,
                            "createdAt": point_time,
                            "updatedAt": point_time,
                        }
                    )
                else:
                    prediction_history.append(
                        {
                            "id": _deterministic_uuid(f"prediction-{resident['id']}-latest"),
                            "seedKey": f"prediction-{resident['id']}-latest",
                            "datasetId": DEMO_DATASET_ID,
                            "residentId": resident["id"],
                            "residentName": resident["fullName"],
                            "propertyId": resident["propertyId"],
                            "score": score,
                            "scoreChange": score - history[-2] if len(history) > 1 else 0,
                            "riskTier": resident["riskTier"],
                            "isLatest": True,
                            "driverSummary": f"{resident['fullName']} is trending upward on operational friction signals.",
                            "scoreExplanation": "Maintenance frequency, slower follow-up, and softer engagement remain the key drivers.",
                            "signalSummary": {
                                "maintenanceCount": 2,
                                "negativeSentimentScore": "-1.6",
                                "avgResolutionTimeLabel": "3.1 days",
                                "engagementLabel": "Response rate softening",
                            },
                            "drivers": [
                                {
                                    "label": "Maintenance Frequency",
                                    "weight": 30,
                                    "impactScore": min(24, max(10, score // 3)),
                                    "signalValue": "2 recent requests",
                                    "narrative": "Service frequency remains elevated enough to monitor closely.",
                                },
                                {
                                    "label": "Resolution Time",
                                    "weight": 25,
                                    "impactScore": 13,
                                    "signalValue": "3.1 day average close time",
                                    "narrative": "Slower close times continue to add friction.",
                                },
                                {
                                    "label": "Sentiment Analysis",
                                    "weight": 25,
                                    "impactScore": 11,
                                    "signalValue": "Mildly negative replies",
                                    "narrative": "Message tone remains a meaningful leading indicator.",
                                },
                                {
                                    "label": "Engagement Level",
                                    "weight": 20,
                                    "impactScore": 9,
                                    "signalValue": "Lower follow-up engagement",
                                    "narrative": "Lower engagement continues to correlate with elevated churn risk.",
                                },
                            ],
                            "createdAt": point_time,
                            "updatedAt": point_time,
                        }
                    )
    return prediction_history, score_history


def build_demo_seed_documents(config: AppConfig) -> dict[str, list[dict]]:
    now = _now()
    dataset_id = DEMO_DATASET_ID

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
            "churnWeights": CHURN_WEIGHTS,
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
            "seedKey": "user-sarah-mitchell",
            "datasetId": dataset_id,
            "email": "sarah.mitchell@riverside.com",
            "passwordHash": hash_password("manager123"),
            "displayName": "Sarah Mitchell",
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
            "managerUserId": None,
            "overview": "Portfolio context property with lighter demo depth and retention watchlist coverage.",
            "address": {"street": "1550 Lakeview Avenue", "city": "Seattle", "state": "WA", "postalCode": "98101"},
            "timezone": "America/Los_Angeles",
            "unitCount": 96,
            "occupiedUnits": 88,
            "occupancyRate": 91.7,
            "status": "active",
            "createdAt": now - timedelta(days=180),
            "updatedAt": now,
        },
        {
            "id": PROPERTY_IDS["downtown"],
            "seedKey": "property-downtown-tower",
            "datasetId": dataset_id,
            "name": "Downtown Tower",
            "code": "DT-002",
            "managerUserId": None,
            "overview": "Portfolio context property with operational friction and service attribution signals.",
            "address": {"street": "221 Market Street", "city": "Austin", "state": "TX", "postalCode": "78701"},
            "timezone": "America/Chicago",
            "unitCount": 128,
            "occupiedUnits": 119,
            "occupancyRate": 93.0,
            "status": "active",
            "createdAt": now - timedelta(days=160),
            "updatedAt": now,
        },
        {
            "id": PROPERTY_IDS["metropolitan"],
            "seedKey": "property-metropolitan-riverside",
            "datasetId": dataset_id,
            "name": "The Metropolitan at Riverside",
            "code": "MR-003",
            "managerUserId": USER_IDS["manager"],
            "overview": "Flagship property with unit-level records, resident assignment, churn history, AI concierge communication, interventions, credits, provider service bookings, and revenue attribution.",
            "address": {"street": "901 Riverside Drive", "city": "Denver", "state": "CO", "postalCode": "80202"},
            "timezone": "America/Denver",
            "unitCount": 100,
            "occupiedUnits": 94,
            "occupancyRate": 94.0,
            "status": "active",
            "createdAt": now - timedelta(days=140),
            "updatedAt": now,
        },
    ]

    units = _build_flagship_units(now, RESIDENT_IDS["alex"])
    residents = _tracked_resident_definitions(now)
    prediction_history, score_history = _build_score_history(now, residents)

    providers = [
        {
            "id": PROVIDER_IDS["sparkclean"],
            "seedKey": "provider-sparkclean",
            "datasetId": dataset_id,
            "name": "SparkClean",
            "serviceCategories": ["Cleaning", "Unit Refresh"],
            "coverageProperties": [PROPERTY_IDS["metropolitan"], PROPERTY_IDS["lakeside"]],
            "coveragePercent": 84,
            "fulfillmentRate": 95,
            "availabilityLabel": "Available within 2 hours",
            "status": "active",
            "createdAt": now - timedelta(days=118),
            "updatedAt": now,
        },
        {
            "id": PROVIDER_IDS["fixright"],
            "seedKey": "provider-fixright-hvac",
            "datasetId": dataset_id,
            "name": "FixRight HVAC",
            "serviceCategories": ["HVAC", "Ventilation"],
            "coverageProperties": [PROPERTY_IDS["metropolitan"], PROPERTY_IDS["downtown"]],
            "coveragePercent": 88,
            "fulfillmentRate": 94,
            "availabilityLabel": "Senior tech same-day window",
            "status": "active",
            "createdAt": now - timedelta(days=120),
            "updatedAt": now,
        },
        {
            "id": PROVIDER_IDS["urban_pest"],
            "seedKey": "provider-urban-pest-control",
            "datasetId": dataset_id,
            "name": "Urban Pest Control",
            "serviceCategories": ["Pest Control", "Inspection"],
            "coverageProperties": [PROPERTY_IDS["metropolitan"], PROPERTY_IDS["lakeside"], PROPERTY_IDS["downtown"]],
            "coveragePercent": 79,
            "fulfillmentRate": 89,
            "availabilityLabel": "Next-day inspection",
            "status": "active",
            "createdAt": now - timedelta(days=116),
            "updatedAt": now,
        },
    ]

    services = [
        {"id": _deterministic_uuid("service-cleaning"), "seedKey": "service-cleaning", "datasetId": dataset_id, "name": "Cleaning", "createdAt": now - timedelta(days=140), "updatedAt": now},
        {"id": _deterministic_uuid("service-hvac"), "seedKey": "service-hvac", "datasetId": dataset_id, "name": "HVAC", "createdAt": now - timedelta(days=140), "updatedAt": now},
        {"id": _deterministic_uuid("service-pest-control"), "seedKey": "service-pest-control", "datasetId": dataset_id, "name": "Pest Control", "createdAt": now - timedelta(days=140), "updatedAt": now},
    ]

    service_vendors = [
        {"id": _deterministic_uuid("service-vendor-fixright"), "seedKey": "service-vendor-fixright", "datasetId": dataset_id, "providerId": PROVIDER_IDS["fixright"], "propertyId": PROPERTY_IDS["metropolitan"], "serviceCategory": "HVAC", "createdAt": now - timedelta(days=100), "updatedAt": now},
        {"id": _deterministic_uuid("service-vendor-sparkclean"), "seedKey": "service-vendor-sparkclean", "datasetId": dataset_id, "providerId": PROVIDER_IDS["sparkclean"], "propertyId": PROPERTY_IDS["metropolitan"], "serviceCategory": "Cleaning", "createdAt": now - timedelta(days=100), "updatedAt": now},
        {"id": _deterministic_uuid("service-vendor-urban-pest"), "seedKey": "service-vendor-urban-pest", "datasetId": dataset_id, "providerId": PROVIDER_IDS["urban_pest"], "propertyId": PROPERTY_IDS["downtown"], "serviceCategory": "Pest Control", "createdAt": now - timedelta(days=100), "updatedAt": now},
    ]

    property_settings = [
        {
            "id": _deterministic_uuid(f"property-settings-{property_id}"),
            "seedKey": f"property-settings-{property_id}",
            "datasetId": dataset_id,
            "propertyId": property_id,
            "predictiveModelEnabled": True,
            "createdAt": now - timedelta(days=90),
            "updatedAt": now,
        }
        for property_id in PROPERTY_IDS.values()
    ]

    property_economics = [
        {"id": _deterministic_uuid("property-economics-lakeside"), "seedKey": "property-economics-lakeside", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["lakeside"], "estimatedTurnoverCost": 3400, "estimatedAnnualRoi": 27480, "creditsInvestedPerMonth": 240, "avoidedTurnoversPerYear": 3, "monthlyServiceRevenueProjection": 1680, "createdAt": now - timedelta(days=60), "updatedAt": now},
        {"id": _deterministic_uuid("property-economics-downtown"), "seedKey": "property-economics-downtown", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["downtown"], "estimatedTurnoverCost": 3600, "estimatedAnnualRoi": 33600, "creditsInvestedPerMonth": 300, "avoidedTurnoversPerYear": 4, "monthlyServiceRevenueProjection": 1900, "createdAt": now - timedelta(days=60), "updatedAt": now},
        {"id": _deterministic_uuid("property-economics-metropolitan"), "seedKey": "property-economics-metropolitan", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "estimatedTurnoverCost": 3800, "estimatedAnnualRoi": 37000, "creditsInvestedPerMonth": 500, "avoidedTurnoversPerYear": 5, "monthlyServiceRevenueProjection": 2000, "createdAt": now - timedelta(days=60), "updatedAt": now},
    ]

    property_metrics = [
        {"id": _deterministic_uuid("property-metrics-lakeside-current"), "seedKey": "property-metrics-lakeside-current", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["lakeside"], "isLatest": True, "atRiskResidents": 7, "avgChurnScore": 55, "providerCoveragePercent": 81, "fulfillmentRate": 91, "retentionRoi": 27480, "aiEngagementRate": 72, "createdAt": now - timedelta(days=20), "updatedAt": now},
        {"id": _deterministic_uuid("property-metrics-downtown-current"), "seedKey": "property-metrics-downtown-current", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["downtown"], "isLatest": True, "atRiskResidents": 6, "avgChurnScore": 53, "providerCoveragePercent": 79, "fulfillmentRate": 88, "retentionRoi": 33600, "aiEngagementRate": 69, "createdAt": now - timedelta(days=20), "updatedAt": now},
        {"id": _deterministic_uuid("property-metrics-metropolitan-current"), "seedKey": "property-metrics-metropolitan-current", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "isLatest": True, "atRiskResidents": 12, "avgChurnScore": 59, "providerCoveragePercent": 85, "fulfillmentRate": 94, "retentionRoi": 37000, "aiEngagementRate": 78, "createdAt": now - timedelta(days=20), "updatedAt": now},
    ]

    revenue_templates = {
        PROPERTY_IDS["lakeside"]: [(4820, 240), (4680, 210), (4510, 180), (4390, 165)],
        PROPERTY_IDS["downtown"]: [(5635, 300), (5490, 280), (5320, 240), (5210, 225)],
        PROPERTY_IDS["metropolitan"]: [(7469, 500), (7180, 350), (6920, 420), (6680, 280)],
    }
    monthly_revenue = []
    for property_id, values in revenue_templates.items():
        for offset, (gross, credits) in enumerate(values):
            month = _months_back(now, offset)
            monthly_revenue.append(
                {
                    "id": _deterministic_uuid(f"monthly-revenue-{property_id}-{month}"),
                    "seedKey": f"monthly-revenue-{property_id}-{month}",
                    "datasetId": dataset_id,
                    "propertyId": property_id,
                    "month": month,
                    "grossRevenue": gross,
                    "creditsIssued": credits,
                    "netRevenue": gross - credits,
                    "bookingsCompleted": 18 + offset,
                    "isCurrentMonth": offset == 0,
                    "createdAt": now - timedelta(days=35 - (offset * 9)),
                    "updatedAt": now,
                }
            )

    maintenance_history = [
        {"id": _deterministic_uuid("maintenance-alex-ac-1"), "seedKey": "maintenance-alex-ac-1", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "unitNumber": "501", "issueType": "HVAC", "issueTitle": "AC cooling issue reopened", "description": "Alex reported that the AC was still blowing warm air overnight.", "status": "closed", "openedAt": now - timedelta(days=33), "resolvedAt": now - timedelta(days=29), "resolutionSummary": "FixRight HVAC replaced the failing capacitor after the second visit.", "resolutionDays": 4, "repeatIssue": True, "createdAt": now - timedelta(days=33), "updatedAt": now - timedelta(days=29)},
        {"id": _deterministic_uuid("maintenance-alex-dishwasher"), "seedKey": "maintenance-alex-dishwasher", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "unitNumber": "501", "issueType": "Appliance", "issueTitle": "Dishwasher leak follow-up", "description": "Leak returned under the lower rack after initial repair.", "status": "closed", "openedAt": now - timedelta(days=21), "resolvedAt": now - timedelta(days=16), "resolutionSummary": "Seal replaced and flooring dried after concierge escalation.", "resolutionDays": 5, "repeatIssue": True, "createdAt": now - timedelta(days=21), "updatedAt": now - timedelta(days=16)},
        {"id": _deterministic_uuid("maintenance-alex-vent"), "seedKey": "maintenance-alex-vent", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "unitNumber": "501", "issueType": "Ventilation", "issueTitle": "Bedroom vent noise and airflow imbalance", "description": "Resident noted loud vent rattle and low overnight airflow.", "status": "open", "openedAt": now - timedelta(days=5), "resolvedAt": None, "resolutionSummary": "Awaiting follow-up maintenance window after first pass reduced but did not remove noise.", "resolutionDays": 0, "repeatIssue": False, "createdAt": now - timedelta(days=5), "updatedAt": now - timedelta(days=1)},
        {"id": _deterministic_uuid("maintenance-maria-plumbing"), "seedKey": "maintenance-maria-plumbing", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["lakeside"], "residentId": RESIDENT_IDS["maria"], "unitNumber": "312", "issueType": "Plumbing", "issueTitle": "Kitchen sink backup", "description": "Water pooled after disposal jam.", "status": "closed", "openedAt": now - timedelta(days=12), "resolvedAt": now - timedelta(days=10), "resolutionSummary": "Trap cleared and disposal reset.", "resolutionDays": 2, "repeatIssue": False, "createdAt": now - timedelta(days=12), "updatedAt": now - timedelta(days=10)},
        {"id": _deterministic_uuid("maintenance-james-pest"), "seedKey": "maintenance-james-pest", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["downtown"], "residentId": RESIDENT_IDS["james"], "unitNumber": "205", "issueType": "Pest Control", "issueTitle": "Kitchen pest inspection request", "description": "Resident reported recurring insects near the dishwasher line.", "status": "closed", "openedAt": now - timedelta(days=18), "resolvedAt": now - timedelta(days=13), "resolutionSummary": "Urban Pest Control completed a deep treatment and follow-up seal inspection.", "resolutionDays": 5, "repeatIssue": False, "createdAt": now - timedelta(days=18), "updatedAt": now - timedelta(days=13)},
    ]

    concierge_messages = [
        {"id": _deterministic_uuid("message-alex-1"), "seedKey": "message-alex-1", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "channel": "sms", "channelLabel": "AI concierge • SMS", "direction": "outbound", "body": "Hey Alex — sorry about the AC issue earlier. I saw the ticket slipped again, so I’m pushing FixRight and can line up a cleaning credit if that helps.", "createdAt": now - timedelta(days=4, hours=3), "updatedAt": now - timedelta(days=4, hours=3)},
        {"id": _deterministic_uuid("message-alex-2"), "seedKey": "message-alex-2", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "channel": "sms", "channelLabel": "Resident reply", "direction": "inbound", "body": "Thanks. Mostly just need someone to actually close the loop this time.", "createdAt": now - timedelta(days=4, hours=2), "updatedAt": now - timedelta(days=4, hours=2)},
        {"id": _deterministic_uuid("message-alex-3"), "seedKey": "message-alex-3", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "channel": "app", "channelLabel": "AI concierge • App message", "direction": "outbound", "body": "Totally fair. Sarah approved a $150 SparkClean credit and I booked a senior HVAC tech for tomorrow morning.", "createdAt": now - timedelta(days=3, hours=18), "updatedAt": now - timedelta(days=3, hours=18)},
        {"id": _deterministic_uuid("message-alex-4"), "seedKey": "message-alex-4", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "channel": "maintenance_follow_up", "channelLabel": "Maintenance follow-up", "direction": "outbound", "body": "Quick check-in: did the airflow feel better after FixRight’s visit? If not, I can escalate again before the weekend.", "createdAt": now - timedelta(days=2, hours=6), "updatedAt": now - timedelta(days=2, hours=6)},
        {"id": _deterministic_uuid("message-alex-5"), "seedKey": "message-alex-5", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "channel": "sms", "channelLabel": "Resident reply", "direction": "inbound", "body": "Airflow is better. Cleaning credit helped too. Appreciate the fast follow-up.", "createdAt": now - timedelta(days=1, hours=20), "updatedAt": now - timedelta(days=1, hours=20)},
    ]

    interventions_log = [
        {"id": _deterministic_uuid("intervention-alex-credit"), "seedKey": "intervention-alex-credit", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "interventionType": "credit", "title": "Issued SparkClean credit", "detail": "AI concierge issued a proactive $150 cleaning credit after repeated AC delays.", "status": "completed", "successful": True, "scoreReducedBy": 2, "happenedAt": now - timedelta(days=3), "createdAt": now - timedelta(days=3), "updatedAt": now - timedelta(days=3)},
        {"id": _deterministic_uuid("intervention-alex-vendor-escalation"), "seedKey": "intervention-alex-vendor-escalation", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "interventionType": "vendor_escalation", "title": "Escalated FixRight HVAC dispatch", "detail": "Senior tech visit scheduled within 18 hours of the second complaint.", "status": "completed", "successful": True, "scoreReducedBy": 3, "happenedAt": now - timedelta(days=2), "createdAt": now - timedelta(days=2), "updatedAt": now - timedelta(days=2)},
        {"id": _deterministic_uuid("intervention-alex-follow-up"), "seedKey": "intervention-alex-follow-up", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "interventionType": "follow_up", "title": "Closed-loop concierge follow-up", "detail": "Informal concierge follow-up confirmed better airflow and improved tone from Alex.", "status": "completed", "successful": True, "scoreReducedBy": 1, "happenedAt": now - timedelta(days=1), "createdAt": now - timedelta(days=1), "updatedAt": now - timedelta(days=1)},
        {"id": _deterministic_uuid("intervention-maria-cleaning"), "seedKey": "intervention-maria-cleaning", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["lakeside"], "residentId": RESIDENT_IDS["maria"], "interventionType": "service_offer", "title": "Offered proactive cleaning follow-up", "detail": "SparkClean visit offered after a kitchen sink issue to smooth the resident experience.", "status": "completed", "successful": True, "scoreReducedBy": 2, "happenedAt": now - timedelta(days=2), "createdAt": now - timedelta(days=2), "updatedAt": now - timedelta(days=2)},
        {"id": _deterministic_uuid("intervention-james-follow-up"), "seedKey": "intervention-james-follow-up", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["downtown"], "residentId": RESIDENT_IDS["james"], "interventionType": "inspection_follow_up", "title": "Pest control follow-up", "detail": "Urban Pest Control scheduled a second inspection window to ensure the issue stayed closed.", "status": "in_progress", "successful": False, "scoreReducedBy": 0, "happenedAt": now - timedelta(days=7), "createdAt": now - timedelta(days=7), "updatedAt": now - timedelta(days=7)},
    ]

    discount_impacts = [
        {"id": _deterministic_uuid("credit-alex-cleaning"), "seedKey": "credit-alex-cleaning", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "title": "SparkClean home refresh credit", "amount": 150, "financialOutcome": "Reduced churn friction after repeated HVAC issue", "createdAt": now - timedelta(days=3), "updatedAt": now - timedelta(days=3)},
        {"id": _deterministic_uuid("credit-alex-filters"), "seedKey": "credit-alex-filters", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "title": "Air quality follow-up credit", "amount": 85, "financialOutcome": "Offset inconvenience while ventilation issue remained open", "createdAt": now - timedelta(days=1), "updatedAt": now - timedelta(days=1)},
        {"id": _deterministic_uuid("credit-maria-cleaning"), "seedKey": "credit-maria-cleaning", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["lakeside"], "residentId": RESIDENT_IDS["maria"], "title": "Move-in touch-up credit", "amount": 90, "financialOutcome": "Smoothed experience after plumbing interruption", "createdAt": now - timedelta(days=2), "updatedAt": now - timedelta(days=2)},
    ]

    offers = [
        {"id": _deterministic_uuid("offer-alex-cleaning"), "seedKey": "offer-alex-cleaning", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "title": "Complimentary SparkClean apartment refresh", "status": "accepted", "createdAt": now - timedelta(days=3), "updatedAt": now - timedelta(days=3)},
        {"id": _deterministic_uuid("offer-alex-priority-hvac"), "seedKey": "offer-alex-priority-hvac", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "title": "Priority FixRight HVAC technician visit", "status": "accepted", "createdAt": now - timedelta(days=2), "updatedAt": now - timedelta(days=2)},
        {"id": _deterministic_uuid("offer-maria-cleaning"), "seedKey": "offer-maria-cleaning", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["lakeside"], "residentId": RESIDENT_IDS["maria"], "title": "SparkClean touch-up service", "status": "accepted", "createdAt": now - timedelta(days=1), "updatedAt": now - timedelta(days=1)},
    ]

    bookings = [
        {"id": _deterministic_uuid("booking-alex-cleaning"), "seedKey": "booking-alex-cleaning", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "providerId": PROVIDER_IDS["sparkclean"], "serviceName": "Apartment refresh cleaning", "status": "completed", "scheduledFor": now - timedelta(days=1), "createdAt": now - timedelta(days=3), "updatedAt": now - timedelta(days=1)},
        {"id": _deterministic_uuid("booking-alex-hvac"), "seedKey": "booking-alex-hvac", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "providerId": PROVIDER_IDS["fixright"], "serviceName": "Priority HVAC tune-up", "status": "completed", "scheduledFor": now - timedelta(days=2), "createdAt": now - timedelta(days=4), "updatedAt": now - timedelta(days=2)},
        {"id": _deterministic_uuid("booking-maria-cleaning"), "seedKey": "booking-maria-cleaning", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["lakeside"], "residentId": RESIDENT_IDS["maria"], "providerId": PROVIDER_IDS["sparkclean"], "serviceName": "Move-in touch-up cleaning", "status": "scheduled", "scheduledFor": now + timedelta(days=2), "createdAt": now - timedelta(days=1), "updatedAt": now - timedelta(days=1)},
        {"id": _deterministic_uuid("booking-james-pest"), "seedKey": "booking-james-pest", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["downtown"], "residentId": RESIDENT_IDS["james"], "providerId": PROVIDER_IDS["urban_pest"], "serviceName": "Pest control inspection", "status": "completed", "scheduledFor": now - timedelta(days=10), "createdAt": now - timedelta(days=11), "updatedAt": now - timedelta(days=10)},
    ]

    receipts = [
        {"id": _deterministic_uuid("receipt-alex-cleaning"), "seedKey": "receipt-alex-cleaning", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "bookingId": _deterministic_uuid("booking-alex-cleaning"), "amount": 220, "createdAt": now - timedelta(days=1), "updatedAt": now - timedelta(days=1)},
        {"id": _deterministic_uuid("receipt-alex-hvac"), "seedKey": "receipt-alex-hvac", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["metropolitan"], "residentId": RESIDENT_IDS["alex"], "bookingId": _deterministic_uuid("booking-alex-hvac"), "amount": 145, "createdAt": now - timedelta(days=2), "updatedAt": now - timedelta(days=2)},
        {"id": _deterministic_uuid("receipt-james-pest"), "seedKey": "receipt-james-pest", "datasetId": dataset_id, "propertyId": PROPERTY_IDS["downtown"], "residentId": RESIDENT_IDS["james"], "bookingId": _deterministic_uuid("booking-james-pest"), "amount": 165, "createdAt": now - timedelta(days=10), "updatedAt": now - timedelta(days=10)},
    ]

    consent_records = [
        {"id": _deterministic_uuid("consent-alex-sms"), "seedKey": "consent-alex-sms", "datasetId": dataset_id, "residentId": RESIDENT_IDS["alex"], "propertyId": PROPERTY_IDS["metropolitan"], "channel": "sms", "status": "granted", "createdAt": now - timedelta(days=300), "updatedAt": now - timedelta(days=300)},
        {"id": _deterministic_uuid("consent-alex-app"), "seedKey": "consent-alex-app", "datasetId": dataset_id, "residentId": RESIDENT_IDS["alex"], "propertyId": PROPERTY_IDS["metropolitan"], "channel": "app", "status": "granted", "createdAt": now - timedelta(days=280), "updatedAt": now - timedelta(days=280)},
    ]

    return {
        "platform_settings": platform_settings,
        "users": users,
        "properties": properties,
        "units": units,
        "property_settings": property_settings,
        "property_economics": property_economics,
        "property_metrics": property_metrics,
        "residents": residents,
        "providers": providers,
        "services": services,
        "service_vendors": service_vendors,
        "maintenance_history": maintenance_history,
        "churn_prediction_history": prediction_history,
        "churn_score_history": score_history,
        "concierge_messages": concierge_messages,
        "interventions_log": interventions_log,
        "discount_impacts": discount_impacts,
        "offers": offers,
        "bookings": bookings,
        "monthly_revenue": monthly_revenue,
        "receipts": receipts,
        "consent_records": consent_records,
    }
