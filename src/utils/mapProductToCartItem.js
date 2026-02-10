export const mapProductToCartItem = product => ({
  id: product.productId,
  name: product.name,
  description: product.description,
  image: product.image || product.images?.[0] || null,
  discountedPrice: Number(product.pricing?.sellingPrice ?? 0),
  weight:
    typeof product.quantity === 'object'
      ? `${product.quantity.value}${product.quantity.unit ?? ''}`
      : `${product.quantity ?? ''}`,
});
