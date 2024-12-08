from datetime import datetime
from typing import Union
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime as dt

from fastapi import Cookie, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from pydantic import BaseModel

from utils.session_id_store import SessionStore
from models.role import Role
from schemas.auth.request import RegisterRequest

from models.user import User

import os
from dotenv import load_dotenv
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")) or 30

class Token(BaseModel):
    access_token: str
    token_type: str
    expired_at: datetime
    
class TokenData(BaseModel):
    email: str


class AuthenticatedUser(BaseModel):
    username: str
    email: Union[str, None] = None
    full_name: Union[str, None] = None
    disabled: Union[bool, None] = None


class UserInDB(AuthenticatedUser):
    hashed_password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

sesson_store = SessionStore()

app = FastAPI()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(db: AsyncSession, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def get_current_user(user_id: str, db: AsyncSession):
    user = db.query(User).filter(User.id == user_id).first()
    return user

def register_new_user(db, user: RegisterRequest):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    new_user = User(
        email=user.email,
        user_name=user.username,
        hashed_password=get_password_hash(user.password),
        role=Role.USER,
        is_active=True,
        created_at=dt.now(),
        updated_at=None
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def check_cookie(session_id: str | None = Cookie(None)):
    if session_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session ID is required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not sesson_store.is_session_valid(session_id):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session ID is invalid",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return session_id
