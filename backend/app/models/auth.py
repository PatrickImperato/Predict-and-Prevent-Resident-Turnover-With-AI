from datetime import datetime

from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class SessionResponse(BaseModel):
    authenticated: bool
    user_id: str | None = None
    email: EmailStr | None = None
    display_name: str | None = None
    role: str | None = None
    is_super_admin: bool = False
    default_property_id: str | None = None
    last_login_at: datetime | None = None
    app_env: str
    demo_mode_enabled: bool
    admin_route_base: str = "/app/admin"


class LoginResponse(BaseModel):
    message: str
    session: SessionResponse


class LogoutResponse(BaseModel):
    message: str
