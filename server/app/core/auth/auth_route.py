from fastapi import APIRouter, Cookie,  Response, status
from .auth_service import AuthServiceDeps
from .auth_schema import RegisterSchema, LoginSchema
from .types.auth_request import NewUserData, CredentialData
from ...config.env import get_config
from datetime import datetime, timezone, timedelta
from typing import Annotated
from .oauth import AuthUserDeps 

auth_router = APIRouter(
    prefix='/auth'
)

COOKIE_PATH="api/auth/"

@auth_router.post('/register')
def register(
    new_user_data: RegisterSchema, 
    auth_service: AuthServiceDeps,
    response: Response
    ):
    try:

        REFRESH_TOKEN_EXPIRES_DAYS = get_config().REFRESH_TOKEN_EXPIRES_DAYS

        data: NewUserData  = {
            'first_name': new_user_data.firstName,
            'last_name': new_user_data.lastName,
            'phone_number': new_user_data.phoneNumber,
            'password': new_user_data.password
        }


        response_body =  auth_service.register(
            new_user_data=data
        )

        response.status_code = status.HTTP_201_CREATED

        response.set_cookie(
            key="auth_token", 
            value=response_body['refresh_token'],
            path=COOKIE_PATH,
            httponly=True,
            secure=True,
            expires=datetime.now(timezone.utc) + timedelta(milliseconds=1000 * 60 * 60 * 24 * REFRESH_TOKEN_EXPIRES_DAYS),
            samesite="none",
        )

        return {
            "data": {
                "token": response_body['access_token'] 
            }
        }
    except Exception as error:
        print('Auth Error Register', error)
        return error


@auth_router.post('/login')
def login(
    credentials_data: LoginSchema, 
    auth_service: AuthServiceDeps,
    response: Response
    ):
    try:

        ACCESS_TOKEN_EXPIRES_MINUTES = get_config().ACCESS_TOKEN_EXPIRES_MINUTES

        data: CredentialData = {
            "phone_number": credentials_data.phoneNumber,
            "password": credentials_data.password
        }

        response_body = auth_service.login(credentials_data=data)
    
        response.status_code = status.HTTP_200_OK

        

        response.set_cookie(
            key="auth_token", 
            value=response_body['refresh_token'],
            path=COOKIE_PATH,
            httponly=True,
            secure=True,
            expires=datetime.now(timezone.utc) + timedelta(milliseconds=1000 * 60 * 60 * 24 * ACCESS_TOKEN_EXPIRES_MINUTES),
            samesite="none",
        )
        return {
            "data": {
                "token": response_body["access_token"]
            }
        }

    except Exception as error:
        print('Auth Error Login', error)
        return error



@auth_router.get('/logout')
async def logout(
    auth_token: Annotated[str | None, Cookie()],
    response: Response
):
    try:

        print("auth_token", auth_token, sep=" ")
       
        response.status_code = status.HTTP_200_OK
        response.delete_cookie(
            key="auth_token",
            path=COOKIE_PATH
        )

        return {
            "data": "success"
        }

    except Exception as error:
        print("Auth Logout Error", error, sep='\n')
        return error


@auth_router.get('/me')
async def get_auth_user(auth_user: AuthUserDeps):
    try:
        return {
            "data": auth_user
        }
    
    except Exception as error:
        print("Get Auth User Error", error, sep=': ')
        return error