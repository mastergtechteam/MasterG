/**
 * Application Constants
 */

export const CONSTANTS = {
  // API Endpoints
  PRODUCTS_API: 'https://2a0t2oahs8.execute-api.ap-south-1.amazonaws.com/products',
  SEARCH_API: 'https://2a0t2oahs8.execute-api.ap-south-1.amazonaws.com/search',

  // Gemini AI
  GEMINI_MODEL: 'gemini-2.5-flash',
  GEMINI_API_KEY: 'AIzaSyBqArflosSn5SGD9Nc1fiMBNdWKZzx-d9U',

  // Debouncing
  DEBOUNCE_DELAY: 500, // ms

  // Voice
  VOICE_LANGUAGE: 'en-IN',

  // TTS
  TTS_LANGUAGE: 'hi-IN',
  TTS_RATE: 0.6,
  TTS_MESSAGE_FOUND: 'Mil gya',
  TTS_MESSAGE_NOT_FOUND: 'Nahi mila',
  TTS_MESSAGE_DUPLICATE: 'pehle se list mein hai',
  TTS_MESSAGE_ALL_DUPLICATE: 'Sab pehle se list mein hain',

  // Cache
  CACHE_KEY: 'cached_products',
  CACHE_TIMEOUT: 3600000, // 1 hour in ms

  // UI
  GRID_COLUMNS: 2,
  PRODUCT_IMAGE_HEIGHT: 100,
  PRODUCT_CARD_WIDTH_RATIO: 0.48,
};

export const HINDI_TO_ENGLISH_MAP: { [key: string]: string } = {
  // ── Devanagari script (what hi-IN voice recognition returns) ──
  'चिप्स': 'chips',
  'बिस्कुट': 'biscuit',
  'बिस्किट': 'biscuit',   // variant spelling
  'बिस्किट्स': 'biscuit', // plural variant
  'बिस्कुट्स': 'biscuit', // plural variant
  'नमकीन': 'namkeen',
  'आलू': 'potato',
  'टमाटर': 'tomato',
  'प्याज': 'onion',
  'प्याज़': 'onion',
  'अदरक': 'ginger',
  'लहसुन': 'garlic',
  'दूध': 'milk',
  'दही': 'curd',
  'पनीर': 'paneer',
  'तेल': 'oil',
  'नमक': 'salt',
  'चाय': 'tea',
  'चावल': 'rice',
  'दाल': 'dal',
  'आटा': 'flour',
  'मैदा': 'maida',
  'गाजर': 'carrot',
  'गोभी': 'cauliflower',
  'पत्ता गोभी': 'cabbage',
  'खीरा': 'cucumber',
  'सेब': 'apple',
  'संतरा': 'orange',
  'आम': 'mango',
  'केला': 'banana',
  'अंगूर': 'grapes',
  'तरबूज': 'watermelon',
  'पपीता': 'papaya',
  'अनार': 'pomegranate',
  'मटर': 'peas',
  'भिंडी': 'okra',
  'बैंगन': 'brinjal',
  'पालक': 'spinach',
  'धनिया': 'coriander',
  'पुदीना': 'mint',
  'हल्दी': 'turmeric',
  'मिर्च': 'chilli',
  'जीरा': 'cumin',
  'चीनी': 'sugar',
  'शहद': 'honey',
  'मक्खन': 'butter',
  'घी': 'ghee',
  'अंडा': 'egg',
  'अंडे': 'eggs',
  'मछली': 'fish',
  'चिकन': 'chicken',
  'मुर्गी': 'chicken',
  'साबुन': 'soap',
  'शैम्पू': 'shampoo',
  'टूथपेस्ट': 'toothpaste',
  'कॉफी': 'coffee',
  'जूस': 'juice',
  'पानी': 'water',
  'केक': 'cake',
  'ब्रेड': 'bread',
  'चॉकलेट': 'chocolate',
  'टॉफी': 'toffee',
  'कुकीज': 'cookies',
  'कुकीज़': 'cookies',
  'मैगी': 'maggi',
  'नूडल्स': 'noodles',
  'पास्ता': 'pasta',
  'सॉस': 'sauce',
  'केचप': 'ketchup',
  'सिरका': 'vinegar',
  'मसाला': 'masala',
  'गरम मसाला': 'garam masala',
  'राजमा': 'rajma',
  'छोले': 'chhole',
  'सेवई': 'vermicelli',
  'पोहा': 'poha',
  'सूजी': 'semolina',
  'बेसन': 'besan',
  'मूंगफली': 'peanut',
  'काजू': 'cashew',
  'बादाम': 'almond',
  'किशमिश': 'raisin',
  'सरसों': 'mustard',
  'धुला': 'washed',

  // ── Romanized Hindi (legacy, kept for backward compat) ──
  'tamatar': 'tomato',
  'pyaaz': 'onion',
  'adrak': 'ginger',
  'lehsun': 'garlic',
  'dudh': 'milk',
  'dahi': 'curd',
  'paneer': 'paneer',
  'tel': 'oil',
  'namak': 'salt',
  'chai': 'tea',
  'chawal': 'rice',
  'daal': 'dal',
  'atta': 'flour',
  'aloo': 'potato',
  'gajar': 'carrot',
  'gobhi': 'cabbage',
  'pata': 'spinach',
  'kheera': 'cucumber',
  'bandh gobhi': 'cabbage',
  'malta': 'orange',
  'mosambi': 'sweet lime',
  'aam': 'mango',
  'kela': 'banana',
  'phal': 'fruit',
  'sabzi': 'vegetable',
  'sabziyan': 'vegetables',
  'barfi': 'burfi',
  'laddu': 'laddu',
  'namkeen': 'snacks',
  'chips': 'chips',
  'chocolate': 'chocolate',
  'toffee': 'toffee',
  'shakahari': 'vegetarian',
};

export const STOP_WORDS = [
  'kyaa', 'aapke', 'paas', 'hai', 'hain', 'mujhe', 'chey', 'chai', 'mila',
  'nahi', 'na', 'mi', 'much', 'product', 'products', 'please', 'want',
  'need', 'i', 'ko', 'se', 'par', 'mein', 'kya', 'do', 'aap', 'ka', 'ke',
  'dedo', 'chahiye', 'packet', 'dena', 'ek', 'teen', 'char', 'de', 'do',
  'the', 'is', 'are', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at',
  'to', 'for', 'from', 'with',
];
