import { createSlice } from "@reduxjs/toolkit";
import { IContactBtnContainerStoreState } from "../types/contactBtnContainer.entity";

const initialState: IContactBtnContainerStoreState= {
    contactBtnContainer: {
        isOpen: false
    }
}



const contactBtnContainerSlice = createSlice({
    name: 'contactBtnContainer',
    initialState,
    reducers: {
        contactBtnContainerOpen: (state) => ({
            ...state,
            contactBtnContainer: {
                isOpen: true
            }
        }),
        contactBtnContainerClose: (state) => ({
            ...state,
            contactBtnContainer: {
                isOpen: false
            }
        }),

    }
})



export const {
    contactBtnContainerClose,
    contactBtnContainerOpen
} = contactBtnContainerSlice.actions 


export default contactBtnContainerSlice.reducer