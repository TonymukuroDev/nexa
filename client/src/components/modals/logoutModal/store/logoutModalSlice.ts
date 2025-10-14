import { createSlice } from "@reduxjs/toolkit";
import { ILogoutModalStoreState } from "../types/logoutModal.entities";
import { authApiSlice } from "../../../../app/features/auth/services/authApi";

const initialState: ILogoutModalStoreState = {
    logoutModal: {
        isOpen: false
    }
}


export const logoutModalSlice = createSlice({
    name: "logoutModal",
    initialState,
    reducers: {
        logoutModalOpen: (state) => ({
            ...state,
            logoutModal: {
                isOpen: true
            }
        }),

        logoutModalClose: (state) => ({
            ...state,
            logoutModal: {
                isOpen:false
            }
        })
    },
    extraReducers: (builder) => {
        builder
        .addMatcher(
            authApiSlice.endpoints.logout.matchFulfilled,
            (state) => ({
                ...state,
                logoutModal: {
                    isOpen: false
                }
            })
        )
    }
})



export const {
    logoutModalOpen,
    logoutModalClose
} = logoutModalSlice.actions

export default logoutModalSlice.reducer;