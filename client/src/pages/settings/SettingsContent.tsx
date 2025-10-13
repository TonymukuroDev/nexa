import { NavLink } from 'react-router'
import './SettingsContent.css'
import assets from '../../assets/assets'
import React from 'react'
import { ISettingsContentProps } from './types/settings.props'
import { useAppDispatch } from '../../app/hooks'
import { permissionModalOpen } from '../../components/modals/permissions/store/permissionsSlice'



const SettingsContent: React.FC<ISettingsContentProps> = ({authUser}) => {    
    const dispatch = useAppDispatch()


    const handlePermission = () => {
        dispatch(permissionModalOpen())
    }
    return (
        <div className="settings content">
            <div className="head">
                <div id="page">Settings</div>
            </div>
            <div className="body">
                <NavLink to="/profile" className="profile">
                    <img src={authUser?.photo ? authUser.photo : assets.userPlaceholder} alt={`${authUser?.firstName} ${authUser?.lastName}`} />
                    <div className="profile__content">
                        <div className="user">{authUser?.firstName}</div>
                        <div className="bio">Bio</div>
                    </div>
                </NavLink>
                <div className="line"></div>
            </div>
            <div className="footer">
                <button onClick={handlePermission}  className="btn logout">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    <span className="text">Log out</span>
                </button>
            </div>
        </div>
    )
}


export default SettingsContent;