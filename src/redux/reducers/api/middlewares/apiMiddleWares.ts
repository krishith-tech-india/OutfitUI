import { Middleware } from "@reduxjs/toolkit";
import { authApi } from "../authApi";
import { orderHistoryApi } from "../orderHIstoryApi";
import { ImageTypeApi } from "../ImageType";

const apiMiddleWares: Middleware[] = [authApi.middleware, orderHistoryApi.middleware, ImageTypeApi.middleware];

export default apiMiddleWares;
