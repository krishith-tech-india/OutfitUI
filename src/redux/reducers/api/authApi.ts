import { createApi } from "@reduxjs/toolkit/query/react";
import ILocalStorageUser from "@src/interface/loggedInUser/ILocalStorageUser";
import { customBaseQuery } from "./customBaseQuery";

export const authApi = createApi({
  reducerPath: "authenticate",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    authenticate: builder.mutation<ILocalStorageUser, string>({
      query: (credentials: string) => ({
        url: "/Auth", // The API endpoint path for login
        method: "POST",
        body: JSON.stringify(credentials), // The data you want to send in the request body (e.g., { username, password })
      }),
      transformResponse: (response: { data: ILocalStorageUser }) => {
        return response?.data;
      },
    }),
  }),
}); // example of api calling

export const { useAuthenticateMutation } = authApi;
