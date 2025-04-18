import { Middleware } from "@reduxjs/toolkit";
import { errorNotification, successNotification } from "../reducers/slice/commonAction";

interface IAction {
  type: string;
  payload?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
}

export const showNotificationMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: IAction) => {
    if (action.type.endsWith("/rejected")) {
      const errorMessage = action.payload?.data?.error;
      if (typeof errorMessage === "string" && errorMessage.length > 0) {
        dispatch(errorNotification(errorMessage));
      }
    } else if (action.type.endsWith("/fulfilled")) {
      const successMessage = action.payload?.data?.message || action.payload?.data;
      if (typeof successMessage === "string" && successMessage.length > 0) {
        dispatch(successNotification(successMessage));
      }
    }
    return next(action);
  };
