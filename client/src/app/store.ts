import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./features/api";
import authReducer from './features/auth/slices/authSlice'
import permissionsReducer from '../components/modals/permissions/store/permissionsSlice'
import logoutModalReducer from '../components/modals/logoutModal/store/logoutModalSlice'
import profileModalReducer from '../components/modals/profileModal/store/profileModalSlice'
import contactBtnContainerReducer from '../components/modals/contactBtnContainer/store/contactBtnContainer.slice'


export const store = configureStore({
    reducer: {
      auth: authReducer,
      permissions: permissionsReducer,
      logoutModal: logoutModalReducer,
      profileModal: profileModalReducer,
      contactBtnContainer: contactBtnContainerReducer,
      [baseApi.reducerPath]: baseApi.reducer
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST', 
          'socket/connect', 
          'socket/disconnect'
        ],
      },
    }).concat(baseApi.middleware),
})


export type AppStore = typeof store
export type RootState = ReturnType<typeof store["getState"]>;
export type AppDispatch = typeof store["dispatch"];

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>