import { permissionModalClose } from "../../../../components/modals/permissions/store/permissionsSlice";
import { storageService } from "../../../../utils/config";
import { baseApi } from "../../api";

import { TLoginRequest, IRegisterRequest } from "../types/auth.request"; 

import { IGetAuthUserResponse, ILoginResponse, ILogoutResponse, IRegisterResponse } from "../types/auth.response";


export const authApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, TLoginRequest>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        }),

        registerUser: builder.mutation<IRegisterResponse, IRegisterRequest>({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation<ILogoutResponse, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['AuthUser'],
            async onQueryStarted(_, {dispatch,queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;

                    console.log(data);
                    storageService.delete("token")
                    //dispatch(logoutAction())
                    dispatch(permissionModalClose())
                    
                } catch (error) {
                    // If there is an error
                    console.log("Logout error", error);
                    throw error
                    
                }
            }
        }),

        getAuthUser: builder.query<IGetAuthUserResponse, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET'
            }),
            providesTags: ['AuthUser']
        })
    })
})


export const {
    useLoginMutation,
    useRegisterUserMutation,
    useLogoutMutation,
    useGetAuthUserQuery
} = authApiSlice