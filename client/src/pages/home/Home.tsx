import ContainerPage from "../../components/container/ContainerPage";
import ProfileModal from "../../components/modals/profileModal/ProfileModal";
import NavbarFeatures from "../../components/navbars/navbarFeatures/NavbarFeatures";
import HomeContent from "./HomeContent";
import { useAuth } from "../../context/auth/authContextHook";
import { useAppSelector } from "../../app/hooks";
import { selectProfileModal } from "../../components/modals/profileModal/store/profileModalSelector";
import { useEffect } from "react";


const HomePage = () => {
    const {authUser, setUserProfile, setUserProfileLoading, checkProfile} = useAuth()
    const profileModal = useAppSelector(selectProfileModal)

    useEffect(() => {
        if(authUser.data) {
            checkProfile(authUser.data)
        }
    }, [authUser,checkProfile])

    return (
        <>
            <NavbarFeatures authUser={authUser.data} />
            <HomeContent/>
            <ContainerPage>
                <div className="page">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
                    </svg>
                    <div className="title">Messages</div>
                    <div className="subtitle__container">
                        <div className="subtitle">Communicate with your peers.</div>
                        <div className="subtitle">You can be connected on 4 devices simultaneously.</div>
                    </div>
                </div>
            </ContainerPage>
            <ProfileModal 
            authUser={authUser.data}  
            profileModal={profileModal}
            setUserProfile={setUserProfile}
            setUserProfileLoading={setUserProfileLoading} 
            />
        </>
    )
}


export default HomePage;