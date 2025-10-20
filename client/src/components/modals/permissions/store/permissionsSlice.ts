import { createSlice } from "@reduxjs/toolkit";
import { IPermissionsStoreState } from "../types/permissions.entitites";


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
    }
})


export const {
    permissionModalOpen,
    permissionModalClose
} = permissionsSlice.actions


export default permissionsSlice.reducer;

