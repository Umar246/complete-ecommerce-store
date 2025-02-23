import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/ApiConfig";

// Async action to get all products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (reqData, { rejectWithValue }) => {
    console.log("Product Slice: reqData: ", reqData);

    const {
      colors,
      sizes,
      minPrice, // Default to 0 if not provided
      maxPrice, // Default to Infinity if not provided
      minDiscount, // Default to 0 if not provided
      category, // Default to empty string if not provided
      stock,
      sort, // Default to price_low if not provided
      pageNumber, // Default to 1st page if not provided
      pageSize, // Default to 10 items per page if not provided
    } = reqData;

    try {
      console.log("Requesting products with data: ", reqData);

      // Construct the query string only for non-null values
      let queryString = `/products?minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

      if (colors) queryString += `&color=${colors}`;
      if (sizes) queryString += `&size=${sizes}`;
      if (category) queryString += `&category=${category}`;
      if (stock) queryString += `&stock=${stock}`;

      const response = await api.get(queryString);

      console.log("Products received: ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to find a product by ID
export const findProductById = createAsyncThunk(
  "products/findProductById",
  async (productID, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/id/${productID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    singleProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getAllProducts
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle findProductById
      .addCase(findProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(findProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
