import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "all",
  searchQuery: "",
  minPrice: null,
  maxPrice: null,
  minRating: 0,
  sortBy: "default",
  page: 1,
  limit: 12,
  // UI state
  isSidebarOpen: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1;
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
      state.page = 1;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setCategory,
  setSearchQuery,
  setPriceRange,
  setMinRating,
  setSortBy,
  setPage,
  toggleSidebar,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
