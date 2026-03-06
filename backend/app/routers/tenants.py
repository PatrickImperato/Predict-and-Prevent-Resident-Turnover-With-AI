from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.middleware.auth_dependencies import require_admin
from app.models.resident import TenantsListResponse
from app.services.resident_service import get_tenants_list_read_model


router = APIRouter()


@router.get("/tenants", response_model=TenantsListResponse)
async def admin_tenants(
    current_user: dict = Depends(require_admin),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    _ = current_user
    return await get_tenants_list_read_model(db)
