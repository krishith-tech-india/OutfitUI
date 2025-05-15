import { Middleware } from "@reduxjs/toolkit";
import { authApi } from "../authApi";
import { orderHistoryApi } from "../orderHIstoryApi";
import { ImageTypeApi } from "../ImageType";
import { UserApi } from "../User";
import { RolesApi } from "../Roles";
import { OrderStatusApi } from "../OrderStatus";

const apiMiddleWares: Middleware[] = [
  authApi.middleware,
  orderHistoryApi.middleware,
  ImageTypeApi.middleware,
  UserApi.middleware,
  RolesApi.middleware,
  OrderStatusApi.middleware,
];

export default apiMiddleWares;
