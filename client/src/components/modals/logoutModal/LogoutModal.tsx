import React from "react";
import { ILogoutModalStoreState } from "./types/logoutModal.entities";
import { useAppDispatch } from "../../../app/hooks";
import { permissionModalOpen } from "../permissions/store/permissionsSlice";
import { logoutModalClose } from "./store/logoutModalSlice";

import './LogoutModal.css'


const LogoutModal: React.FC<ILogoutModalStoreState> = ({logoutModal}) => {
    const dispatch = useAppDispatch()
    
    
    const handleLogout = () => {
        dispatch(permissionModalOpen())
    }

    const onCloseLogoutModal = (event: Event) => {
        console.log(event.currentTarget);
         
        dispatch(logoutModalClose())
    }
    
    if (!logoutModal.isOpen) return null;

    return (
        <div className="logoutModal" onClick={onCloseLogoutModal} >
            <div className="modal" onClick={handleLogout}>
                <div className="container">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    <span>Log out</span>
                </div>
            </div>
        </div>
    )
}


export default LogoutModal;