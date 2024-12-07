from datetime import datetime
from pydantic import BaseModel
from uuid import UUID

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class CreatedUserResponse(BaseModel):
    user_id: UUID
    username: str
    email: str
    access_token: TokenResponse
    created_at: str
    updated_at: str


class UserResponse(BaseModel):
    user_id: UUID
    name: str
    email: str
    disabled: bool
    created_at: str
    updated_at: str
