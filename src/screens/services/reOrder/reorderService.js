import axios from 'axios';
import { BASE_URL } from '../../../api/apiClient';
import { getAppType } from '../../../config/appConfig';

const MAX_LIMIT_PER_ITEM = 10;

export const processReorder = async orderItems => {
  try {
    if (!orderItems?.length) {
      return { success: false, message: 'No items in order' };
    }

    // 1️⃣ Extract product IDs safely
    const productIds = orderItems.map(item => item.productId).filter(Boolean);

    if (!productIds.length) {
      return { success: false, message: 'Invalid product IDs' };
    }

    // 2️⃣ Call your REAL batch API
    const response = await axios.post(
      `${BASE_URL}/products/batch`,
      { productIds },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-App-Type': getAppType(),
        },
      },
    );

    // 3️⃣ Adjust based on actual API response
    const latestProducts = response.data?.data || response.data?.products || [];

    const cartItems = [];
    const unavailableItems = [];

    latestProducts.forEach(product => {
      if (!product) return;

      // IMPORTANT: match by productId correctly
      const orderedItem = orderItems.find(
        i => i.productId === product.productId || i.productId === product.id,
      );

      if (!orderedItem) return;

      const isOutOfStock = product.stock?.outOfStock === true;

      const availableStock = product.stock?.availableQuantity || 0;

      if (isOutOfStock || availableStock <= 0) {
        unavailableItems.push(product.name);
        return;
      }

      // 4️⃣ Respect:
      // - ordered quantity
      // - available stock
      // - max 10 rule
      const safeQuantity = Math.min(
        orderedItem.quantity,
        availableStock,
        MAX_LIMIT_PER_ITEM,
      );

      cartItems.push({
        product: {
          id: product.productId,
          name: product.name,
          description: product.description,
          image: product.images?.[0] || '',
          discountedPrice: product.pricing?.sellingPrice || 0,
          weight: `${product.quantity?.value || ''}${
            product.quantity?.unit || ''
          }`,
        },
        quantity: safeQuantity,
      });
    });

    return {
      success: true,
      cartItems,
      unavailableItems,
    };
  } catch (error) {
    console.log('Reorder Service Error:', error?.response || error);

    return {
      success: false,
      message: 'Failed to process reorder',
    };
  }
};
