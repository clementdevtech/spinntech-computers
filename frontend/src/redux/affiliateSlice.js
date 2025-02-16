import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Affiliate Data
export const fetchAffiliateData = createAsyncThunk("affiliate/fetchData", async () => {
  const response = await axios.get("/api/affiliate");
  return response.data;
});

// Fetch Referral Count
export const fetchReferrals = createAsyncThunk("affiliate/fetchReferrals", async () => {
  const response = await axios.get("/api/affiliate/referrals");
  return response.data;
});

// Fetch Earnings
export const fetchEarnings = createAsyncThunk("affiliate/fetchEarnings", async () => {
  const response = await axios.get("/api/affiliate/earnings");
  return response.data;
});

const affiliateSlice = createSlice({
  name: "affiliate",
  initialState: {
    referralCount: 0,
    earnings: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAffiliateData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAffiliateData.fulfilled, (state, action) => {
        state.loading = false;
        state.referralCount = action.payload.referrals;
        state.earnings = action.payload.earnings;
      })
      .addCase(fetchAffiliateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchReferrals.fulfilled, (state, action) => {
        state.referralCount = action.payload;
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.earnings = action.payload;
      });
  },
});

export default affiliateSlice.reducer;
