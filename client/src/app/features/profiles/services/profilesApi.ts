import { baseApi } from "../../api";
import { ISetUserProfileRequest } from "../types/profiles.request";
import { ISetUserProfileResponse } from "../types/profiles.response";


export const profileSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        setUserProfile: builder.mutation<ISetUserProfileResponse, ISetUserProfileRequest>({
            query: (data) => ({
                url: `/users/profile`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['AuthUser']
        })
    })
})

export const {
    useSetUserProfileMutation
} = profileSlice