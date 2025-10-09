from fastapi import Header, Depends
from datetime import datetime, timedelta, timezone
import jwt
from passlib.context import CryptContext
from ...config.env import get_config
from typing import Any, Dict, Tuple, Annotated
from ..users.users_service import UsersServiceDeps
from .types.auth_entity import EncodedData, AuthUser


ACCESS_TOKEN_SECRET = get_config().ACCESS_TOKEN_SECRET
ACCESS_TOKEN_EXPIRES_MINUTES = get_config().ACCESS_TOKEN_EXPIRES_MINUTES

REFRESH_TOKEN_SECRET = get_config().REFRESH_TOKEN_SECRET
REFRESH_TOKEN_EXPIRES_DAYS = get_config().REFRESH_TOKEN_EXPIRES_DAYS

ALGORITHM = get_config().ALGORITHM

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def generate_hash_password(password: str) -> str:
    """Hash le mot de passe de l'utilisateur"""
    try:
        return pwd_context.hash(password)
    except Exception as error:
        print('Hash Error')
        raise error


def verify_password(password: str, hash_password: str) -> bool:
    """Verifie le mot de passe de l'utilisateur"""
    try:
        return pwd_context.verify(password, hash_password)

    except Exception as error:
        print('Verify password')
        raise error


def generate_tokens(data: Dict[str, Any]) -> Tuple[str, str]:
    """Genere access et refresh tokens"""
    try:
        access_payload = data.copy()
        refresh_payload = data.copy()

        access_token_expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
        refresh_token_expire = datetime.now(timezone.utc) + timedelta(milliseconds= 1000 * 60 * 60 * 24 * REFRESH_TOKEN_EXPIRES_DAYS)

        access_payload.update({"exp": access_token_expire})
        refresh_payload.update({"exp": refresh_token_expire})
    
        access_token = jwt.encode(access_payload, ACCESS_TOKEN_SECRET, ALGORITHM)
        refresh_token = jwt.encode(refresh_payload, REFRESH_TOKEN_SECRET, ALGORITHM)

        return access_token, refresh_token


    except Exception as error:
        print("Generate tokens")
        raise error



def get_auth_user(authorization: Annotated[str, Header()], users_service: UsersServiceDeps) -> AuthUser:
    """Get auth user data"""

    print("Authorization", authorization)

    token = authorization.split(" ")[1]

    payload: EncodedData = jwt.decode(jwt=token, key=ACCESS_TOKEN_SECRET, algorithms=ALGORITHM)

    print("Jwt Payload", payload)

    user = users_service.get_user(payload["phone_number"])


    return {
        "id": user.id.hex,
        "firstName": user.first_name,
        "lastName": user.last_name,
        "phoneNumber": user.phone_number,
        "roles": user.roles,
        "photo": user.photo
    }


AuthUserDeps = Annotated[AuthUser, Depends(get_auth_user)]