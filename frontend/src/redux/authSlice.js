import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


const storedUser = JSON.parse(localStorage.getItem("user")) || null;

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const userPayload = { ...userData, password: String(userData.password) };
      const response = await axios.post(`${API_URL}/auth/register`, userPayload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        userData,
        { 
          withCredentials: true,
          headers: { "Content-Type": "application/json" } 
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Persist user
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      const action = error.response?.data?.action || null;
      return rejectWithValue({ message: errorMessage, action });
    }
  }
);

// Check if User is Authenticated
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Persist user
      return response.data.user;
    } catch (error) {
      localStorage.removeItem("user"); // Remove user if session expired
      return rejectWithValue("User not authenticated");
    }
  }
);

// Resend Verification Email
export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/resend-verification`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send verification email.");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem("user"); // Remove user from storage on logout
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Logout failed");
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;
      if (!token) throw new Error("Unauthorized");

      const response = await axios.put(`${API_URL}/update-profile`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = { ...storedUser, ...response.data };
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Persist updated user

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Profile update failed");
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Password reset failed");
    }
  }
);

// Authentication Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth Status Cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })

      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register Cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout Cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })

      // Update Profile Cases
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset Password Cases
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthError, clearSuccessMessage } = authSlice.actions;
export default authSlice.reducer;
