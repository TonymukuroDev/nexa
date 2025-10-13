import { createSlice } from "@reduxjs/toolkit";
import { IPermissionsStoreState } from "../types/permissions.entitites";
import { authApiSlice } from "../../../../app/features/auth/services/authApi";


const initialState: IPermissionsStoreState = {
    permissionModal: {
        isOpen: false
    }
}


export const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        permissionModalOpen: (state) => ({
            ...state,
            permissionModal: {
                isOpen: true
            }
        }),
        permissionModalClose: (state) => ({
            ...state,
            permissionModal: {
                isOpen: false
            }
        }),
    },
    extraReducers: (builder) => {
        builder
        .addMatcher(
            authApiSlice.endpoints.logout.matchFulfilled,
            (state) => ({
                ...state,
                permissionModal: {
                    isOpen: false
                }
            })
        )
    }
})


export const {
    permissionModalOpen,
    permissionModalClose
} = permissionsSlice.actions


export default permissionsSlice.reducer;

