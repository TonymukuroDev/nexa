import { IPermissionsStoreState } from "../types/permissions.entitites";

export const selectPermissionModal = (state: {permissions: IPermissionsStoreState}) => state.permissions.permissionModal 
