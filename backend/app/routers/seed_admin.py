from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import get_config
from app.core.database import get_database
from app.middleware.auth_dependencies import require_super_admin
from app.services.audit_service import write_audit_event


router = APIRouter()


@router.post("/preview-reset")
async def preview_reset_placeholder(
    current_user: dict = Depends(require_super_admin),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    config = get_config()
    if not config.is_preview or not config.allow_preview_reset:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Preview reset is disabled for the active environment",
        )

    await write_audit_event(
        db,
        action="seed.preview_reset.placeholder",
        status="blocked",
        actor_user_id=current_user.get("id"),
        actor_email=current_user.get("email"),
        meta={
            "appEnv": config.app_env,
            "dbName": config.db_name,
            "implemented": False,
        },
    )

    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Preview reset is a protected placeholder in Phase 4 and is not implemented yet",
    )
