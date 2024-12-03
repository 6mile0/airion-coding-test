from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.tasks.request import TaskCreate
from schemas.tasks.response import CreateTaskResponse
from usecase import tasks

from dependencies import get_db

router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["tasks"],
)

@router.post("/add", response_model=CreateTaskResponse)
async def create_task(task_body: TaskCreate, db: AsyncSession = Depends(get_db)):
    res = tasks.create_task(db, task_body)
    return CreateTaskResponse(
        task_id=res.id,
        title=res.title,
        description=res.description,
        is_done=res.is_done,
        created_at=res.created_at,
        updated_at=res.updated_at
        )
