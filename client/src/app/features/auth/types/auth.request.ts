import { ILoginFormInput } from "../../../../pages/auth/login/types/loginform";

export type TLoginRequest = Omit<ILoginFormInput, "rememberMe">


export interface IRegisterRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
}