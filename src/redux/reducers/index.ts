import { combineReducers } from "@reduxjs/toolkit";
import apiReducers from "./apiReducers";
import sliceReducers from "./sliceReducers";

const rootReducer = combineReducers({ ...apiReducers, ...sliceReducers });
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
