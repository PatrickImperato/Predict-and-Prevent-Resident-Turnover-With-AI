from datetime import datetime

from pydantic import BaseModel


class RuntimeDiagnosticsResponse(BaseModel):
    app_env: str
    host: str
    db_name: str
    build_channel: str
    app_version: str
    app_build_id: str
    app_build_time: str
    demo_mode_enabled: bool
    allow_preview_reset: bool
    dataset_default: str
    config_status: str


class SessionDiagnosticsResponse(BaseModel):
    authenticated: bool
    user_id: str | None = None
    email: str | None = None
    display_name: str | None = None
    role: str | None = None
    is_super_admin: bool = False
    default_property_id: str | None = None
    last_login_at: datetime | None = None


class CollectionsDiagnosticsResponse(BaseModel):
    db_name: str
    checked_at: datetime
    collection_counts: dict[str, int]
    dataset_breakdown: dict[str, dict[str, int]]
    missing_dataset_id_counts: dict[str, int]
    seed_health: str


class SeedDiagnosticsResponse(BaseModel):
    last_seed_action: str
    last_seed_target_env: str
    last_seed_dataset_id: str
    last_seed_at: datetime | None = None
    last_seed_by: str | None = None
    seed_status: str
    bootstrap_lock_id: str | None = None
    preview_reset_implemented: bool = False
    production_bootstrap_implemented: bool = False
    production_bootstrap_mode: str


class HealthDiagnosticsResponse(BaseModel):
    api_status: str
    db_status: str
    env_status: str
    bound_db_name: str
    timestamp: datetime


class PlaceholderActionResponse(BaseModel):
    action: str
    message: str
    implemented: bool
    allowed: bool
