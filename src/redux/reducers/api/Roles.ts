import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";
import { IRoles, RoleResponse } from "@src/interface/Roles/Roles";

export const RolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getAllRoles: builder.mutation<RoleResponse, void>({
      query: () => ({
        url: "/Roles", // The API endpoint path for login
        method: "GET",
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    AddRole: builder.mutation<RoleResponse, IRoles>({
      query: (newData) => ({
        url: `/Roles`,
        method: "POST",
        body: newData,
      }),
    }),
    DeleteRole: builder.mutation<any, string>({
      query: (id) => ({
        url: `/Roles/${id}`, // The API endpoint path for login
        method: "DELETE",
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    UpdateRole: builder.mutation<RoleResponse, { id: string; data: Partial<IRoles> }>({
      query: ({ id, data }) => ({
        url: `/Roles/${id}`, // The API endpoint path for login
        method: "PUT",
        body: data,
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
  }),
});

export const { useGetAllRolesMutation } = RolesApi;
export const { useDeleteRoleMutation } = RolesApi;
export const { useUpdateRoleMutation } = RolesApi;
export const { useAddRoleMutation } = RolesApi;
