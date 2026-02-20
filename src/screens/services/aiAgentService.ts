import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import productService, { Product } from './productService';
import logger from '../../utils/logger';
import { CONSTANTS } from '../../utils/constants';

const TAG = 'AI_AGENT';

export interface APIProduct {
  productId: string;
  name: string;
  description: string;
  images?: string[];
  image?: string;
  category: {
    name: string;
    categoryId: string;
  };
  categoryId?: string;
  subCategory?: string | null;
  pricing: {
    mrp: number | string;
    sellingPrice: number | string;
    discountPercentage?: number;
    currency?: string;
  };
  quantity?: {
    value: number;
    unit: string;
  } | string | number;
  status: string;
  [key: string]: any;
}

export interface SearchAPIResponse {
  success: boolean;
  type: string;
  count: number;
  data: APIProduct[];
}

export interface AIAgentResponse {
  productFound: boolean;
  products?: Product[];
  product?: Product;
}

class AIAgentService {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    try {
      this.genAI = new GoogleGenerativeAI(CONSTANTS.GEMINI_API_KEY);
      logger.success(TAG, 'Gemini AI initialized');
    } catch (error) {
      logger.warn(TAG, 'Could not initialize Gemini', error);
    }
  }

  /**
   * Extract product name from English speech
   */
  private async extractProductNameWithAI(userMessage: string): Promise<string> {
    try {
      if (!this.genAI) {
        return this.extractProductNameFallback(userMessage);
      }

      const model = this.genAI.getGenerativeModel({ model: CONSTANTS.GEMINI_MODEL });

      const prompt = `Extract the grocery/product name from this message and return it in English.
The message can be in English or Hinglish (Hindi words written in English letters). Translate any Hindi word to its English equivalent.

Message: "${userMessage}"

Rules:
- Return ONLY the product name in English
- One or two words maximum
- No explanation, no punctuation

Examples:
- "I want chips" -> chips
- "do you have lays" -> lays
- "give me a packet of biscuits" -> biscuit
- "show me bread" -> bread
- "doodh chahiye" -> milk
- "tamatar dedo" -> tomato
- "mujhe aloo chahiye" -> potato
- "ek packet namak" -> salt
- "chawal dikhao" -> rice
- "dahi hai kya" -> curd
- "tel kahan hai" -> oil
- "pyaaz do" -> onion
- "adrak chahiye" -> ginger

Output:`;

      const result = await model.generateContent(prompt);
      const extracted = result.response.text().trim().toLowerCase();
      logger.success(TAG, `Gemini extracted: "${extracted}"`);
      return extracted;
    } catch (error) {
      logger.warn(TAG, 'Gemini extraction failed, using fallback', error);
      return this.extractProductNameFallback(userMessage);
    }
  }

  /**
   * Fallback extraction: handles English and romanized Hindi, returns English product name
   */
  private extractProductNameFallback(userMessage: string): string {
    const msg = userMessage.trim().toLowerCase();

    // If Devanagari detected, can't search against English products
    if (/[\u0900-\u097F]/.test(msg)) {
      logger.warn(TAG, `Devanagari input without Gemini: "${userMessage}"`);
      return '';
    }

    // Romanized Hindi → English product name map (Gemini handles this normally, this is the offline fallback)
    const hinglishMap: { [key: string]: string } = {
      'doodh': 'milk', 'dudh': 'milk',
      'tamatar': 'tomato',
      'pyaaz': 'onion', 'pyaz': 'onion',
      'aloo': 'potato', 'alu': 'potato',
      'chawal': 'rice',
      'daal': 'dal', 'dal': 'dal',
      'atta': 'flour',
      'namak': 'salt',
      'tel': 'oil',
      'dahi': 'curd',
      'paneer': 'paneer',
      'chai': 'tea',
      'adrak': 'ginger',
      'lehsun': 'garlic', 'lasun': 'garlic',
      'gajar': 'carrot',
      'gobhi': 'cauliflower',
      'palak': 'spinach',
      'kheera': 'cucumber',
      'mirch': 'chilli', 'mirchi': 'chilli',
      'haldi': 'turmeric',
      'jeera': 'cumin',
      'cheeni': 'sugar', 'chini': 'sugar',
      'makkhan': 'butter',
      'ghee': 'ghee',
      'anda': 'egg', 'ande': 'eggs',
      'kela': 'banana',
      'aam': 'mango',
      'namkeen': 'namkeen',
      'biskut': 'biscuit', 'biscoot': 'biscuit',
      'chips': 'chips',
      'bread': 'bread',
      'maida': 'maida',
      'besan': 'besan',
      'poha': 'poha',
      'maggi': 'maggi',
      'coffee': 'coffee',
      'chocolate': 'chocolate',
    };

    // Check for hinglish words in message
    for (const [hindi, english] of Object.entries(hinglishMap)) {
      if (msg.includes(hindi)) {
        logger.info(TAG, `Hinglish fallback: "${hindi}" → "${english}"`);
        return english;
      }
    }

    // Strip common filler words, keep the product keyword(s)
    const fillerWords = [
      'i', 'want', 'need', 'give', 'me', 'show', 'get', 'a', 'an', 'the',
      'do', 'you', 'have', 'can', 'please', 'packet', 'of', 'some', 'any',
      'is', 'are', 'there', 'find', 'search', 'for', 'add', 'bring', 'buy',
      'mujhe', 'chahiye', 'dedo', 'dikhao', 'kya', 'hai', 'kahan', 'ek',
    ];

    const words = msg
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 1 && !fillerWords.includes(w));

    const keyword = words.join(' ').trim();
    logger.debug(TAG, `Fallback extracted: "${keyword}"`);
    return keyword || msg;
  }

  /**
   * Convert API product to local Product interface
   */
  private convertAPIProductToLocalProduct(apiProduct: APIProduct): Product {
    return {
      productId: apiProduct.productId,
      name: apiProduct.name,
      description: apiProduct.description || '',
      image: (apiProduct.images?.[0] || apiProduct.image || '') as string,
      category: apiProduct.category,
      subCategory: apiProduct.subCategory || null,
      pricing: {
        mrp: apiProduct.pricing.mrp,
        sellingPrice: apiProduct.pricing.sellingPrice,
        discountPercentage: apiProduct.pricing.discountPercentage || 0,
      },
      quantity: apiProduct.quantity as any,
      status: apiProduct.status,
    };
  }

  /**
   * Search via API first, then fallback to cache
   */
  async searchForProduct(userMessage: string): Promise<AIAgentResponse> {
    try {
      logger.info(TAG, `User said: "${userMessage}"`);
      
      // Extract product name using AI
      const searchQuery = await this.extractProductNameWithAI(userMessage);

      // If extraction failed (unmapped Devanagari with no Gemini), bail out early
      if (!searchQuery || !searchQuery.trim()) {
        logger.warn(TAG, `Could not extract English keyword from: "${userMessage}"`);
        return { productFound: false };
      }

      logger.debug(TAG, `Searching for: "${searchQuery}"`);

      // Try API search first
      logger.info(TAG, `Searching via API for: "${searchQuery}"`);
      try {
        const response = await axios.get<SearchAPIResponse>(
          `${CONSTANTS.SEARCH_API}?q=${encodeURIComponent(searchQuery)}`,
          { timeout: 5000 }
        );

        if (response.data.success && response.data.data?.length > 0) {
          logger.success(TAG, `API search found ${response.data.count} product(s)`);
          
          const products = response.data.data.map(apiProduct => 
            this.convertAPIProductToLocalProduct(apiProduct)
          );
          
          products.forEach((p, idx) => {
            logger.info(TAG, `[${idx + 1}] ${p.name} - ₹${p.pricing.sellingPrice}`);
          });

          return { productFound: true, products, product: products[0] };
        } else {
          logger.warn(TAG, 'API search returned no results, falling back to cache');
        }
      } catch (apiError) {
        logger.warn(TAG, 'API search failed, falling back to cache', apiError);
      }

      // Fallback to cache search
      logger.debug(TAG, 'Searching in local cache');
      const products = productService.searchProducts(searchQuery);

      if (products?.length > 0) {
        logger.success(TAG, `Cache search found ${products.length} product(s)`);
        products.forEach((p, idx) => {
          logger.info(TAG, `[${idx + 1}] ${p.name} - ₹${p.pricing.sellingPrice}`);
        });
        return { productFound: true, products, product: products[0] };
      } else {
        logger.error(TAG, 'Product not found in cache');
        return { productFound: false };
      }
    } catch (error) {
      logger.error(TAG, 'Error searching product', error);
      return { productFound: false };
    }
  }
}

export default new AIAgentService();
