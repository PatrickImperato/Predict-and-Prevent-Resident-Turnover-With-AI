from __future__ import annotations

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.models.dashboard import PublicOverviewResponse
from app.services.dashboard_service import get_public_overview_read_model


router = APIRouter()


@router.get("/overview", response_model=PublicOverviewResponse)
async def public_overview(db: AsyncIOMotorDatabase = Depends(get_database)):
    return await get_public_overview_read_model(db)
