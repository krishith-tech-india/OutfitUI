import { Middleware } from "@reduxjs/toolkit";
import { authApi } from "../authApi";
import { orderHistoryApi } from "../orderHIstoryApi";

const apiMiddleWares: Middleware[] = [authApi.middleware, orderHistoryApi.middleware];

export default apiMiddleWares;
