import { authApi } from "./api/authApi";
import { ImageTypeApi } from "./api/ImageType";
import { orderHistoryApi } from "./api/orderHIstoryApi";

const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [orderHistoryApi.reducerPath]: orderHistoryApi.reducer,
  [ImageTypeApi.reducerPath]: ImageTypeApi.reducer,
};

export default apiReducers;
