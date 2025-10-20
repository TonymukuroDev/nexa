import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthStoreState, ILoginFailurePayload, IRegisterFailurePayload } from "../types/auth.entities";
import { authApiSlice } from "../services/authApi";


export const initialState: IAuthStoreState = {
    isAuthenticated: false,
    error: null,
    token: localStorage.getItem("token")
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
        setAuth: (state) => ({
            ...state,
            isAuthenticated: true,
            token: localStorage.getItem("token")
        }),

        logoutAction: (state) => ({
            ...state,
            isAuthenticated: false,
            token: null,
            error: null
        }),

        setLoginErrors: (state, action: PayloadAction<ILoginFailurePayload>) => ({
            ...state,
            isAuthenticated: false,
            error: action.payload.error
        }),
        setRegisterErrors: (state, action: PayloadAction<IRegisterFailurePayload>) => ({
            ...state,
            isAuthenticated: false,
            error: action.payload.error
        }),
        clearErrors: (state) => ({
            ...state,
            error: null
        })
    },
    extraReducers: (builder) => {
        builder
        .addMatcher(
            authApiSlice.endpoints.login.matchFulfilled,
            (state) => ({
                ...state,
                isAuthenticated: true,
                token: localStorage.getItem("token")
            })
        )

        // Match for login errors

        .addMatcher(
            authApiSlice.endpoints.registerUser.matchFulfilled,
            (state) => ({
                ...state,
                isAuthenticated: true,
                token: localStorage.getItem("token")
            })
        )

        // Match for Register errors 

        .addMatcher(
            authApiSlice.endpoints.logout.matchFulfilled,
            (state) => ({
                ...state,
                isAuthenticated: false,
                token: null
            })
        )
    }
})


export const {
    setAuth,
    setLoginErrors,
    clearErrors,
    logoutAction
} = authSlice.actions


export default authSlice.reducer;