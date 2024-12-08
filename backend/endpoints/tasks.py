from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from utils.convert_to_unixtime import convert_to_unixtime
from schemas.tasks.request import TaskCreate
from schemas.tasks.response import TaskResponse
from usecase import tasks
from usecase.auth import check_cookie

from database import get_db

from typing import List


router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["tasks"],
)

@router.get("/", response_model=List[TaskResponse])
async def read_tasks(db: AsyncSession = Depends(get_db), user_id: str = Depends(check_cookie)):
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    res = tasks.get_tasks(db)
    return [
        TaskResponse(
            task_id=task.id,
            title=task.title,
            description=task.description,
            is_done=task.is_done,
            expires_at=convert_to_unixtime(task.expires_at),
            created_at=convert_to_unixtime(task.created_at),
            updated_at=convert_to_unixtime(task.updated_at)
        ) for task in res
    ]

@router.post("/add", response_model=TaskResponse)
async def create_task(task_body: TaskCreate, db: AsyncSession = Depends(get_db), user_id: str = Depends(check_cookie)):
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
            headers={"WWW-Authenticate": "Bearer"},
        )

    res = tasks.create_task(db, task_body)
    return TaskResponse(
        task_id=res.id,
        title=res.title,
        description=res.description,
        is_done=res.is_done,
        expires_at=convert_to_unixtime(res.expires_at),
        created_at=convert_to_unixtime(res.created_at),
        updated_at=convert_to_unixtime(res.updated_at)
    )

@router.put("/edit/{task_id}", response_model=TaskResponse)
async def update_task(task_id: str, task_body: TaskCreate, db: AsyncSession = Depends(get_db), user_id: str = Depends(check_cookie)):
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    res = tasks.update_task(db, task_id, task_body)
    return TaskResponse(
        task_id=res.id,
        title=res.title,
        description=res.description,
        is_done=res.is_done,
        expires_at=convert_to_unixtime(res.expires_at),
        created_at=convert_to_unixtime(res.created_at),
        updated_at=convert_to_unixtime(res.updated_at)
    )

@router.delete("/delete/{task_id}", response_model=TaskResponse)
async def delete_task(task_id: str, db: AsyncSession = Depends(get_db), user_id: str = Depends(check_cookie)):
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    res = tasks.delete_task(db, task_id)
    return TaskResponse(
        task_id=res.id,
        title=res.title,
        description=res.description,
        is_done=res.is_done,
        expires_at=convert_to_unixtime(res.expires_at),
        created_at=convert_to_unixtime(res.created_at),
        updated_at=convert_to_unixtime(res.updated_at)
    )
