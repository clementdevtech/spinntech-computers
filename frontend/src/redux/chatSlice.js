import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Chat Messages
export const fetchMessages = createAsyncThunk("chat/fetchMessages", async () => {
  const response = await axios.get("/api/chat");
  return response.data;
});

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      });
  },
});

export default chatSlice.reducer;
