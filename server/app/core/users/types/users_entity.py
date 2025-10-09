from typing import TypedDict, List, Optional


class UserType(TypedDict):
    id: str
    first_name: str
    last_name: str
    phone_number: str
    roles: List[str]
    photo: Optional[str]