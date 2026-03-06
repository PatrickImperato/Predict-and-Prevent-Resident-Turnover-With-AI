from fastapi import APIRouter, Depends, Request
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import get_config
from app.core.database import get_database
from app.middleware.auth_dependencies import require_admin
from app.models.diagnostics import (
    CollectionsDiagnosticsResponse,
    HealthDiagnosticsResponse,
    RuntimeDiagnosticsResponse,
    SeedDiagnosticsResponse,
    SessionDiagnosticsResponse,
)
from app.services.diagnostics_service import (
    get_collections_diagnostics,
    get_health_diagnostics,
    get_runtime_diagnostics,
    get_seed_diagnostics,
    get_session_diagnostics,
)


router = APIRouter()


@router.get("/runtime", response_model=RuntimeDiagnosticsResponse)
async def diagnostics_runtime(
    request: Request,
    current_user: dict = Depends(require_admin),
):
    _ = current_user
    return get_runtime_diagnostics(get_config(), request)


@router.get("/session", response_model=SessionDiagnosticsResponse)
async def diagnostics_session(current_user: dict = Depends(require_admin)):
    return await get_session_diagnostics(current_user)


@router.get("/collections", response_model=CollectionsDiagnosticsResponse)
async def diagnostics_collections(
    current_user: dict = Depends(require_admin),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    _ = current_user
    return await get_collections_diagnostics(db, get_config())


@router.get("/seeds", response_model=SeedDiagnosticsResponse)
async def diagnostics_seeds(
    current_user: dict = Depends(require_admin),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    _ = current_user
    return await get_seed_diagnostics(db, get_config())


@router.get("/health", response_model=HealthDiagnosticsResponse)
async def diagnostics_health(
    current_user: dict = Depends(require_admin),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    _ = current_user
    return await get_health_diagnostics(db, get_config())
