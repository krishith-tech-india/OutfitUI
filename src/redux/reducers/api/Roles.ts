import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";

export const RolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getAllRoles: builder.mutation<any, void>({
      query: () => ({
        url: "/Roles", // The API endpoint path for login
        method: "GET",
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
  }),
});

export const { useGetAllRolesMutation } = RolesApi;
