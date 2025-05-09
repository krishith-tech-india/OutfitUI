import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";
import { ImageTypeResponse } from "@src/interface/ImageType/ImageType";
import { IImageType } from "@src/interface/ImageType/ImageType";

export const ImageTypeApi = createApi({
  reducerPath: "ImageTypeApi",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getAllImageType: builder.mutation<ImageTypeResponse, void>({
      query: () => ({
        url: "/ImageType", // The API endpoint path for login
        method: "GET",
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    AddImageType: builder.mutation<ImageTypeResponse, IImageType>({
      query: (newData) => ({
        url: `/ImageType`,
        method: "POST",
        body: newData,
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    DeleteImageType: builder.mutation<any, string>({
      query: (id) => ({
        url: `/ImageType/${id}`, // The API endpoint path for login
        method: "DELETE",
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    UpdateImageType: builder.mutation<ImageTypeResponse, { id: string; data: Partial<IImageType> }>({
      query: ({ id, data }) => ({
        url: `/ImageType/${id}`, // The API endpoint path for login
        method: "PUT",
        body: data,
        //body: JSON.stringify(), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
  }),
});

export const { useGetAllImageTypeMutation } = ImageTypeApi;
export const { useDeleteImageTypeMutation } = ImageTypeApi;
export const { useUpdateImageTypeMutation } = ImageTypeApi;
export const { useAddImageTypeMutation } = ImageTypeApi;
