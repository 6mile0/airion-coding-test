from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from models.task import Task
from schemas.tasks.request import TaskCreate

def create_task(
    db: AsyncSession, task_create: TaskCreate
) -> Task:
    task = Task(title=task_create.title, description=task_create.description, is_done=False, created_at=datetime.now())
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
