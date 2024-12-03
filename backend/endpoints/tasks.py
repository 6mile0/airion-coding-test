from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.tasks.request import TaskCreate
from schemas.tasks.response import TaskResponse
from usecase import tasks

from dependencies import get_db

from typing import List

router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["tasks"],
)

@router.get("/", response_model=List[TaskResponse])
async def read_tasks(db: AsyncSession = Depends(get_db)):
    res = tasks.get_tasks(db)
    return [
        TaskResponse(
            task_id=task.id,
            title=task.title,
            description=task.description,
            is_done=task.is_done,
            created_at=task.created_at,
            updated_at=task.updated_at
        ) for task in res
    ]

@router.post("/add", response_model=TaskResponse)
async def create_task(task_body: TaskCreate, db: AsyncSession = Depends(get_db)):
    res = tasks.create_task(db, task_body)
    return TaskResponse(
        task_id=res.id,
        title=res.title,
        description=res.description,
        is_done=res.is_done,
        created_at=res.created_at,
        updated_at=res.updated_at
    )

@router.put("/edit/{task_id}", response_model=TaskResponse)
async def update_task(task_id: str, task_body: TaskCreate, db: AsyncSession = Depends(get_db)):
    res = tasks.update_task(db, task_id, task_body)
    return TaskResponse(
        task_id=res.id,
        title=res.title,
        description=res.description,
        is_done=res.is_done,
        created_at=res.created_at,
        updated_at=res.updated_at
    )
