import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthStoreState, ILoginFailurePayload, IRegisterFailurePayload } from "../types/auth.entities";
import { authApiSlice } from "../services/authApi";


const initialState: IAuthStoreState = {
    isAuthenticated: false,
    error: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
        setAuth: (state) => ({
            ...state,
            isAuthenticated: true
        }),

        logout: (state) => ({
            ...state,
            isAuthenticated: false
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
                isAuthenticated: true
            })
        )

        // Match for login errors

        .addMatcher(
            authApiSlice.endpoints.registerUser.matchFulfilled,
            (state) => ({
                ...state,
                isAuthenticated: true
            })
        )

        // Match for Register errors 

        .addMatcher(
            authApiSlice.endpoints.logout.matchFulfilled,
            (state) => ({
                ...state,
                isAuthenticated: false
            })
        )
    }
})


export const {
    setAuth,
    setLoginErrors,
    clearErrors,
    logout
} = authSlice.actions


export default authSlice.reducer;