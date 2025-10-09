from typing import TypedDict



class RegisterResponse(TypedDict):
    access_token: str
    refresh_token: str


class LoginResponse(RegisterResponse):
    pass