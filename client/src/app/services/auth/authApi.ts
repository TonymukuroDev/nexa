import { ILoginRequest, IRegisterRequest } from "../../types/auth/auth.request";
import { IGetAuthUserResponse, ILoginResponse, ILogoutResponse, IRegisterResponse } from "../../types/auth/auth.response";
import { baseApi } from "../api";


export const authApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            }),
        }),
        
        registerUser: builder.mutation<IRegisterResponse, IRegisterRequest>({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            }),
        }),

        logout: builder.query<ILogoutResponse, void>({
            query: () => ({
                url: "/auth/logout",
                method: "GET" 
            }),
        }),

        getAuthUser: builder.query<IGetAuthUserResponse, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
            }),
            providesTags: ['User'],
        })
    })
})

export const  {
    useLoginMutation,
    useRegisterUserMutation,
    useLogoutQuery,
    useGetAuthUserQuery
} = authApiSlice