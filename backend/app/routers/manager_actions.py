"""Manager actions router with list endpoint."""
from fastapi import APIRouter, Depends, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timezone
import uuid

from app.core.database import get_database
from app.middleware.auth_dependencies import require_authenticated_user
from app.models.action import (
    DeployInterventionRequest,
    DeployInterventionResponse,
    ManagerActionsListResponse,
    InterventionDetail,
    ActionStatus,
    ActionType
)
from app.services.event_logger import log_event, EventType


router = APIRouter(prefix="/manager/actions")


@router.post("/deploy-intervention", response_model=DeployInterventionResponse)
async def deploy_intervention(
    request: DeployInterventionRequest,
    http_request: Request,
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
    
    # Calculate expected impact
    risk_score = resident.get("riskScore", 0)
    expected_savings = 3800 if risk_score >= 80 else (2660 if risk_score >= 70 else 1900)
    expected_revenue = int(request.creditAmount * 0.25)
    net_roi = expected_savings + expected_revenue - request.creditAmount
    roi_multiple = round((expected_savings + expected_revenue) / request.creditAmount, 1) if request.creditAmount > 0 else 0
    
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
        "riskScore": risk_score,
        "topDriver": resident.get("primaryDriver", "Unknown"),
        "status": ActionStatus.SENT,
        "deployedBy": current_user.get("userId"),
        "deployedByEmail": current_user.get("email"),
        "deployedAt": datetime.now(timezone.utc),
        "reason": request.reason,
        "expectedSavings": expected_savings,
        "expectedRevenue": expected_revenue,
        "netROI": net_roi,
        "roiMultiple": roi_multiple
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
        ip_address=http_request.client.host if http_request.client else None,
        user_agent=http_request.headers.get("user-agent"),
        details={
            "residentId": request.residentId,
            "residentName": resident["fullName"],
            "tier": request.tier,
            "creditAmount": request.creditAmount,
            "expectedROI": net_roi
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
    limit: int = 100,
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get list of deployed manager actions."""
    interventions = await db.interventions.find({}).sort("deployedAt", -1).limit(limit).to_list(None)
    
    # Calculate summary
    total_deployed = len(interventions)
    total_credits = sum(i.get("creditAmount", 0) for i in interventions)
    total_expected_savings = sum(i.get("expectedSavings", 0) for i in interventions)
    total_expected_revenue = sum(i.get("expectedRevenue", 0) for i in interventions)
    total_net_roi = sum(i.get("netROI", 0) for i in interventions)
    
    return ManagerActionsListResponse(
        actions=interventions,
        summary={
            "totalDeployed": total_deployed,
            "totalCredits": total_credits,
            "avgCreditAmount": total_credits / total_deployed if total_deployed > 0 else 0,
            "totalExpectedSavings": total_expected_savings,
            "totalExpectedRevenue": total_expected_revenue,
            "totalNetROI": total_net_roi
        }
    )


@router.get("/recent/{resident_id}")
async def get_recent_interventions_for_resident(
    resident_id: str,
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get recent interventions for a specific resident."""
    interventions = await db.interventions.find(
        {"residentId": resident_id}
    ).sort("deployedAt", -1).limit(10).to_list(None)
    
    return {"interventions": interventions}
