from sqlalchemy import Boolean, Column, String, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
import uuid
from database import Base
from models.role import Role

class User(Base):
    __tablename__ = "user_table"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(Role), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
