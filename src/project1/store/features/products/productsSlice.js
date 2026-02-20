import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsFromAPI, fetchCategoriesFromAPI } from './productsApi';
import { applyAllFilters, sortProducts } from './productsUtils';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const filters = state.filters;
      
      const params = {
        category: filters.category !== 'all' ? filters.category : undefined,
        search: filters.searchQuery || undefined,
        limit: 100,
        skip: 0
      };
      
      const data = await fetchProductsFromAPI(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    return await fetchCategoriesFromAPI();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    rawProducts: [],
    processedProducts: [],
    categories: [],
    loading: false,
    error: null,
    totalProducts: 0
  },
  reducers: {
    processProducts: (state, action) => {
      if (!state.rawProducts || state.rawProducts.length === 0) return;
      
      const filters = action.payload;
      let result = applyAllFilters(state.rawProducts, filters);
      
      if (filters.sortBy && filters.sortBy !== 'default') {
        result = sortProducts(result, filters.sortBy);
      }
      
      state.processedProducts = result;
      state.totalProducts = result.length;
    }
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload || [];
      });
  }
});

export const { processProducts } = productsSlice.actions;
export default productsSlice.reducer;