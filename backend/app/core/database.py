"""Database manager with event collection indexes."""
from __future__ import annotations

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.core.config import AppConfig, ConfigurationError


class DatabaseManager:
    def __init__(self, config: AppConfig):
        self.config = config
        self._client: AsyncIOMotorClient | None = None
        self._database: AsyncIOMotorDatabase | None = None

    async def connect(self) -> None:
        if self._database is not None:
            if self._database.name != self.config.db_name:
                raise ConfigurationError(
                    "Attempted to rebind database manager to a different database"
                )
            return

        self._client = AsyncIOMotorClient(self.config.mongo_url)
        await self._client.admin.command("ping")
        self._database = self._client[self.config.db_name]

    @property
    def database(self) -> AsyncIOMotorDatabase:
        if self._database is None:
            raise ConfigurationError("Database connection has not been initialized")
        return self._database

    async def ensure_indexes(self) -> None:
        """Create all necessary indexes."""
        db = self.database
        
        # User indexes
        await db.users.create_index("email", unique=True)
        await db.users.create_index("id", unique=True)
        
        # Property indexes
        await db.properties.create_index("id", unique=True)
        await db.properties.create_index("name", unique=True)
        
        # Resident indexes
        await db.residents.create_index("id", unique=True)
        await db.residents.create_index([("propertyId", 1), ("unit", 1)])
        await db.tracked_residents.create_index("residentId", unique=True)
        await db.tracked_residents.create_index("propertyId")
        
        # Unit indexes
        await db.units.create_index("id", unique=True)
        await db.units.create_index([("propertyId", 1), ("number", 1)], unique=True)
        
        # Provider indexes
        await db.providers.create_index("id", unique=True)
        
        # Booking indexes
        await db.bookings.create_index([("residentId", 1), ("scheduledFor", -1)])
        await db.bookings.create_index([("providerId", 1), ("scheduledFor", -1)])
        
        # Metrics indexes
        await db.property_metrics.create_index([("propertyId", 1), ("isLatest", 1)])
        await db.monthly_revenue.create_index([("propertyId", 1), ("month", 1)])
        
        # Churn prediction indexes
        await db.churn_prediction_history.create_index([("residentId", 1), ("isLatest", 1)])
        await db.churn_score_history.create_index([("residentId", 1), ("asOfDate", -1)])
        
        # Communication indexes
        await db.concierge_messages.create_index([("residentId", 1), ("createdAt", -1)])
        
        # Intervention indexes
        await db.interventions_log.create_index([("residentId", 1), ("happenedAt", -1)])
        await db.interventions.create_index("interventionId", unique=True)
        await db.interventions.create_index([("residentId", 1), ("deployedAt", -1)])
        await db.interventions.create_index("status")
        
        # Impact indexes
        await db.discount_impacts.create_index([("residentId", 1), ("createdAt", -1)])
        
        # Auth session indexes
        await db.auth_sessions.create_index("sessionTokenHash", unique=True)
        await db.auth_sessions.create_index("expiresAt", expireAfterSeconds=0)
        
        # Seed metadata indexes
        await db.seed_metadata.create_index("name", unique=True)
        
        # EVENT INDEXES - NEW
        await db.events.create_index([("eventType", 1), ("timestamp", -1)])
        await db.events.create_index([("userId", 1), ("timestamp", -1)])
        await db.events.create_index([("resourceType", 1), ("resourceId", 1), ("timestamp", -1)])
        await db.events.create_index("timestamp", expireAfterSeconds=7776000)  # 90 days retention

    def close(self) -> None:
        if self._client is not None:
            self._client.close()
            self._client = None
            self._database = None


_db_manager: DatabaseManager | None = None


def init_database(config: AppConfig) -> DatabaseManager:
    global _db_manager

    if _db_manager is not None:
        existing = _db_manager.config
        if existing.db_name != config.db_name or existing.app_env != config.app_env:
            raise ConfigurationError(
                "Database manager already initialized with a different environment binding"
            )
        return _db_manager

    _db_manager = DatabaseManager(config)
    return _db_manager


def get_database_manager() -> DatabaseManager:
    if _db_manager is None:
        raise ConfigurationError("Database manager has not been initialized")
    return _db_manager


async def get_database() -> AsyncIOMotorDatabase:
    return get_database_manager().database
