from ...config.database import Base
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import DateTime, String, func
from sqlalchemy.dialects.postgresql import ARRAY
from typing import List, Optional
from datetime import datetime
from uuid import uuid4, UUID



class User(Base):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=lambda: uuid4().hex)
    first_name: Mapped[str] = mapped_column(nullable=False)
    last_name: Mapped[str] = mapped_column(nullable=False)
    phone_number: Mapped[str] = mapped_column(nullable=False)
    hashed_password: Mapped[str] = mapped_column(nullable=False)
    roles: Mapped[List[str]] = mapped_column(
        ARRAY(String),
        default=[], 
        nullable=False
    )
    photo: Mapped[Optional[str]] = mapped_column(default=None)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        nullable=False
    )