import { authApi } from "./api/authApi";
import { ImageTypeApi } from "./api/ImageType";
import { orderHistoryApi } from "./api/orderHIstoryApi";
import { RolesApi } from "./api/Roles";
import { UserApi } from "./api/User";

const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [orderHistoryApi.reducerPath]: orderHistoryApi.reducer,
  [ImageTypeApi.reducerPath]: ImageTypeApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [RolesApi.reducerPath]: RolesApi.reducer,
};

export default apiReducers;
