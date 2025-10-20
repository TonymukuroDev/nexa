import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { environment } from "../../environment";
import { storageService } from "../../utils/config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IGetRefreshTokenResponse } from "./auth/types/auth.response";


const baseQuery = fetchBaseQuery({
    baseUrl: environment.apiUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = storageService.retrieve<string>("token")
        
        if(token) headers.set('authorization', `Bearer ${token}`);

        return headers;
    }
})


export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        let result  = await baseQuery(args, api, extraOptions);

        if(result.error?.status === 401) {
            const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

            if(refreshResult.data) {
                const {data} = refreshResult.data as IGetRefreshTokenResponse;

                storageService.save("token", data.token);
                
                // Retry the original request
                result = await baseQuery(args, api, extraOptions);
            } else {
                // Refresh failed - logout
                storageService.delete("token")

                // You can dispatch logout action here if needed

            } 
        }

        return result
    },
    tagTypes: ['AuthUser'],
    endpoints: () => ({})
}) 