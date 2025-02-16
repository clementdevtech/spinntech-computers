import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import chatReducer from "./chatSlice";
import affiliateReducer from "./affiliateSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    chat: chatReducer,
    affiliate: affiliateReducer,
    notifications: notificationReducer,
  },
});

export default store;
