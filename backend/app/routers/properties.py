from __future__ import annotations

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.middleware.auth_dependencies import require_admin
from app.models.property import PropertiesListResponse, PropertyDetailResponse
from app.services.property_service import get_properties_list_read_model, get_property_detail_read_model


router = APIRouter()


@router.get("/properties", response_model=PropertiesListResponse)
async def admin_properties(
    current_user: dict = Depends(require_admin),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    _ = current_user
    return await get_properties_list_read_model(db)


@router.get("/properties/{property_id}", response_model=PropertyDetailResponse)
async def admin_property_detail(
    property_id: str,
    current_user: dict = Depends(require_admin),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    _ = current_user
    return await get_property_detail_read_model(db, property_id)
