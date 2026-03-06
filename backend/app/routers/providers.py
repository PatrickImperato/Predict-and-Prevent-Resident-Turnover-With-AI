from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.middleware.auth_dependencies import require_authenticated_user
from app.models.provider import ProviderDetailResponse, ProvidersListResponse
from app.services.provider_service import (
    get_provider_detail_read_model,
    get_providers_list_read_model,
)


router = APIRouter(prefix="/providers")


@router.get("", response_model=ProvidersListResponse)
async def providers_list(
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    _ = current_user
    return await get_providers_list_read_model(db)


@router.get("/{provider_id}", response_model=ProviderDetailResponse)
async def provider_detail(
    provider_id: str,
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    _ = current_user
    return await get_provider_detail_read_model(db, provider_id)
