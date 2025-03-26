import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/authSlice";
import productSlice from "../Features/productSlice";
import cartSlice from "../Features/cartSlice";
import orderSlice from "../Features/orderSlice";
import paymentSlice from "../Features/paymentSlice";
import adminOrderSlice from "../Features/adminOrderSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    cartData: cartSlice,
    order: orderSlice,
    payment: paymentSlice,
    adminOrder: adminOrderSlice,
  },
});

export default store;
