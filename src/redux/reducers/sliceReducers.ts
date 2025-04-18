import commonAction from "./slice/commonAction";
import orderHistoryAction from "./slice/orderHistory";

const sliceReducers = {
  commonAction: commonAction.reducer,
  orderHistoryAction: orderHistoryAction.reducer,
};

export default sliceReducers;
