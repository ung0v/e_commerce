import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commerce } from "../../lib/commerce";
export const fetchProductsAysnc = createAsyncThunk(
  "e_commerce/fetchProductsAysnc",
  async () => {
    const { data } = await commerce.products.list();
    return data;
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState: { products: [], loading: false },
  extraReducers: {
    [fetchProductsAysnc.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProductsAysnc.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
  },
});

export default productSlice.reducer;
