import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import filtersReducer from './features/filters/filterSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 100,
      },
      immutableCheck: {
        warnAfter: 100,
      },
    }),
});