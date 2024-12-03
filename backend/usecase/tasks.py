from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from models.task import Task
from schemas.tasks.request import TaskEdit, TaskCreate

def create_task(
    db: AsyncSession, task_create: TaskCreate
) -> Task:
    task = Task(
        title=task_create.title, 
        description=task_create.description, 
        is_done=False, 
        expires_at=task_create.expires_at, 
        created_at=datetime.now()
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def get_tasks(db: AsyncSession) -> list[Task]:
    return db.query(Task).all()

def update_task(db: AsyncSession, task_id: int, task_edit: TaskEdit) -> Task:
    task = db.query(Task).filter(Task.id == task_id).first()
    task.title = task_edit.title
    task.description = task_edit.description
    task.expires_at = task_edit.expires_at
    task.updated_at = datetime.now()
    db.commit()
    db.refresh(task)
    return task

def delete_task(db: AsyncSession, task_id: int) -> Task:
    task = db.query(Task).filter(Task.id == task_id).first()
    db.delete(task)
    db.commit()
    return task
