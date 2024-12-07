from datetime import datetime, timedelta, timezone
from typing import Union
from sqlalchemy.ext.asyncio import AsyncSession

from jose import jwt
from jose.exceptions import JWTError

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from pydantic import BaseModel

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

app = FastAPI()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(db: AsyncSession, email: str, password: str):
    user = db.query(User).filter(User.mail == email).first()
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def create_access_token(user_data: User):
    data = {"sub": user_data.mail}
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str, db: AsyncSession):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        email_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.mail == email_data.email).first()

    if user is None:
        raise credentials_exception
    return user


def register_user(db, user: RegisterRequest):
    if db.query(User).filter(User.mail == user.email).first():
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    new_user = User(
        name=user.username,
        mail=user.email,
        password=get_password_hash(user.password),
        token="",
        token_expires="9999-12-31 23:59:59"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
