from fastapi import APIRouter, Depends, Request, Response
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import get_config
from app.core.database import get_database
from app.models.auth import LoginRequest, LoginResponse, LogoutResponse, SessionResponse
from app.services.auth_service import (
    authenticate_user,
    create_session,
    get_session_response,
    logout_current_session,
)


router = APIRouter()


@router.get("/session", response_model=SessionResponse)
async def auth_session(
    request: Request,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    return await get_session_response(request, db, get_config())


@router.post("/login", response_model=LoginResponse)
async def login(
    payload: LoginRequest,
    request: Request,
    response: Response,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    config = get_config()
    user = await authenticate_user(db, config, payload.email, payload.password)
    session = await create_session(db, config, user, response, request)
    return {"message": "Signed in successfully", "session": session}


@router.post("/logout", response_model=LogoutResponse)
async def logout(
    request: Request,
    response: Response,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    return await logout_current_session(request, response, db, get_config())
