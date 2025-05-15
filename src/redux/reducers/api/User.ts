import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";
import { IUser, UserResponse } from "@src/interface/User/User";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getAllUser: builder.mutation<UserResponse, void>({
      query: () => ({
        url: "/User", // The API endpoint path for login
        method: "GET",
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    AddUser: builder.mutation<UserResponse, IUser>({
      query: (newData) => ({
        url: `/User`,
        method: "POST",
        body: newData,
      }),
    }),
    DeleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/User/${id}`, // The API endpoint path for login
        method: "DELETE",
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    UpdateUser: builder.mutation<UserResponse, { id: string; data: Partial<IUser> }>({
      query: ({ id, data }) => ({
        url: `/User/${id}`, // The API endpoint path for login
        method: "PUT",
        body: data,
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    UserExistByEmail: builder.mutation<any, string>({
      query: (email: string) => ({
        url: `User/UserEmailExist/${email}`,
        method: "GET",
      }),
    }),
    UserExistByPhNo: builder.mutation<any, string>({
      query: (phNo: string) => ({
        url: `User/UserPhoneNoExist/${phNo}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUserMutation } = UserApi;
export const { useAddUserMutation } = UserApi;
export const { useDeleteUserMutation } = UserApi;
export const { useUpdateUserMutation } = UserApi;
export const { useUserExistByEmailMutation } = UserApi;
export const { useUserExistByPhNoMutation } = UserApi;
