import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import logger from '../../utils/logger';
import { CONSTANTS } from '../../utils/constants';

const TAG = 'PRODUCT_SERVICE';

export interface ProductQuantity {
  unit: string;
  value: number;
}

export interface ProductCategory {
  categoryId: string;
  name: string;
}

export interface ProductPricing {
  mrp: number | string;
  sellingPrice: number | string;
  discountPercentage: number;
}

export interface Product {
  productId: string;
  name: string;
  description: string;
  image: string;
  category: ProductCategory;
  subCategory: string | null;
  pricing: ProductPricing;
  quantity: ProductQuantity;
  status: string;
}

export interface ProductsResponse {
  success: boolean;
  pagination: {
    pageSize: number;
    nextPageKey: null | string;
  };
  data: Product[];
}

class ProductService {
  private products: Product[] = [];

  /**
   * Fetch all products from API and cache them in AsyncStorage
   */
  async fetchProductsViaAPI(): Promise<Product[]> {
    try {
      const response = await axios.get<ProductsResponse>(CONSTANTS.PRODUCTS_API, {
        timeout: 10000,
      });

      if (response.data.success && response.data.data) {
        const products = response.data.data;
        logger.success(TAG, `Fetched ${products.length} products from API`);
        await this.cacheProducts(products);
        this.products = products;
        return products;
      }
      logger.warn(TAG, 'API response unsuccessful');
      return [];
    } catch (error) {
      logger.error(TAG, 'API fetch failed, trying cache', error);
      return await this.getProductsFromCache();
    }
  }

  private async cacheProducts(products: Product[]): Promise<void> {
    try {
      await AsyncStorage.setItem(CONSTANTS.CACHE_KEY, JSON.stringify(products));
      logger.debug(TAG, `Cached ${products.length} products`);
    } catch (error) {
      logger.error(TAG, 'Cache write failed', error);
    }
  }

  /**
   * Retrieve products from AsyncStorage cache
   */
  async getProductsFromCache(): Promise<Product[]> {
    try {
      const cached = await AsyncStorage.getItem(CONSTANTS.CACHE_KEY);
      if (cached) {
        const products: Product[] = JSON.parse(cached);
        logger.success(TAG, `Loaded ${products.length} products from cache`);
        this.products = products;
        return products;
      }
      logger.warn(TAG, 'No cached products found');
      return [];
    } catch (error) {
      logger.error(TAG, 'Cache read failed', error);
      return [];
    }
  }

  /**
   * Search for products by name or description
   */
  searchProduct(query: string): Product | null {
    if (!query.trim()) {
      return null;
    }

    const searchTerm = query.toLowerCase();
    
    if (this.products.length === 0) {
      logger.warn(TAG, 'No products in memory');
      return null;
    }

    let found = this.products.find(p =>
      p.name.toLowerCase().includes(searchTerm) && p.status === 'ACTIVE'
    );

    if (found) {
      logger.debug(TAG, `Found: ${found.name}`);
      return found;
    }

    found = this.products.find(p =>
      p.category.name.toLowerCase().includes(searchTerm) && p.status === 'ACTIVE'
    );

    if (found) {
      logger.debug(TAG, `Found by category: ${found.name}`);
      return found;
    }

    found = this.products.find(p =>
      p.description.toLowerCase().includes(searchTerm) && p.status === 'ACTIVE'
    );

    if (found) {
      logger.debug(TAG, `Found by description: ${found.name}`);
      return found;
    }

    logger.debug(TAG, `No match for "${query}"`);
    return null;
  }

  /**
   * Search for products and return multiple matches
   */
  searchProducts(query: string): Product[] {
    if (!query.trim()) {
      return [];
    }

    const searchTerm = query.toLowerCase();
    return this.products.filter(p =>
      (p.name.toLowerCase().includes(searchTerm) ||
        p.category.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)) &&
      p.status === 'ACTIVE'
    );
  }

  /**
   * Get all products
   */
  getAllProducts(): Product[] {
    return this.products;
  }

  /**
   * Get products by category
   */
  getProductsByCategory(categoryName: string): Product[] {
    return this.products.filter(
      p => p.category.name.toLowerCase() === categoryName.toLowerCase() && p.status === 'ACTIVE'
    );
  }

  /**
   * Get product by ID
   */
  getProductById(productId: string): Product | undefined {
    return this.products.find(p => p.productId === productId);
  }

  /**
   * Get active products only
   */
  getActiveProducts(): Product[] {
    return this.products.filter(p => p.status === 'ACTIVE');
  }

  /**
   * Clear cache
   */
  async clearCache(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CONSTANTS.CACHE_KEY);
      this.products = [];
      logger.debug(TAG, 'Cache cleared');
    } catch (error) {
      logger.error(TAG, 'Cache clear failed', error);
    }
  }

  /**
   * Initialize products (load from cache or fetch from API)
   */
  async initialize(): Promise<void> {
    try {
      logger.info(TAG, 'Initializing products...');
      
      const cached = await this.getProductsFromCache();
      if (cached.length > 0) {
        logger.success(TAG, 'Initialization complete - from cache');
        return;
      }

      logger.info(TAG, 'No cache, fetching from API...');
      const apiProducts = await this.fetchProductsViaAPI();
      
      if (apiProducts.length > 0) {
        logger.success(TAG, 'Initialization complete - from API');
      } else {
        logger.warn(TAG, 'No products loaded');
      }
    } catch (error) {
      logger.error(TAG, 'Initialization failed', error);
    }
  }

  /**
   * Refresh products from API
   */
  async refreshProducts(): Promise<void> {
    await this.fetchProductsViaAPI();
  }
}

export default new ProductService();
