DEMO_DATASET_ID = "demoA"
SEED_METADATA_NAME = "demoA-preview-seed"
PREVIEW_RESET_CONFIRMATION_PHRASE = "RESET PREVIEW"
FLAGSHIP_PROPERTY_ID = "a4f7603e-dda0-4c44-b382-e159f8c773be"

PLATFORM_SETTINGS_ID = "4d08dbfe-f133-4aea-9255-6d0b17fabfc4"

USER_IDS = {
    "admin": "5ef29d39-94c9-4fb4-bcad-fc48664fb9de",
    "manager": "ed940c9d-c58c-4b58-920a-8511a6eaf989",
    "resident": "0c7b51d0-f5eb-4e3b-88d8-7474c95fe157",
}

PROPERTY_IDS = {
    "lakeside": "8af7a333-e11e-4a1d-bbe4-7bca4ace4d9d",
    "downtown": "0cb4337d-0b19-42fb-b067-5a113fbe6628",
    "metropolitan": FLAGSHIP_PROPERTY_ID,
}

RESIDENT_IDS = {
    "alex": "79af8e83-cde9-4c36-b4ac-6af78b2904ca",
    "maria": "b01171b9-7a34-4b53-a445-f4e41dfcc45f",
    "james": "ba8f6dbb-18c1-45ba-b562-c7dc78fc56fa",
}

REQUIRED_PROPERTY_NAMES = [
    "Lakeside Commons",
    "Downtown Tower",
    "The Metropolitan at Riverside",
]

CHURN_WEIGHTS = [
    {
        "label": "Maintenance Frequency",
        "weight": 30,
        "description": "Repeated maintenance volume is the strongest leading indicator of churn risk.",
    },
    {
        "label": "Resolution Time",
        "weight": 20,
        "description": "Longer time to close requests compounds resident frustration.",
    },
    {
        "label": "Repeat Issues",
        "weight": 15,
        "description": "Repeat failures show unresolved friction inside the unit experience.",
    },
    {
        "label": "Negative Sentiment",
        "weight": 15,
        "description": "Conversation tone helps detect dissatisfaction before a notice is given.",
    },
    {
        "label": "Unit Age",
        "weight": 10,
        "description": "Older unit condition can amplify friction when service quality drops.",
    },
    {
        "label": "Low Engagement",
        "weight": 10,
        "description": "Reduced response and lower concierge engagement often precede move-out intent.",
    },
]

MANAGED_COLLECTIONS = [
    "users",
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
