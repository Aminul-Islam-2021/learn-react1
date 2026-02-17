// features/products/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsFromAPI, fetchCategoriesFromAPI } from "./productsApi";
import { applyAllFilters, sortProducts } from "./productsUtils"; // ✅ Only what we need

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Get current filters from state
      const state = getState();
      const filters = state.filters;

      // Prepare API params
      const params = {
        category: filters.category !== "all" ? filters.category : undefined,
        search: filters.searchQuery || undefined,
        limit: 100, // Fetch more for client-side filtering
        skip: 0,
      };

      const data = await fetchProductsFromAPI(params);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const data = await fetchCategoriesFromAPI();

    return data;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    rawProducts: [],
    processedProducts: [],
    categories: [],
    loading: false,
    error: null,
    totalProducts: 0,
  },
  reducers: {
    // Process products with current filters
    processProducts: (state, action) => {
      const filters = action.payload;

      if (!state.rawProducts || state.rawProducts.length === 0) {
        state.processedProducts = [];
        state.totalProducts = 0;
        return;
      }

      // Apply all filters using the utility
      let result = applyAllFilters(state.rawProducts, filters);

      // Apply sorting if needed
      if (filters.sortBy && filters.sortBy !== "default") {
        result = sortProducts(result, filters.sortBy);
      }

      state.processedProducts = result;
      state.totalProducts = result.length;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.rawProducts = action.payload.products || [];
        state.processedProducts = action.payload.products || [];
        state.totalProducts = action.payload.total || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload || [];
      });
  },
});

export const { processProducts } = productsSlice.actions;
export default productsSlice.reducer;
