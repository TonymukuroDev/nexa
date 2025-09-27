from sqlalchemy import create_engine
from .env import get_config
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Session
from typing import Annotated
from fastapi import Depends


SQLALCHEMY_DATABASE_URL = get_config().DATABASE_URL

engine = create_engine(SQLALCHEMY_DATABASE_URL)

sessionLocal = sessionmaker(autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = sessionLocal()

    try:
        yield db

    finally:
        db.close()


SessionDeps = Annotated[Session, Depends(get_db)]