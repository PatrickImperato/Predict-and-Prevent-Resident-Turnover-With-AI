"""Authentication router with complete event logging."""
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.core.config import get_config
from app.middleware.auth_dependencies import require_authenticated_user
from app.services.auth_service import authenticate_user, create_session, get_session_response, logout_current_session
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
    
    # Get client info for logging
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    
    try:
        # Authenticate the user
        user = await authenticate_user(db, config, credentials.email, credentials.password)
        
        # Create session
        session_data = await create_session(db, config, user, response, request)
        
        # Log successful login
        await log_event(
            db,
            EventType.LOGIN_SUCCESS,
            user_id=session_data.get("user_id"),
            user_email=session_data.get("email"),
            user_role=session_data.get("role"),
            ip_address=ip_address,
            user_agent=user_agent,
            details={"login_method": "password"}
        )
        
        return LoginResponse(message="Login successful", session=session_data)
        
    except HTTPException:
        # Log failed login
        await log_event(
            db,
            EventType.LOGIN_FAILURE,
            user_email=credentials.email,
            ip_address=ip_address,
            user_agent=user_agent,
            details={
                "reason": "Invalid credentials",
                "login_method": "password"
            }
        )
        raise
    except Exception as e:
        # Log failed login for unexpected errors
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
        user_id=current_user.get("id"),
        user_email=current_user.get("email"),
        user_role=current_user.get("role"),
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent")
    )
    
    await logout_current_session(request, response, db, config)
    return LogoutResponse(message="Logout successful")


@router.get("/session")
async def get_session(
    request: Request,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    """Get current session info."""
    config = get_config()
    return await get_session_response(request, db, config)
