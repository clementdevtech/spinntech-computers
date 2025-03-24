import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.products ?? []; // Ensure correct data extraction
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error; // Let Redux handle the error
  }
});

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data.length ? response.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
});

export const addProduct = createAsyncThunk("products/addProduct", async (productData, { dispatch }) => {
  try {
    await axios.post(`${API_BASE_URL}/products/createproduct`, productData);
    dispatch(fetchProducts()); // Refresh product list after adding
  } catch (error) {
    console.error("Error adding product:", error.message);
    throw error;
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
