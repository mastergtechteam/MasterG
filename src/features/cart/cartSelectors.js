// export const selectCartItems = state => state.cart.items;

// export const selectCartItemById = id => state => state.cart.items[id];

// export const selectCartTotal = state =>
//   Object.values(state.cart.items).reduce(
//     (sum, item) => sum + item.product.price * item.quantity,
//     0,
//   );
import { createSelector } from '@reduxjs/toolkit';

/**
 * Base selector
 */
const selectCartState = state => state.cart;

/**
 * Items as object (id -> { product, quantity })
 */
export const selectCartItems = createSelector(
  [selectCartState],
  cart => cart.items,
);

/**
 * Items as array (SAFE for map)
 */
export const selectCartItemsArray = createSelector([selectCartItems], items =>
  Object.values(items),
);

/**
 * Total price (memoized)
 */
export const selectCartTotal = createSelector([selectCartItems], items =>
  Object.values(items || {}).reduce((sum, item) => {
    const price = Number(item?.product?.discountedPrice) || 0;
    const quantity = Number(item?.quantity) || 0;

    return sum + price * quantity;
  }, 0),
);

/**
 * Factory selector for ProductCard
 */
// export const selectCartItemById = id =>
//   createSelector([selectCartItems], items => items[id]);
const cartItemSelectors = {};

export const selectCartItemById = id => {
  if (!cartItemSelectors[id]) {
    cartItemSelectors[id] = createSelector(
      [selectCartItems],
      items => items[id],
    );
  }
  return cartItemSelectors[id];
};
