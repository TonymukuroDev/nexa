from fastapi import Depends, HTTPException, status
from .types.auth_request import NewUserData, CredentialData
from typing import Annotated
from ..users.users_service import UsersService


class AuthService(UsersService):

    async def register(self, new_user_data: NewUserData):
        try:
            print('data', new_user_data)

            old_user = await self.get_user(new_user_data['phone_number'])
            print('User', old_user)
            if(old_user):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT, 
                    detail="This number is already used"
                )

        except Exception as error:
            raise error

    async def login(self, credentials_data: CredentialData):
        try:
            pass

        except Exception as error:
            raise error
        



AuthServiceDeps =  Annotated[AuthService, Depends(AuthService)]