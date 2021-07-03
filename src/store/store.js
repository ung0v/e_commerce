import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cart-slice";
import productSlice from "../features/products/product-slice";
const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartReducer,
  },
});

export default store;
