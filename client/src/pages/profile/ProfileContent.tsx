
import React from 'react'
import './ProfileContent.css'
import { IProfileContentProps } from './types/profile.props'
import assets from '../../assets/assets'
import { formatPhoneNumber } from '../../utils/phone.utils'
import { useAppDispatch } from '../../app/hooks'
import { logoutModalOpen } from '../../components/modals/logoutModal/store/logoutModalSlice'

const ProfileContent:React.FC<IProfileContentProps> = ({authUser}) => {
  const dispatch = useAppDispatch()

  const onOpenLogoutModal = () => {
    dispatch(logoutModalOpen())
  }

  const formattedPhone = authUser ? formatPhoneNumber(authUser.phoneNumber) : ''
  return (
    <div className="profile content">
      <div className="head">
        <div id="page">Profile</div>
        <div className="btn__container">
          <button className="btn edit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </button>

          <button className="btn option" onClick={onOpenLogoutModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>

          </button>
        </div>
      </div>
      <div className="body">
        <div className="section--1">
          <div className="img__container">
            <img src={authUser?.photo ? authUser.photo : assets.userPlaceholder} alt={authUser?.firstName} />
          </div>
          <div className="user">
            <p className="name">{`${authUser?.firstName} ${authUser?.lastName}`}</p>
            <p className="status">online</p>
          </div>
        </div>

        <div className="section--2">
          <div className="info phone">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <div>
              <span>{formattedPhone}</span>
              <span>phone</span>
            </div>
          </div>

          <div className="info username">
            <svg id="at-icon-1" viewBox="0 0 100 100" className="icon">
                <circle cx="50" cy="50" r="45" fill="none"  strokeWidth="8"></circle>
                <path d="M50,30 A20,20 0 1,0 50,70 A20,20 0 1,0 50,30 Z" fill="none"  strokeWidth="8"></path>
                <path d="M65,50 A15,15 0 0,0 50,65" fill="none"  strokeWidth="8"></path>
            </svg>
            <div>
              <span>TonyMDK</span>
              <span>username</span>
            </div>
          </div>

          <div className="info bio">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <div>
              <span>Bring out the best in others</span>
              <span>Bio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileContent