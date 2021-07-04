import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cart-slice";
import productReducer from "../features/products/product-slice";
import checkoutReducer from "../features/checkout/checkout-slice";
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});
console.log(store.getState());
export default store;
