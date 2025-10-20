import { createSlice } from "@reduxjs/toolkit";
import { IProfileModalStoreState } from "../type/profileModal.entities";


const initialState: IProfileModalStoreState = {
    profileModal: {
        isOpen: false
    }
}



const profileModalSlice = createSlice({
    name: 'profileModal',
    initialState,
    reducers: {
        profileModalOpen: (state) => ({
            ...state,
            profileModal: {
                isOpen: true
            }
        }),
        ProfileModalClose: (state) => ({
            ...state,
            profileModal: {
                isOpen: false
            }
        }) 
    }
})



export const {
    profileModalOpen,
    ProfileModalClose
} = profileModalSlice.actions


export default profileModalSlice.reducer;