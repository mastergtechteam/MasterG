import { useEffect, useState } from 'react';
import { BASE_URL } from '../api/apiClient';

export const useHomeData = () => {
  const [banners, setBanners] = useState([]);
  const [deals, setDeals] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [dealsRes, categoriesRes] = await Promise.all([
        fetch(`${BASE_URL}/deals`),
        fetch(`${BASE_URL}/categories`),
      ]);

      if (!dealsRes.ok || !categoriesRes.ok) {
        throw new Error('Network response failed');
      }

      const dealsJson = await dealsRes.json();
      const categoriesJson = await categoriesRes.json();

      const bannerData = dealsJson
        .filter(item => item.isBanner)
        .map(item => ({
          id: item.dealId,
          heading: item.heading,
          subtitle: item.subheading,
          image: { uri: item.photo },
        }));

      setBanners(bannerData);
      setDeals(dealsJson);

      if (categoriesJson?.success && Array.isArray(categoriesJson.data)) {
        const formattedCategories = categoriesJson.data
          .filter(item => item.status === 'ACTIVE' && !item.isDeleted)
          .map(item => ({
            id: item.categoryId,
            title: item.name,
            image: { uri: item.image },
          }));

        setCategories(formattedCategories);
      }
    } catch (err) {
      console.log('Home API Error:', err.message);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    banners,
    deals,
    categories,
    loading,
    error,
    refetch: fetchHomeData,
  };
};
