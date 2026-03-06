from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.middleware.auth_dependencies import require_admin
from app.models.analytics import AnalyticsResponse
from app.services.analytics_service import (
    get_portfolio_analytics_read_model,
    get_property_analytics_read_model,
)


router = APIRouter()


@router.get("/portfolio", response_model=AnalyticsResponse)
async def analytics_portfolio(
    current_user: dict = Depends(require_admin),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    _ = current_user
    return await get_portfolio_analytics_read_model(db)


@router.get("/property/{property_id}", response_model=AnalyticsResponse)
async def analytics_property(
    property_id: str,
    current_user: dict = Depends(require_admin),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    _ = current_user
    return await get_property_analytics_read_model(db, property_id)
