"""Event logging service for audit trail."""
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from motor.motor_asyncio import AsyncIOMotorDatabase
import uuid


class EventType:
    """Event type constants."""
    # Auth events
    LOGIN_SUCCESS = "login_success"
    LOGIN_FAILURE = "login_failure"
    LOGOUT = "logout"
    SESSION_EXPIRED = "session_expired"
    
    # Manager actions
    INTERVENTION_DEPLOYED = "intervention_deployed"
    INTERVENTION_APPROVED = "intervention_approved"
    INTERVENTION_REJECTED = "intervention_rejected"
    
    # Resident actions
    MESSAGE_SENT = "message_sent"
    SERVICE_BOOKED = "service_booked"
    
    # System events
    CHURN_RISK_INCREASED = "churn_risk_increased"
    CHURN_RISK_DECREASED = "churn_risk_decreased"
    RESIDENT_STATUS_CHANGED = "resident_status_changed"
    
    # Error events
    ROUTE_ACCESS_FAILURE = "route_access_failure"
    API_ERROR = "api_error"
    SEED_ERROR = "seed_error"
    BOOT_ERROR = "boot_error"


async def log_event(
    db: AsyncIOMotorDatabase,
    event_type: str,
    user_id: Optional[str] = None,
    user_email: Optional[str] = None,
    user_role: Optional[str] = None,
    resource_type: Optional[str] = None,
    resource_id: Optional[str] = None,
    details: Optional[Dict[str, Any]] = None,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None
) -> str:
    """Log an event to the audit trail.
    
    Args:
        db: Database connection
        event_type: Type of event (use EventType constants)
        user_id: ID of user performing action
        user_email: Email of user performing action
        user_role: Role of user performing action
        resource_type: Type of resource affected (property, resident, etc.)
        resource_id: ID of resource affected
        details: Additional event details
        ip_address: IP address of request
        user_agent: User agent of request
        
    Returns:
        Event ID
    """
    event_id = str(uuid.uuid4())
    
    event = {
        "eventId": event_id,
        "eventType": event_type,
        "timestamp": datetime.now(timezone.utc),
        "userId": user_id,
        "userEmail": user_email,
        "userRole": user_role,
        "resourceType": resource_type,
        "resourceId": resource_id,
        "details": details or {},
        "ipAddress": ip_address,
        "userAgent": user_agent
    }
    
    await db.events.insert_one(event)
    return event_id


async def get_recent_events(
    db: AsyncIOMotorDatabase,
    limit: int = 100,
    event_type: Optional[str] = None,
    user_id: Optional[str] = None,
    resource_type: Optional[str] = None
) -> list:
    """Get recent events with optional filters."""
    query = {}
    
    if event_type:
        query["eventType"] = event_type
    if user_id:
        query["userId"] = user_id
    if resource_type:
        query["resourceType"] = resource_type
    
    events = await db.events.find(query).sort("timestamp", -1).limit(limit).to_list(None)
    return events
