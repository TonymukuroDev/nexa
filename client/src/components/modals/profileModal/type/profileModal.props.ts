import { IAuthUser } from "../../../../app/features/auth/types/auth.entities";
import { TProfileFormData } from "./profileModal.entities";

export interface IProfileModalProps {
    profileModal: {
        isOpen: boolean
    };
    authUser?: IAuthUser;
    setUserProfile: (data: TProfileFormData) => Promise<void>;
    setUserProfileLoading: boolean;
}