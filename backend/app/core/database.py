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
        db = self.database
        await db.users.create_index("email", unique=True)
        await db.users.create_index("id", unique=True)
        await db.properties.create_index("id", unique=True)
        await db.residents.create_index("id", unique=True)
        await db.platform_settings.create_index("id", unique=True)
        await db.auth_sessions.create_index("sessionTokenHash", unique=True)
        await db.auth_sessions.create_index("expiresAt", expireAfterSeconds=0)
        await db.seed_metadata.create_index("name", unique=True)

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
