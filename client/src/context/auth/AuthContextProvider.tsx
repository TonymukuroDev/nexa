import { useCallback, useEffect, useMemo } from "react"
import { useGetAuthUserQuery, useLoginMutation, useLogoutMutation, useRegisterUserMutation } from "../../app/features/auth/services/authApi"
import { TLoginRequest } from "../../app/features/auth/types/auth.request"
import { storageService } from "../../utils/config"
import { TRegisterFormData } from "../../pages/auth/register/types/registerform"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logoutAction } from "../../app/features/auth/slices/authSlice"
import { selectIsAuthenticated, selectAuthToken } from "../../app/features/auth/slices/authSelector"
import { AuthContext, IAuthContext } from "./AuthContext"
import { ProfileModalClose, profileModalOpen } from "../../components/modals/profileModal/store/profileModalSlice"
import { useSetUserProfileMutation } from "../../app/features/profiles/services/profilesApi"
import { TProfileFormData } from "../../components/modals/profileModal/type/profileModal.entities"
import { ISetUserProfileRequest } from "../../app/features/profiles/types/profiles.request"
import { ProfileStatus } from "../../app/features/profiles/types/profiles.entities"
import { toast } from "react-toastify"
import { IAuthUser } from "../../app/features/auth/types/auth.entities"


export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const authToken = useAppSelector(selectAuthToken)
    const [loginMutation, {isLoading: loginLoading, isSuccess: loginSuccess, isError: loginFailure}] = useLoginMutation()
    const [registerMutation, {isLoading: registerLoading, isSuccess: registerSuccess, isError: registerFailure}] = useRegisterUserMutation()
    const [logoutMutation] = useLogoutMutation()
    const [setUserProfileMutation, {isLoading: setUserProfileLoading, isSuccess: setUserProfileSuccess, isError: setUserProfileFailure}] = useSetUserProfileMutation()

    const {
        data: authUser,
        isLoading: authUserLoading,
        error: authUserError,
        refetch: refetchUser,
        isUninitialized
    } = useGetAuthUserQuery(undefined, {
        skip: !isAuthenticated
    })
    
    const initializeAuth = useCallback(async () => {
        // Initialize auth from token on mount
        const token = storageService.retrieve<string>("token");
        console.log("Auth token", token);
        console.log("User not fetch yet",isUninitialized);
        
        
        if (!token) {
            await logoutMutation();
        }
        
        try {
            // Token exists, verify it by fetching user data
            await refetchUser().unwrap();
            //dispatch(setAuth())
        } catch (error) {
            // Token is invalid, clear it
            storageService.delete('token');
            await logoutMutation();
            console.log("Refetch User error", error);
        }
    }, [refetchUser, isUninitialized, logoutMutation]);


    // Check if the user already set his profile after creating his account
    const checkProfile = useCallback((authUser: IAuthUser) => {
        console.log("Profile checked");
        console.log("Auth User", authUser);
        
        if(!authUser.profile) dispatch(profileModalOpen());
        if(authUser.profile) dispatch(ProfileModalClose()) 

    }, [dispatch])
    
    useEffect(() => {
        // Refetch the user when the token exists
        initializeAuth()

    }, [ 
        initializeAuth,
    ])


    const login = useCallback(async (data: TLoginRequest): Promise<void> => {

        try {
            const response = await loginMutation(data);
            
            if(loginSuccess && response.data){
                
                const {data} = response.data
                console.log("login response", data.token);
                
                storageService.save("token", data.token)

                // Initialize socket connection
            };
            
            if(loginFailure && response.error) {
                const {error} = response
                throw error
            }


        } catch(error) {
            console.log("Login Error",error);

            throw new Error("Login failed! Try again.");
            
        }
    }, [loginMutation, loginFailure, loginSuccess])


    const register = useCallback(async (data:TRegisterFormData): Promise<void> => {

        try {
            const response = await registerMutation(data);
    
            if(registerSuccess && response.data){
                
                const {data} = response.data
                console.log("register response", data.token);
                
                storageService.save("token", data.token)

                // Initialize socket connection
            };
            
            if(registerFailure && response.error) {
                const {error} = response
                throw error
            }
            
        } catch (error) {
            console.log("Register Error", error);
            throw new Error("Register failed! Try again.")
        }

    }, [registerMutation,registerFailure, registerSuccess])


    const logout = useCallback(async (): Promise<void> => {
        try {
            if(isAuthenticated && authToken) {
                await logoutMutation();
            }
        } catch (error) {
            console.log("Logout Api call failed", error);
            
        } finally {
            // Disconnect socket
            dispatch(logoutAction())
        }
    }, [logoutMutation, dispatch, isAuthenticated, authToken])


    // Set user profile
    const setUserProfile = useCallback(async (data: TProfileFormData): Promise<void> => {

        const requestData: ISetUserProfileRequest = {
            username: data.username,
            bio: data.bio,
            status: ProfileStatus.ONLINE
        }

        const response = await setUserProfileMutation(requestData)
        
        if(setUserProfileSuccess && response.data) {
            const {data} = response.data
            console.log("Set profile response", data);
            
            toast(data.message)

            // Refetch user
            await refetchUser().unwrap();
        }

        if(setUserProfileFailure && response.error) {
            toast("Something went wrong!")
            dispatch(logoutAction())
        }
    },[
        setUserProfileMutation,
        setUserProfileSuccess,
        setUserProfileFailure,
        dispatch,
        refetchUser
    ]) 

    const contextValue = useMemo<IAuthContext>((): IAuthContext => {

        return  {
            authUser: {
                data: authUser ? {
                    id: authUser.data.id,
                    firstName: authUser.data.firstName,
                    lastName: authUser.data.lastName,
                    phoneNumber: authUser.data.phoneNumber,
                    roles: authUser.data.roles,
                    photo: authUser.data.photo,
                    profile: authUser.data.profile
                } : undefined,
                isLoading: authUserLoading,
                error:authUserError
            },
            isAuthenticated,
            login,
            loginLoading,
            register,
            registerLoading,
            logout,
            setUserProfile,
            setUserProfileLoading,
            checkProfile
        }
    }, [
        authUser,
        authUserLoading,
        authUserError,  
        isAuthenticated, 
        login, 
        loginLoading,
        register,
        registerLoading,
        logout,
        setUserProfile,
        setUserProfileLoading,
        checkProfile
    ])
    

    
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}