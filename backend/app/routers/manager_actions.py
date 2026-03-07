"""Manager actions router."""
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timezone
import uuid

from app.core.database import get_database
from app.middleware.auth_dependencies import require_authenticated_user
from app.models.action import (
    DeployInterventionRequest,
    DeployInterventionResponse,
    ManagerActionsListResponse,
    ActionStatus,
    ActionType
)
from app.services.event_logger import log_event, EventType


router = APIRouter(prefix="/manager/actions")


@router.post("/deploy-intervention", response_model=DeployInterventionResponse)
async def deploy_intervention(
    request: DeployInterventionRequest,
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Deploy an intervention to a resident."""
    # Verify resident exists
    resident = await db.tracked_residents.find_one({"residentId": request.residentId})
    if not resident:
        raise HTTPException(status_code=404, detail="Resident not found")
    
    # Get property info
    property_doc = await db.properties.find_one({"propertyId": resident["propertyId"]})
    
    # Create intervention record
    intervention_id = str(uuid.uuid4())
    tier_labels = {1: "Light Touch", 2: "Standard", 3: "High Priority"}
    
    intervention = {
        "interventionId": intervention_id,
        "residentId": request.residentId,
        "residentName": resident["fullName"],
        "propertyId": resident["propertyId"],
        "propertyName": property_doc["name"] if property_doc else "Unknown",
        "unit": resident.get("unit"),
        "tier": request.tier,
        "tierLabel": tier_labels.get(request.tier, "Unknown"),
        "creditAmount": request.creditAmount,
        "riskScore": resident.get("riskScore", 0),
        "topDriver": resident.get("primaryDriver", "Unknown"),
        "status": ActionStatus.SENT,
        "deployedBy": current_user.get("userId"),
        "deployedByEmail": current_user.get("email"),
        "deployedAt": datetime.now(timezone.utc),
        "reason": request.reason
    }
    
    await db.interventions.insert_one(intervention)
    
    # Log event
    await log_event(
        db,
        EventType.INTERVENTION_DEPLOYED,
        user_id=current_user.get("userId"),
        user_email=current_user.get("email"),
        user_role=current_user.get("role"),
        resource_type="intervention",
        resource_id=intervention_id,
        details={
            "residentId": request.residentId,
            "tier": request.tier,
            "creditAmount": request.creditAmount
        }
    )
    
    return DeployInterventionResponse(
        success=True,
        interventionId=intervention_id,
        message=f"{tier_labels.get(request.tier)} intervention deployed successfully",
        action=intervention
    )


@router.get("/list", response_model=ManagerActionsListResponse)
async def list_manager_actions(
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get list of manager actions."""
    interventions = await db.interventions.find({}).sort("deployedAt", -1).limit(50).to_list(None)
    
    # Calculate summary
    total_deployed = len(interventions)
    total_credits = sum(i.get("creditAmount", 0) for i in interventions)
    
    return ManagerActionsListResponse(
        actions=interventions,
        summary={
            "totalDeployed": total_deployed,
            "totalCredits": total_credits,
            "avgCreditAmount": total_credits / total_deployed if total_deployed > 0 else 0
        }
    )
