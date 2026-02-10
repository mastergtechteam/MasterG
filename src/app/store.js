import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import commonReducer from '../features/common/commonSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    common: commonReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
