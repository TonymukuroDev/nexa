export interface IAuthStoreState {
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
}
