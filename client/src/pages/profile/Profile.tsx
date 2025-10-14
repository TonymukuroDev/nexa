import { useGetAuthUserQuery, useLogoutMutation } from "../../app/features/auth/services/authApi"; 
import ContainerPage from "../../components/container/ContainerPage";
import LogoutModal from "../../components/modals/logoutModal/LogoutModal";
import NavbarFeatures from "../../components/navbars/navbarFeatures/NavbarFeatures"
import ProfileContent from "./ProfileContent";
import { selectLogoutModal } from "../../components/modals/logoutModal/store/logoutModalSelectors";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPermissionModal } from "../../components/modals/permissions/store/permissionsSelectors";
import { useNavigate } from "react-router";
import { IPermissionModalProps } from "../../components/modals/permissions/types/permissions.props";
import { permissionModalClose } from "../../components/modals/permissions/store/permissionsSlice";
import PermissionModal from "../../components/modals/permissions/PermissionModal";


const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const [logout] = useLogoutMutation()
    const {data} = useGetAuthUserQuery()

    const logoutModal = useAppSelector(selectLogoutModal)

    const permissionModal = useAppSelector(selectPermissionModal)

    const modalContent: IPermissionModalProps["modalContent"] = {
        process: "Log out",
        content: ["Do you really want to log out?", "You can also close the tab and come back later."],
        btnName: "Log out",
        confirmAction: async () => {
            await logout().unwrap()
                 navigate('/')
            },
            cancelAction: () => {
                dispatch(permissionModalClose())
            }
        }
    return (
        <>
            <NavbarFeatures authUser={data?.data}/>
            <ProfileContent authUser={data?.data}/>
            <LogoutModal logoutModal={logoutModal}/>
            <PermissionModal 
            permissionModal={permissionModal} 
            modalContent={modalContent}
            /> 
            <ContainerPage>
                <div className="page">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>

                    <div className="title">Profile</div>
                </div>
            </ContainerPage>
        </>
    )
}


export default ProfilePage;