from fastapi import Depends
from ..auth.types.auth_request import NewUserData
from ...config.database import SessionDeps
from typing import Annotated
from .users_model import User
from sqlalchemy import select


class UsersService:

    def __init__(self, db: SessionDeps) -> None:
        self.__db = db
        
    

    async def create_user(self,new_user_data: NewUserData):
        pass

    async def get_user(self,phone_number: str) -> User | None:
        try:
            user = self.__db.execute(
                select(User).where(User.phone_number == phone_number)
                ).scalar()
            
            return user

        except Exception as error:
            print('UsersService Get User Error', error)
            raise error




UsersServiceDeps = Annotated[UsersService, Depends(UsersService)]