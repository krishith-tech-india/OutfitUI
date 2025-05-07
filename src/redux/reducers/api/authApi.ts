import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";
import ILocalStorageToken from "@src/interface/loggedInUser/ILocalStorageUser";

interface payload {
  emailOrPhone:string,
  password:string
}

export const authApi = createApi({
  reducerPath: "authenticate",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    authenticate: builder.mutation<ILocalStorageToken, payload>({
      query: (payload: payload) => ({
        url: "/user/authenticate", // The API endpoint path for login
        method: "POST",
        body: JSON.stringify(payload), // The data you want to send in the request body (e.g., { username, password })
      })
    }),
  }),
}); // example of api calling


export const { useAuthenticateMutation } = authApi;
