from pydantic import BaseModel

class RegisterSchema(BaseModel):
    firstName: str
    lastName: str
    phoneNumber: str
    password: str


class LoginSchema(BaseModel):
    phoneNumber: str
    password: str