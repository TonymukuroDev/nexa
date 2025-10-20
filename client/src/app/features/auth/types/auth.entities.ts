import { IProfile } from "../../profiles/types/profiles.entities";

export interface IAuthStoreState {
    token: string | null;
    isAuthenticated: boolean;
    error: TLoginError | TRegisterError | null;
}

export interface ILoginSuccessPayload {
    token: string
}

export interface ILoginFailurePayload {
    error: TLoginError
}

export interface IRegisterFailurePayload {
    error: TRegisterError
}


type TLoginError = {
    phoneNumber?: {
        message: string
    },
    password?: {
        message: string
    }  
}


type TRegisterError = {
    phoneNumber?: {
        message: string
    }
}


export interface IAuthUser {
    id: string
    firstName: string;
    lastName: string;
    phoneNumber: string;
    roles: string[]
    photo: string | null;
    profile: IProfile | null
}
