import { BASE_URL } from '../../../api/apiClient';
import { getAuthData } from '../../../utils/secureStore';

export const fetchRetailerProfileApi = async () => {
  const secureData = await getAuthData();

  if (!secureData?.retailerId || !secureData?.token) {
    throw new Error('Authentication data missing');
  }

  const response = await fetch(
    `${BASE_URL}/retailers/${secureData.retailerId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureData.token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  const data = await response.json();

  return data?.data || data;
};
