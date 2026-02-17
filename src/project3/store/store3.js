import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import filtersReducer from "./features/filters/filterSlice";
import themeReducer from "./features/theme/themeSlice";

export const store3 = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Log initial state
// console.log("📊 Store3 initialized:", store3.getState());

// Subscribe to store3 changes for debugging
// store3.subscribe(() => {
//   console.log("📊 Store3 updated:", store3.getState());
// });
