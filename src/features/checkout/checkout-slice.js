import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commerce } from "../../lib/commerce";

export const captureCheckoutAsync = createAsyncThunk(
  "e_commerce/captureCheckoutAsync",
  async ({ checkoutTokenId, orderData }, { rejectWithValue }) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        orderData
      );
      return incomingOrder;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data.error.message);
    }
  }
);

export const generateTokenAsync = createAsyncThunk(
  "e_commerce/generateTokenAsync",
  async (cart) => {
    const token = await commerce.checkout.generateTokenFrom("cart", cart.id);
    return token;
  }
);

const initialState = {
  order: {},
  loading: false,
  errorMessage: null,
  token: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    next: (state, action) => {},
  },
  extraReducers: {
    [captureCheckoutAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [captureCheckoutAsync.rejected]: (state, action) => {
      state.loading = false;
      console.log(action);
      state.errorMessage = action.payload;
    },
    [captureCheckoutAsync.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action);
      state.order = action.payload;
    },
    [generateTokenAsync.fulfilled]: (state, action) => {
      state.token = action.payload;
    },
  },
});

export default checkoutSlice.reducer;
