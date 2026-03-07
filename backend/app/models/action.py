"""Manager action models with stronger typing."""
from datetime import datetime
from typing import Optional, Dict, Any, List
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


class InterventionDetail(BaseModel):
    """Detailed intervention record."""
    interventionId: str
    residentId: str
    residentName: str
    propertyId: str
    propertyName: str
    unit: Optional[str] = None
    tier: int
    tierLabel: str
    creditAmount: int
    riskScore: int
    topDriver: str
    status: str
    deployedBy: Optional[str] = None
    deployedByEmail: Optional[str] = None
    deployedAt: datetime
    reason: Optional[str] = None
    expectedSavings: Optional[int] = None
    expectedRevenue: Optional[int] = None
    netROI: Optional[int] = None
    roiMultiple: Optional[float] = None


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
    actions: List[Dict[str, Any]]
    summary: Dict[str, Any]
