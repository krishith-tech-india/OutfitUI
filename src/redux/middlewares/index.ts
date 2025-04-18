import { Middleware } from "@reduxjs/toolkit";
import apiMiddleWares from "../reducers/api/middlewares/apiMiddleWares";
import { showNotificationMiddleware } from "./showNotificationMiddleware";

const middleWares: Middleware[] = [...apiMiddleWares, showNotificationMiddleware];
export default middleWares;
