import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const item = state.items[product.id];

      if (item) {
        item.quantity += 1;
      } else {
        state.items[product.id] = {
          product,
          quantity: 1,
        };
      }
    },

    incrementQuantity: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) return;

      if (state.items[id].quantity > 1) {
        state.items[id].quantity -= 1;
      } else {
        delete state.items[id];
      }
    },

    removeItem: (state, action) => {
      delete state.items[action.payload];
    },
    clearCart: state => {
      state.items = {};
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
