import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import middleWares from "../middlewares";
import reducers from "../reducers";

export const store: EnhancedStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleWares),
});
setupListeners(store.dispatch);
