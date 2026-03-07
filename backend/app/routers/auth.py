"""Authentication router with complete event logging."""
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.middleware.auth_dependencies import (
    get_config,
    get_current_session,
    logout_current_session,
    require_authenticated_user,
)
from app.services.auth_service import SessionManager
from app.services.event_logger import log_event, EventType

router = APIRouter()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    message: str
    session: dict


class LogoutResponse(BaseModel):
    message: str


@router.post("/login", response_model=LoginResponse)
async def login(
    credentials: LoginRequest,
    request: Request,
    response: Response,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    """Login endpoint with event logging."""
    config = get_config()
    sm = SessionManager(config, db)
    
    # Get client info for logging
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    
    try:
        session_data = await sm.create_session_for_user(
            credentials.email, credentials.password, response
        )
        
        # Log successful login
        await log_event(
            db,
            EventType.LOGIN_SUCCESS,
            user_id=session_data["userId"],
            user_email=session_data["email"],
            user_role=session_data["role"],
            ip_address=ip_address,
            user_agent=user_agent,
            details={"login_method": "password"}
        )
        
        return LoginResponse(message="Login successful", session=session_data)
        
    except Exception as e:
        # Log failed login
        await log_event(
            db,
            EventType.LOGIN_FAILURE,
            user_email=credentials.email,
            ip_address=ip_address,
            user_agent=user_agent,
            details={
                "reason": str(e),
                "login_method": "password"
            }
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")


@router.post("/logout", response_model=LogoutResponse)
async def logout(
    request: Request,
    response: Response,
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    """Logout endpoint with event logging."""
    config = get_config()
    
    # Log logout event
    await log_event(
        db,
        EventType.LOGOUT,
        user_id=current_user.get("userId"),
        user_email=current_user.get("email"),
        user_role=current_user.get("role"),
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent")
    )
    
    await logout_current_session(request, response, db, config)
    return LogoutResponse(message="Logout successful")


@router.get("/session")
async def get_session(
    current_session: dict = Depends(get_current_session),
):
    """Get current session info."""
    if not current_session:
        return {"authenticated": False}
    return current_session
