from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

# タスク作成時のリクエストボディのスキーマ
class TaskCreate(BaseModel):
    title: str = Field(..., max_length=50)
    description: Optional[str] = Field(None, max_length=255)
    expires_at: str

class TaskEdit(BaseModel):
    title: str = Field(None, max_length=50)
    description: Optional[str] = Field(None, max_length=255)
    expires_at: str
