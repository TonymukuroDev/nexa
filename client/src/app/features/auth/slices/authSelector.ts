import { IAuthStoreState } from "../types/auth.entities";

export const selectIsAuthenticated = (state: {auth: IAuthStoreState}) => state.auth.isAuthenticated;

export const selectAuthToken = (state: {auth: IAuthStoreState}) => state.auth.token; 