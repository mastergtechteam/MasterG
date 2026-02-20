export const BASE_URL = 'https://uqlzs7e7wj.execute-api.ap-south-1.amazonaws.com';
const TAG = '[API]';

export const apiGet = async (endpoint, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query
    ? `${BASE_URL}${endpoint}?${query}`
    : `${BASE_URL}${endpoint}`;

  console.log(TAG, `▶ GET ${url}`);
  const start = Date.now();

  try {
    const response = await fetch(url);
    console.log(TAG, `GET ${endpoint} — ${Date.now() - start}ms | status: ${response.status}`);

    if (!response.ok) {
      console.warn(TAG, `❌ GET ${endpoint} failed — status: ${response.status}`);
      throw new Error('API request failed');
    }

    const data = await response.json();
    console.log(TAG, `✅ GET ${endpoint} — response:`, JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error(TAG, `❌ GET ${endpoint} — error: ${error.message}`);
    throw error;
  }
};
