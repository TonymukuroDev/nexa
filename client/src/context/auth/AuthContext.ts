import { createContext } from "react";
import { TLoginFormData } from "../../pages/auth/login/types/loginform";
import { TRegisterFormData } from "../../pages/auth/register/types/registerform";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IAuthUser } from "../../app/features/auth/types/auth.entities";
import { TProfileFormData } from "../../components/modals/profileModal/type/profileModal.entities";


export interface IAuthContext {
    authUser: {
        data?: IAuthUser;
        isLoading: boolean;
        error?: FetchBaseQueryError | SerializedError
    };
    isAuthenticated: boolean;
    login: (loginData: TLoginFormData) => Promise<void>;
    loginLoading: boolean;
    register: (registerData: TRegisterFormData) => Promise<void>;
    registerLoading: boolean;
    logout: () => Promise<void>;
    setUserProfile: (data: TProfileFormData) => Promise<void>;
    setUserProfileLoading: boolean;
    checkProfile: (authUser: IAuthUser) => void
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)