import { createApi } from "@reduxjs/toolkit/query/react";
import { config } from "@src/config";
import { IOrderGridProps } from "@src/interface/Order/OrderTypes";
import { customBaseQuery } from "./customBaseQuery";

export const orderHistoryApi = createApi({
  reducerPath: "orderHistoryApi",
  baseQuery: customBaseQuery(config.mockUrl),
  endpoints: (builder) => ({
    getAllOrderHistory: builder.mutation<IOrderGridProps[], void>({
      query: () => ({
        url: "/orderHistoryGrid", // The API endpoint path for login
        method: "GET",
        // body: JSON.stringify(credentials), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    getOrderHistory: builder.mutation({
      query: () => ({
        url: "/orderHistoryDetails", // The API endpoint path for login
        method: "GET",
        // body: JSON.stringify(credentials), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
  }),
});

export const { useGetAllOrderHistoryMutation, useGetOrderHistoryMutation } = orderHistoryApi;
