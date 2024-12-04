from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from uuid import UUID

class TaskResponse(BaseModel):
    task_id: UUID
    title: str
    description: Optional[str]
    is_done: bool
    expires_at: str
    created_at: datetime
    updated_at: datetime | None
