import React from "react";
import { IContactBtnContainer } from "./types/contactBtnContainer.props";

import './ContactBtnContainer.css'
import { contactBtnContainerClose } from "./store/contactBtnContainer.slice";
import { useAppDispatch } from "../../../app/hooks";

const ContactBtnContainer: React.FC<IContactBtnContainer> = ({contactBtnContainer}) => {
    const dispatch = useAppDispatch()
    const onCloseContactBtnContainer = () => {
    dispatch(contactBtnContainerClose())
  }
    if(!contactBtnContainer.isOpen) return null;

    return (
        
        <div onClick={onCloseContactBtnContainer} className="contact btn__container">
            <div className="container">
                <div className="modal">
                    <button className="btn chat">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  className="icon">
                            <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
                        </svg>
                        <span>New private chat</span>
                    </button>
                    <button className="btn contact">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  className="icon">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>
                        <span>New contact</span>
                    </button>
                </div>
            </div>
        </div>
    )
} 



export default ContactBtnContainer;