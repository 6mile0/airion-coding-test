from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer, OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from usecase.auth import register_user, authenticate_user, create_access_token, get_current_user

from schemas.auth.request import LoginRequest, RegisterRequest
from schemas.auth.response import CreatedUserResponse, TokenResponse, UserResponse

from database import get_db

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["auth"],
)


@router.post("/register", response_model=CreatedUserResponse)
async def register_user(new_user_req: RegisterRequest, db: AsyncSession = Depends(get_db)):
    res = register_user(db, new_user_req)
    token = create_access_token(res)

    return CreatedUserResponse(
        user_id=res.id,
        username=res.name,
        email=res.mail,
        access_token=TokenResponse(
            access_token=token,
            token_type="bearer"
        ),
        created_at="",
        updated_at=""
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
    access_token = create_access_token(user)
    return TokenResponse(
        access_token=access_token,
        token_type="bearer"
    )

@router.post("/me", response_model=UserResponse)
async def auth_me(authorization: HTTPAuthorizationCredentials = Depends(HTTPBearer()), db: AsyncSession = Depends(get_db)):
    current_user = get_current_user(authorization.credentials, db)
    return UserResponse(
        user_id=current_user.id,
        name=current_user.name,
        email=current_user.mail,
        disabled=False,
        created_at="",
        updated_at=""
    )
