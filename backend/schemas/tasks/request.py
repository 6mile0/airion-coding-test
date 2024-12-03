from typing import Optional

from pydantic import BaseModel, Field

# タスク作成時のリクエストボディのスキーマ
class TaskCreate(BaseModel):
    title: str = Field(..., max_length=50)
    description: Optional[str] = Field(None, max_length=255)
