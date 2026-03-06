from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import get_config
from app.core.database import get_database
from app.middleware.auth_dependencies import require_super_admin
from app.models.seed import PreviewResetRequest, PreviewResetResponse
from app.seeds.constants import PREVIEW_RESET_CONFIRMATION_PHRASE
from app.seeds.validators import SeedValidationError
from app.services.seed_service import preview_reset_database


router = APIRouter()


@router.post("/preview-reset", response_model=PreviewResetResponse)
async def preview_reset(
    payload: PreviewResetRequest,
    current_user: dict = Depends(require_super_admin),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    config = get_config()
    if not config.is_preview or not config.allow_preview_reset:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Preview reset is disabled for the active environment",
        )

    try:
        metadata = await preview_reset_database(
            db,
            config,
            confirmation_phrase=payload.confirmation_phrase,
            actor_email=current_user.get("email"),
            actor_user_id=current_user.get("id"),
        )
    except SeedValidationError as exc:
        detail = str(exc)
        if PREVIEW_RESET_CONFIRMATION_PHRASE not in detail and "Confirmation phrase" in detail:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail) from exc
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail) from exc

    return {
        "action": "preview-reset",
        "message": "Preview database reseeded successfully",
        "implemented": True,
        "allowed": True,
        "seed_status": metadata["seedStatus"],
        "last_seed_dataset_id": metadata["lastSeedDatasetId"],
        "last_seed_at": metadata["lastSeedAt"],
        "db_name": config.db_name,
    }
