import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/ApiConfig";

// Async action to create an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    console.log("orderData", orderData);
    try {
      const response = await api.post("/orders", orderData.address);
      const data = response.data;
      console.log("data ", data);
      if (data.createdOrder._id) {
        orderData.navigate({ search: `step=3&order_id=${data.createdOrder._id}` });
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to get an order by ID
export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      console.log('response', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to get order history
// export const getOrderHistory = createAsyncThunk(
//   "order/getOrderHistory",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/orders/history");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const orderSlice = createSlice({
  name: "order",
  initialState: {
    currentOrder: null,
    orderHistory: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getOrderById
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Handle getOrderHistory
    //   .addCase(getOrderHistory.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getOrderHistory.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.orderHistory = action.payload;
    //   })
    //   .addCase(getOrderHistory.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export default orderSlice.reducer;
