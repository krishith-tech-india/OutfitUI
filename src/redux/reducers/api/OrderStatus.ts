import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";
import { IOrderStatus, OrderResponse } from "@src/interface/OrderStatus/OrderStatus";

export const OrderStatusApi = createApi({
  reducerPath: "OrderStatusApi",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getAllOrderStatus: builder.mutation<OrderResponse, void>({
      query: () => ({
        url: "/OrderStatus", // The API endpoint path for login
        method: "GET",
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    AddOrderStatus: builder.mutation<OrderResponse, IOrderStatus>({
      query: (newData) => ({
        url: `/OrderStatus`,
        method: "POST",
        body: newData,
      }),
    }),
    DeleteOrderStatus: builder.mutation<any, string>({
      query: (id) => ({
        url: `/OrderStatus/${id}`, // The API endpoint path for login
        method: "DELETE",
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    UpdateOrderStatus: builder.mutation<OrderResponse, { id: string; data: Partial<IOrderStatus> }>({
      query: ({ id, data }) => ({
        url: `/OrderStatus/${id}`, // The API endpoint path for login
        method: "PUT",
        body: data,
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
  }),
});

export const { useGetAllOrderStatusMutation } = OrderStatusApi;
export const { useDeleteOrderStatusMutation } = OrderStatusApi;
export const { useUpdateOrderStatusMutation } = OrderStatusApi;
export const { useAddOrderStatusMutation } = OrderStatusApi;
