import { authApi } from "./api/authApi";
import { orderHistoryApi } from "./api/orderHIstoryApi";

const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [orderHistoryApi.reducerPath]: orderHistoryApi.reducer,
};

export default apiReducers;
