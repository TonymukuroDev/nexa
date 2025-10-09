from fastapi import Depends, HTTPException, status
from .types.auth_request import NewUserData, CredentialData
from .types.auth_response import RegisterResponse, LoginResponse
from typing import Annotated
from ..users.users_service import UsersService
from .oauth import generate_hash_password, verify_password, generate_tokens

class AuthService(UsersService):

    def register(self, new_user_data: NewUserData) -> RegisterResponse:
        """Creer un nouveau compte"""
        try:
            print('data', new_user_data)
            
            # Valider le numero de telephone
            # Verifier si un ancien utilisateur possede ce numero
            old_user = self.validate_user(new_user_data['phone_number'])
            print('User', old_user)
            if(old_user):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT, 
                    detail="This number is already used"
                )
            
            # Hasher le mot de passe 
            hash_password = generate_hash_password(new_user_data['password'])
            print('hash', hash_password)


            # Creer nouvel utilisateur
            new_user = self.create_user({
                "first_name": new_user_data['first_name'],
                "last_name": new_user_data['last_name'],
                'phone_number': new_user_data['phone_number'],
                "password": hash_password
            })

            print("New user", new_user, sep="\t")

            # Generer access et refresh token
            access_token, refresh_token = generate_tokens({
                "id": new_user['id'],
                "phone_number": new_user['phone_number'],
                "roles": new_user['roles']
            })

            return {
                "access_token": access_token,
                "refresh_token": refresh_token
            }

            


        except Exception as error:
            print("Register")
            raise error

    def login(self, credentials_data: CredentialData) -> LoginResponse:
        """Connecter l'utilisateur a son compte"""

        try:
            # Verifie l'existence de l'utilisateur

            user_exist = self.validate_user(credentials_data['phone_number'])
            print("Valid user", user_exist)

            if not user_exist:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect credentials")
            
            password_valid = verify_password(credentials_data['password'], user_exist.hashed_password)

            if not password_valid:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password")
            
            # Generer access et refresh token
            access_token, refresh_token = generate_tokens({
                "id": user_exist.id.hex,
                "phone_number": user_exist.phone_number,
                "roles": user_exist.roles
            })

            return {
                "access_token": access_token,
                "refresh_token": refresh_token
            }


        except Exception as error:
            print('Login error')
            raise error
        



AuthServiceDeps =  Annotated[AuthService, Depends(AuthService)]