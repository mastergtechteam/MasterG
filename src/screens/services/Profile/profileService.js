import { BASE_URL } from '../../../api/apiClient';

export const fetchRetailerProfileApi = async uuid => {
  const response = await fetch(`${BASE_URL}/retailers/${uuid}`);

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  const data = await response.json();
  return data?.data;
};

export const createRetailerApi = async body => {
  const response = await fetch(`${BASE_URL}/retailers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to create retailer');
  }

  const data = await response.json();
  return data?.data;
};
