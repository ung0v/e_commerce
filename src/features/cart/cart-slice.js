import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commerce } from "../../lib/commerce";

export const fetchCartAsync = createAsyncThunk(
  "e_commerce/fetchCartAsync",
  async () => {
    const cart = await commerce.cart.retrieve();
    console.log(cart);
    return cart;
  }
);

export const addToCartAsync = createAsyncThunk(
  "e_commerce/addToCartAsync",
  async (payload) => {
    const { cart } = await commerce.cart.add(
      payload.productId,
      payload.quantity
    );
    return cart;
  }
);

export const replaceCartAsync = createAsyncThunk(
  "e_commerce/addToCartAsync",
  async (payload) => {
    const { cart } = await commerce.cart.update(payload.LineItemId, {
      quantity: payload.quantity,
    });
    return cart;
  }
);

export const removeCartAsync = createAsyncThunk(
  "e_commerce/fetchCartAsync",
  async (payload) => {
    const { cart } = await commerce.cart.remove(payload.productId);
    return cart;
  }
);

export const emptyCartAsync = createAsyncThunk(
  "e_commerce/fetchCartAsync",
  async () => {
    const { cart } = await commerce.cart.empty();
    return cart;
  }
);

export const refreshCartAsync = createAsyncThunk(
  "e_commerce/fetchCartAsync",
  async () => {
    const { cart } = await commerce.cart.refresh();
    return cart;
  }
);

const initialState = {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCartAsync.fulfilled]: (state, action) => {
      return action.payload;
    },
    [replaceCartAsync.fulfilled]: (state, action) => {
      return action.payload;
    },
    [removeCartAsync.fulfilled]: (state, action) => {
      return action.payload;
    },
    [emptyCartAsync.fulfilled]: (state, action) => {
      return action.payload;
    },
    [refreshCartAsync.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default cartSlice.reducer;
