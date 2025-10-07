import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "../../environment";
import { storageService } from "../../utils/config";
import { IErrorResponse } from "../types/store";




const baseQuery = fetchBaseQuery({
    baseUrl: environment.apiUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = storageService.retrieve<string>("token", false)

        if(token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    }
})


export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  IErrorResponse
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Try to refresh token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    
    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };
      localStorage.setItem('accessToken', accessToken);
      
      // Retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed - logout
      localStorage.removeItem('accessToken');
      // You can dispatch logout action here if needed
    }
  }

  return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['User'],
    endpoints: () =>  ({}),
})
