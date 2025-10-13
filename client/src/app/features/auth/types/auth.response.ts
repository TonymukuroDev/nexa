export interface ILoginResponse {
    data: {
        token: string;
    }
}

export interface IRegisterResponse  {
    data: {
        token: string
    }
}

export interface IGetRefreshTokenResponse {
    data: {
        token: string
    }
}

export interface ILogoutResponse {
    data: "success"
}

export interface IGetAuthUserResponse {
    data: {
        id: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        roles: string[],
        photo: string | null; 
    }
}
