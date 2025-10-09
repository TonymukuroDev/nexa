from enum import Enum
from typing import TypedDict, List, Optional


class UserRoles(Enum):
    ADMIN = "admin"
    MEMBER = "member"
    USER = "user"


class EncodedData(TypedDict):
    id: str
    phone_number: str
    roles: List[str]


class AuthUser(TypedDict):
    id: str
    firstName: str
    lastName: str
    phoneNumber: str
    roles: List[str]
    photo: Optional[str]