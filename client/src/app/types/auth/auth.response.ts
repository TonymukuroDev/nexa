export interface ILoginResponse {
    data: {
        token: string;
    }
}

export interface IRegisterResponse extends ILoginResponse {}

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
        
    }
}