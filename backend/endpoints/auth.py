from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from utils.session_id_store import SessionStore
from utils.convert_to_unixtime import convert_to_unixtime
from usecase.auth import register_new_user, authenticate_user, get_current_user

from schemas.auth.request import LoginRequest, RegisterRequest
from schemas.auth.response import CreatedUserResponse, TokenResponse, UserResponse

from database import get_db

sesson_store = SessionStore()

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["auth"],
)


@router.post("/register", response_model=CreatedUserResponse)
async def register_user(new_user_req: RegisterRequest, db: AsyncSession = Depends(get_db)):
    res = register_new_user(db, new_user_req)
    return CreatedUserResponse(
        username=res.user_name,
        email=res.email
    )


@router.post("/login", response_model=UserResponse)
async def login_user(
    response: Response,
    form_data: LoginRequest,
    db: AsyncSession = Depends(get_db)
):
    user = authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create session
    session_id = sesson_store.create_session(user.id)
    expires = datetime.now(tz=timezone.utc) + \
        timedelta(minutes=30)
    response.set_cookie(key="session_id", value=session_id,
                        httponly=True, expires=expires)

    return UserResponse(
        user_id=user.id,
        user_name=user.user_name,
        email=user.email,
        role=user.role,
        is_active=user.is_active,
        created_at=convert_to_unixtime(user.created_at),
        updated_at=convert_to_unixtime(user.updated_at)
    )

@router.post("/logout")
async def logout_user(response: Response, session_id: str | None = Cookie(None)):
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

    sesson_store.delete_session(session_id)
    response.delete_cookie(key="session_id")
    return {"detail": "Logout successful"}

@router.post("/me", response_model=UserResponse)
async def auth_me(db: AsyncSession = Depends(get_db), session_id: str | None = Cookie(None)):
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

    user = get_current_user(sesson_store.get_user_id(session_id), db)

    return UserResponse(
        user_id=user.id,
        user_name=user.user_name,
        email=user.email,
        role=user.role,
        is_active=user.is_active,
        created_at=convert_to_unixtime(user.created_at),
        updated_at=convert_to_unixtime(user.updated_at)
    )
