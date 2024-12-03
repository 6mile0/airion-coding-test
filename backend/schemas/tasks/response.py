from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from uuid import UUID

class CreateTaskResponse(BaseModel):
    task_id: UUID
    title: str
    description: str
    is_done: bool
    created_at: datetime
    updated_at: datetime | None
