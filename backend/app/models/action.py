"""Manager action models."""
from datetime import datetime
from typing import Optional, Dict, Any, Literal
from pydantic import BaseModel, Field


class ActionStatus:
    """Action status constants."""
    RECOMMENDED = "recommended"
    QUEUED = "queued"
    SENT = "sent"
    APPROVED = "approved"
    REJECTED = "rejected"
    COMPLETED = "completed"
    EXPIRED = "expired"


class ActionType:
    """Action type constants."""
    AI_AUTOMATIC = "ai_automatic"
    MANAGER_REVIEWABLE = "manager_reviewable"
    MANAGER_APPROVAL_REQUIRED = "manager_approval_required"
    MANAGER_OVERRIDE = "manager_override"


class ManagerActionBase(BaseModel):
    """Base manager action model."""
    residentId: str
    residentName: str
    propertyId: str
    propertyName: str
    actionType: str = Field(..., description="Type of action")
    status: str = Field(default=ActionStatus.RECOMMENDED, description="Current status")
    tier: int = Field(..., ge=1, le=3, description="Intervention tier (1-3)")
    tierLabel: str
    creditAmount: int
    riskScore: int
    topDriver: str
    expectedSavings: int
    expectedRevenue: int
    netROI: int
    roiMultiple: float
    

class DeployInterventionRequest(BaseModel):
    """Request to deploy an intervention."""
    residentId: str
    tier: int = Field(..., ge=1, le=3)
    creditAmount: int = Field(..., gt=0)
    reason: Optional[str] = None


class DeployInterventionResponse(BaseModel):
    """Response after deploying intervention."""
    success: bool
    interventionId: str
    message: str
    action: Dict[str, Any]


class ManagerActionsListResponse(BaseModel):
    """Response for manager actions list."""
    actions: list[Dict[str, Any]]
    summary: Dict[str, Any]
