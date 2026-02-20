const BASE_URL = 'https://uqlzs7e7wj.execute-api.ap-south-1.amazonaws.com';

export const apiGet = async (endpoint, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query
    ? `${BASE_URL}${endpoint}?${query}`
    : `${BASE_URL}${endpoint}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
};
