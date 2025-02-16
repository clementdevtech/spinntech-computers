import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Notifications
export const fetchNotifications = createAsyncThunk("notifications/fetchNotifications", async () => {
  const response = await axios.get("/api/notifications");
  return response.data;
});

// Mark Notification as Read
export const markAsRead = createAsyncThunk("notifications/markAsRead", async (notificationId) => {
  await axios.put(`/api/notifications/${notificationId}/read`);
  return notificationId;
});

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
  },
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.read).length;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find((n) => n.id === action.payload);
        if (notification) notification.read = true;
        state.unreadCount = state.notifications.filter((n) => !n.read).length;
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
