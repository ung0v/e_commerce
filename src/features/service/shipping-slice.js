import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commerce } from "../../lib/commerce";

export const fetchShippingCountries = createAsyncThunk(
  "e_commerce/fetchShippingCountries",
  (checkoutTokenId) => {
    const { contries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    return contries;
  }
);

export const fetchShippingSubdivisions = createAsyncThunk(
  "e_commerce/fetchShippingSubdivisions",
  (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    return subdivisions;
  }
);

export const fetchShippingOptions = createAsyncThunk(
  "e_commerce/fetchShippingCountries",
  (checkoutTokenId, country, stateProvince) => {
    const options = await commerce.services.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );
    return options;
  }
);

const initialState = {
  shippingCountries: [],
  shippingCountry: "",
  shippingSubdivisions: [],
  shippingSubdivision: "",
  shippingOptions: [],
  shippingOption: "",
  loading: false,
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchShippingCountries.fulfilled]: (state, action) => {
      state.shippingCountries = action.payload;
      state.shippingCountry = Object.keys(action.payload)[0];
    },
    [fetchShippingSubdivisions.fulfilled]: (state, action) => {
      state.shippingSubdivisions = action.payload;
      state.shippingSubdivision = Object.keys(action.payload)[0];
    },
    [fetchShippingOptions.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchShippingOptions.fulfilled]: (state, action) => {
      state.shippingOptions = action.payload;
      state.shippingOption = action.payload[0].id;
      state.loading = false;
    },
  },
});

export default shippingSlice.reducer;
