import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/chat"; // Adjust according to your backend

// Fetch unanswered queries (admin side)
export const fetchUnansweredQueries = createAsyncThunk(
    "chat/fetchUnanswered",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/unansweredQueries`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Fetch all messages (user side)
export const fetchAllMessages = createAsyncThunk(
    "chat/fetchAllMessages",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/allMessages`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Send user message
export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async (message, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/sendMessage`, { message });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Admin replies to user
export const adminReply = createAsyncThunk(
    "chat/adminReply",
    async ({ query_id, reply }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/adminReply`, { query_id, reply });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        unansweredQueries: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUnansweredQueries.fulfilled, (state, action) => {
                state.unansweredQueries = action.payload;
            })
            .addCase(fetchAllMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push({ user_message: action.meta.arg, bot_response: action.payload.response });
            })
            .addCase(adminReply.fulfilled, (state, action) => {
                state.unansweredQueries = state.unansweredQueries.filter(q => q.id !== action.meta.arg.query_id);
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => { state.loading = true; }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export default chatSlice.reducer;
