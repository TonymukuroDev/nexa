import React from 'react'
import { IPermissionModalProps } from './types/permissions.props'

import './PermissionModal.css'

const PermissionModal: React.FC<IPermissionModalProps> = ({permissionModal, modalContent}) => {

    if(!permissionModal.isOpen) return null;

    return (
        <div className="permissionModal">

            <div className="modal">
                <div className="head">
                    <div className="process">{modalContent.process}</div>
                </div>
                <div className="body">
                    <div className="text">{modalContent.content.map((el) => (
                        <div key={el}>{el}</div>
                    ))}</div>
                </div>
                <div className="footer">
                    <div className="btn__container">
                        <button onClick={modalContent.cancelAction} className="btn cancel">cancel</button>
                        <button onClick={modalContent.confirmAction} className="btn confirm">{modalContent.btnName}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default PermissionModal;