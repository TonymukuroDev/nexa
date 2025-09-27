from typing import TypedDict

class NewUserData(TypedDict):
    first_name: str
    last_name: str
    phone_number: str
    password: str


class CredentialData(TypedDict):
    phone_number: str
    password: str