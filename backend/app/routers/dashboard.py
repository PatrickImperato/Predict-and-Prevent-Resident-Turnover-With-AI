from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.middleware.auth_dependencies import require_admin
from app.models.dashboard import DashboardResponse
from app.services.dashboard_service import get_dashboard_read_model


router = APIRouter()


@router.get("/dashboard", response_model=DashboardResponse)
async def admin_dashboard(
    current_user: dict = Depends(require_admin),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    _ = current_user
    return await get_dashboard_read_model(db)
