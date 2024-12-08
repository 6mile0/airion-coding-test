from datetime import datetime
from pydantic import BaseModel

class User(BaseModel):
    id: int
    username: str
    email: str
    disabled: bool
    created_at: datetime
    updated_at: datetime
