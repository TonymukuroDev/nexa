import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./features/api";
import authReducer from './features/auth/slices/authSlice'
import permissionsReducer from '../components/modals/permissions/store/permissionsSlice'
export const store = configureStore({
    reducer: {
      auth: authReducer,
      permissions: permissionsReducer, 
      [baseApi.reducerPath]: baseApi.reducer
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
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