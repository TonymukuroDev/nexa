import { ILogoutModalStoreState } from "../types/logoutModal.entities";

export const selectLogoutModal = (state: {logoutModal: ILogoutModalStoreState}) => state.logoutModal.logoutModal