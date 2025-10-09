from fastapi import Depends, HTTPException, status
from ..auth.types.auth_request import NewUserData
from ...config.database import SessionDeps
from typing import Annotated
from .users_model import User
from sqlalchemy import select
from ..auth.types.auth_entity import UserRoles
from .types.users_entity import UserType

class UsersService:

    def __init__(self, db: SessionDeps) -> None:
        self.__db = db
        
    

    def create_user(self,new_user_data: NewUserData) -> UserType:
        """Creer un nouvel utilisateur"""
        try:
            roles = [UserRoles.USER.value]

            new_user = User(
                first_name=new_user_data['first_name'],
                last_name=new_user_data['last_name'],
                phone_number=new_user_data['phone_number'],
                hashed_password=new_user_data['password'],
                roles=roles 
            )

            self.__db.add(new_user)

            self.__db.commit()
            self.__db.refresh(new_user)

            return {
                "id": new_user.id.hex,
                "first_name": new_user.first_name,
                "last_name": new_user.last_name,
                "phone_number": new_user.phone_number,
                "photo": new_user.photo,
                "roles": new_user.roles
            }
        
        except Exception as error:
            print("User Service Create")
            raise error

    def get_user(self,phone_number: str) -> User:
        try:
            user = self.__db.execute(
                select(User)
                .where(User.phone_number == phone_number)
                ).scalar()
            
            if not user:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User doesn't exist")
            
            return user

        except Exception as error:
            print('UsersService Get User Error', error)
            raise error
    
    def validate_user(self, phone_number: str) -> User | None:
        try:
            user = self.__db.execute(
                select(User)
                .where(User.phone_number == phone_number)
                ).scalar()
            return user

        except Exception as error:
            print("Validate User Error", error)
            raise error




UsersServiceDeps = Annotated[UsersService, Depends(UsersService)]