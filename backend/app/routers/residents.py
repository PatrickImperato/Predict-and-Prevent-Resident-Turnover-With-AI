from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.middleware.auth_dependencies import require_authenticated_user
from app.models.resident import (
    ResidentProfileResponse,
    ResidentServicesResponse,
    ResidentTimelineResponse,
)
from app.services.resident_service import (
    get_resident_profile_read_model,
    get_resident_services_read_model,
    get_resident_timeline_read_model,
)


router = APIRouter(prefix="/residents")


@router.get("/{resident_id}", response_model=ResidentProfileResponse)
async def resident_profile(
    resident_id: str,
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    return await get_resident_profile_read_model(db, resident_id, current_user)


@router.get("/{resident_id}/timeline", response_model=ResidentTimelineResponse)
async def resident_timeline(
    resident_id: str,
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    return await get_resident_timeline_read_model(db, resident_id, current_user)


@router.get("/{resident_id}/services", response_model=ResidentServicesResponse)
async def resident_services(
    resident_id: str,
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    return await get_resident_services_read_model(db, resident_id, current_user)
