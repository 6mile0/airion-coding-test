from pydantic import BaseModel, Field

class RegisterRequest(BaseModel):
    username: str = Field(..., max_length=50)
    email: str = Field(..., max_length=255)
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str
