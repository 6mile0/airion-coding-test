from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer, OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from utils.convert_to_unixtime import convert_to_unixtime
from usecase.auth import register_new_user, authenticate_user, create_access_token, get_current_user

from schemas.auth.request import LoginRequest, RegisterRequest
from schemas.auth.response import CreatedUserResponse, TokenResponse, UserResponse

from database import get_db

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

@router.post("/login", response_model=TokenResponse)
async def login_user(
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
    token = create_access_token(user)
    return TokenResponse(
        access_token=token.access_token,
        token_type=token.token_type,
        expired_at=convert_to_unixtime(token.expired_at),
        current_user=UserResponse(
            user_id=user.id,
            user_name=user.user_name,
            email=user.email,
            role=user.role,
            is_active=user.is_active,
            created_at=convert_to_unixtime(user.created_at),
            updated_at=convert_to_unixtime(user.updated_at)
        )
    )

@router.post("/me", response_model=UserResponse)
async def auth_me(authorization: HTTPAuthorizationCredentials = Depends(HTTPBearer()), db: AsyncSession = Depends(get_db)):
    current_user = get_current_user(authorization.credentials, db)
    return UserResponse(
        user_id=current_user.id,
        user_name=current_user.user_name,
        email=current_user.email,
        role=current_user.role,
        is_active=current_user.is_active,
        created_at=convert_to_unixtime(current_user.created_at),
        updated_at=convert_to_unixtime(current_user.updated_at)
    )
