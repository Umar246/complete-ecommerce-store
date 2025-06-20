import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Replace with your actual base URL
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5007";

// Signup action
export const getAllUsers = createAsyncThunk(
  "admin/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/`);
      console.log("response: ", response);
      // Save token to localStorage
      //   localStorage.setItem("jwt", response.data.jwt);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update user role (ADMIN or CUSTOMER)
export const updateUserRole = createAsyncThunk(
  "admin/users/updateRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/update-role`, {
        userId,
        role,
      });
      const newRole = response.data.user.role;
      toast.success(`Role shifted to ${newRole.toLowerCase()} successfully`);
      // Response format: { success: true, user: { ... } }
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  "admin/users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/users/${userId}`);
      toast.success("User deleted successfully");
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminUserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  //   Jab simple task hote ha tou ya reducer kam karte ha
  reducers: {},
  //   Jab asyncronus tasks ho tou extraReducers kam karte ha
  extraReducers: (builder) => {
    builder
      // GetAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        // state.jwt = action.payload.jwt;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.users = state.users.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        );
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminUserSlice.reducer;
