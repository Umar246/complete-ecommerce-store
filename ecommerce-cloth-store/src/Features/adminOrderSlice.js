import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/ApiConfig";
import { toast } from "react-toastify";

// 🔥 Get all orders
export const getOrders = createAsyncThunk(
  "adminOrders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/orders/");
      console.log("response.data (getOrders):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🔥 Update Order Status
// const updateOrderStatus = async (orderId, status) => {
//   const response = await api.put(`/orders/${orderId}`, { status });
//   return response.data;
// };

// 🔥 Confirm Order
export const confirmedOrder = createAsyncThunk(
  "adminOrders/confirmedOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/orders/${orderId}/confirm`);
      console.log("response.data (confirm order):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🔥 Place Order
// export const placedOrder = createAsyncThunk(
//   "adminOrders/placedOrder",
//   async (orderId, { rejectWithValue }) => {
//     try {
//       const response = await api.put(`/admin/orders/${orderId}/placed`);
//       console.log("response.data (placed order):", response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// 🔥 Deliver Order
export const deliveredOrder = createAsyncThunk(
  "adminOrders/deliveredOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/orders/${orderId}/deliver`);
      console.log("response.data (deliver order):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🔥 Ship Order
export const shippedOrder = createAsyncThunk(
  "adminOrders/shippedOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/orders/${orderId}/ship`);
      console.log("response.data (ship order):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🔥 Cancel Order
export const canceledOrder = createAsyncThunk(
  "adminOrders/canceledOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/orders/${orderId}/cancel`);
      console.log("response.data (cancel order):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🔥 Delete Order
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/orders/${orderId}/delete`);
      toast.success("Order deleted successfully");
      console.log("response.data (delete order)", response.data);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔄 Get Orders
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Confirm Order
      .addCase(confirmedOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })

      // ✅ Place Order
    //   .addCase(placedOrder.fulfilled, (state, action) => {
    //     state.orders = state.orders.map((order) =>
    //       order._id === action.payload._id ? action.payload : order
    //     );
    //   })

      // ✅ Deliver Order
      .addCase(deliveredOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })

      // ✅ Ship Order
      .addCase(shippedOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })

      // ✅ Cancel Order
      .addCase(canceledOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })

      // ❌ Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      });
  },
});

export default adminOrderSlice.reducer;
