import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import commonReducer from '../features/common/commonSlice';
import retailerReducer from '../features/profile/retailerSlice';
import sentryMiddleware from './sentryMiddleware';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    common: commonReducer,
    retailer: retailerReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sentryMiddleware),
});
