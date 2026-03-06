from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import os


class ConfigurationError(RuntimeError):
    """Raised when runtime configuration is missing or invalid."""


@dataclass(frozen=True)
class AppConfig:
    app_env: str
    mongo_url: str
    db_name: str
    cors_origins: list[str]
    demo_dataset_id: str
    demo_mode_enabled: bool
    allow_preview_reset: bool
    session_secret: str
    session_cookie_name: str
    session_ttl_hours: int
    app_version: str
    app_build_id: str
    app_build_time: str
    build_channel: str

    @property
    def is_preview(self) -> bool:
        return self.app_env == "preview"

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"


_cached_config: AppConfig | None = None


def _require_env(name: str) -> str:
    value = os.environ.get(name)
    if value is None or value.strip() == "":
        raise ConfigurationError(f"Missing required environment variable: {name}")
    return value.strip()


def _parse_bool(name: str, default: bool | None = None) -> bool:
    raw = os.environ.get(name)
    if raw is None:
        if default is None:
            raise ConfigurationError(f"Missing required boolean environment variable: {name}")
        return default

    normalized = raw.strip().lower()
    if normalized in {"1", "true", "yes", "on"}:
        return True
    if normalized in {"0", "false", "no", "off"}:
        return False
    raise ConfigurationError(f"Invalid boolean value for {name}: {raw}")


def _parse_int(name: str, default: int) -> int:
    raw = os.environ.get(name)
    if raw is None or raw.strip() == "":
        return default
    try:
        return int(raw)
    except ValueError as exc:
        raise ConfigurationError(f"Invalid integer value for {name}: {raw}") from exc


def _parse_csv(raw: str) -> list[str]:
    return [part.strip() for part in raw.split(",") if part.strip()]


def _validate_db_binding(app_env: str, db_name: str) -> None:
    normalized = db_name.lower()
    expected_token = "preview" if app_env == "preview" else "production"
    forbidden_token = "production" if app_env == "preview" else "preview"

    if expected_token not in normalized:
        raise ConfigurationError(
            f"DB_NAME must contain '{expected_token}' when APP_ENV={app_env}. Received: {db_name}"
        )

    if forbidden_token in normalized:
        raise ConfigurationError(
            f"DB_NAME must not contain '{forbidden_token}' when APP_ENV={app_env}. Received: {db_name}"
        )


def _validate_config(config: AppConfig) -> None:
    if config.app_env not in {"preview", "production"}:
        raise ConfigurationError(
            f"APP_ENV must be 'preview' or 'production'. Received: {config.app_env}"
        )

    _validate_db_binding(config.app_env, config.db_name)

    if len(config.session_secret) < 32:
        raise ConfigurationError("SESSION_SECRET must be at least 32 characters long")

    if config.session_ttl_hours <= 0:
        raise ConfigurationError("SESSION_TTL_HOURS must be greater than zero")

    if config.build_channel != config.app_env:
        raise ConfigurationError(
            f"BUILD_CHANNEL ({config.build_channel}) must match APP_ENV ({config.app_env})"
        )

    if config.is_preview and not config.demo_mode_enabled:
        raise ConfigurationError("Preview environment must enable DEMO_MODE_ENABLED=true")

    if config.is_production and config.demo_mode_enabled:
        raise ConfigurationError("Production environment must enable DEMO_MODE_ENABLED=false")

    if config.is_production and config.allow_preview_reset:
        raise ConfigurationError(
            "Production environment must enforce ALLOW_PREVIEW_RESET=false"
        )


def load_config() -> AppConfig:
    global _cached_config
    if _cached_config is not None:
        return _cached_config

    app_env = _require_env("APP_ENV").lower()
    mongo_url = _require_env("MONGO_URL")
    db_name = _require_env("DB_NAME")
    cors_origins = _parse_csv(os.environ.get("CORS_ORIGINS", "*")) or ["*"]
    demo_dataset_id = os.environ.get("DEMO_DATASET_ID", "demoA").strip()
    demo_mode_enabled = _parse_bool("DEMO_MODE_ENABLED", default=app_env == "preview")
    allow_preview_reset = _parse_bool("ALLOW_PREVIEW_RESET", default=app_env == "preview")
    session_secret = _require_env("SESSION_SECRET")
    session_cookie_name = os.environ.get(
        "SESSION_COOKIE_NAME", "happyco_concierge_session"
    ).strip()
    session_ttl_hours = _parse_int("SESSION_TTL_HOURS", 12)
    app_version = os.environ.get("APP_VERSION", "happyco-concierge-v1")
    app_build_id = os.environ.get("APP_BUILD_ID", f"{app_env}-local-build")
    app_build_time = os.environ.get(
        "APP_BUILD_TIME", datetime.now(timezone.utc).isoformat()
    )
    build_channel = os.environ.get("BUILD_CHANNEL", app_env).lower()

    config = AppConfig(
        app_env=app_env,
        mongo_url=mongo_url,
        db_name=db_name,
        cors_origins=cors_origins,
        demo_dataset_id=demo_dataset_id,
        demo_mode_enabled=demo_mode_enabled,
        allow_preview_reset=allow_preview_reset,
        session_secret=session_secret,
        session_cookie_name=session_cookie_name,
        session_ttl_hours=session_ttl_hours,
        app_version=app_version,
        app_build_id=app_build_id,
        app_build_time=app_build_time,
        build_channel=build_channel,
    )
    _validate_config(config)
    _cached_config = config
    return config


def get_config() -> AppConfig:
    if _cached_config is None:
        return load_config()
    return _cached_config
