import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { config } from "@src/config";
import { handle } from "@src/helpers/handle";
import { loggedInUser } from "@src/helpers/loggedInUser";

export const customBaseQuery = (url = config.apiUrl): BaseQueryFn => {
  return fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers: Headers) => {
      const token = loggedInUser.getUser();
      headers.set("Content-Type", "application/json");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
      return headers;
    },
    responseHandler: handle.handleResponse,
  });
};

// export const createCustomQuery = (queryFunction):EndpointDefinition => (builder) => {
//   return builder.query({
//     query: (queryArgs) => queryFunction(queryArgs),
//     transformResponse: (response:response ) => {
//       return response?.data
//     },
//     transformErrorResponse: (response:response ) => {
//       return response?.data
//     }
//   });
// };
