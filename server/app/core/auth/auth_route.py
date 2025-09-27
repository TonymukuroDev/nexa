from fastapi import APIRouter
from .auth_service import AuthServiceDeps
from .auth_schema import RegisterSchema, LoginSchema
from .types.auth_request import NewUserData

auth_router = APIRouter(
    prefix='/auth'
)

@auth_router.post('/register')
async def register(
    new_user_data: RegisterSchema, 
    auth_service: AuthServiceDeps
    ):
    try:
        data: NewUserData  = {
            'first_name': new_user_data.firstName,
            'last_name': new_user_data.lastName,
            'phone_number': new_user_data.phoneNumber,
            'password': new_user_data.password
        }
        return await auth_service.register(
            new_user_data=data
        )
    except Exception as error:
        print('Auth Error Register', error)

@auth_router.post('/login')
async def login(login_data: LoginSchema, auth_service: AuthServiceDeps):
    try:
        pass
    except Exception as error:
        print('Auth Error Login', error)