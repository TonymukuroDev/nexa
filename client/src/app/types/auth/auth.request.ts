import { ILoginFormInput } from "../../../pages/auth/login/types/loginform";

export interface ILoginRequest extends Omit<ILoginFormInput, "rememberMe"> {}


export interface IRegisterRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
}