// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "../config/ApiConfig";

// export const fetchCategories = createAsyncThunk(
//   "categories/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await api.get("/products/categories");
//       console.log('data in category slice', data)
//       return data; // array of { _id, name, slug }
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const categoriesSlice = createSlice({
//   name: "categories",
//   initialState: { list: [], loading: false, error: null },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCategories.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.list = payload;
//       })
//       .addCase(fetchCategories.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload;
//       });
//   },
// });

// export default categoriesSlice.reducer;
