import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Replace with your actual base URL
const BASE_URL = "http://localhost:5007";

// Signup action
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
      console.log("response: ", response);
      // Save token to localStorage
      localStorage.setItem("jwt", response.data.jwt);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Signin action
export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, {
        email,
        password,
      });
      console.log("response: ", response);
      // Save token to localStorage
      localStorage.setItem("jwt", response.data.jwt);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get User Profile with JWT
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get(`${BASE_URL}/users/profile`, {
        headers: {
          Authorization: `${jwt}`,
        },
      });
      console.log("response: ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout action
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("jwt");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    jwt: localStorage.getItem("jwt") || null,
    loading: false,
    error: null,
  },
  //   Jab simple task hote ha tou ya reducer kam karte ha
  reducers: {},
  //   Jab asyncronus tasks ho tou extraReducers kam karte ha
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signin
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
      });
  },
});

export default authSlice.reducer;
