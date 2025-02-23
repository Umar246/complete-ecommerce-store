// paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/ApiConfig";

// Async thunk to handle createPayment API call
export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/payments/${orderId}`);
      console.log("response at paymentSlice: ", response);
    
      if (response.data.url) {
        window.location.href = response.data.url;
      }
      return response.data; // Expecting { url, paymentId } from the backend
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to handle updatePayment API call
export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  async (paymentData, { rejectWithValue }) => {
    console.log('paymentData', paymentData)
    try {
      const response = await api.post("/payments", paymentData);
      console.log("response at update payment slice ", response);
      return response.data; // Expecting { message, success } from the backend
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentUrl: null,
    paymentId: null,
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.paymentUrl = null;
      state.paymentId = null;
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createPayment
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentUrl = action.payload.url;
        state.paymentId = action.payload.paymentId;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error creating payment link";
      })
      // Handle updatePayment
      .addCase(updatePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error updating payment info";
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
