from pydantic import BaseModel
from uuid import UUID
from models.role import Role


class CreatedUserResponse(BaseModel):
    username: str
    email: str


class UserResponse(BaseModel):
    user_id: UUID
    user_name: str
    email: str
    role: str
    is_active: bool
    created_at: str
    updated_at: str | None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    expired_at: str
    current_user: UserResponse
