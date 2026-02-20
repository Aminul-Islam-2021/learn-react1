import axios from 'axios';

const API_BASE = 'https://dummyjson.com';

export const fetchProductsFromAPI = async (params = {}) => {
  try {
    let url = `${API_BASE}/products`;
    const queryParams = new URLSearchParams();

    if (params.category && params.category !== 'all') {
      url = `${API_BASE}/products/category/${params.category}`;
    }
    
    if (params.search) {
      url = `${API_BASE}/products/search`;
      queryParams.append('q', params.search);
    }

    if (params.limit) queryParams.append('limit', params.limit);
    if (params.skip) queryParams.append('skip', params.skip);

    const finalUrl = queryParams.toString() 
      ? `${url}?${queryParams.toString()}` 
      : url;
    
    const response = await axios.get(finalUrl);
    
    return {
      products: response.data.products || [],
      total: response.data.total || 0
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchCategoriesFromAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Categories API Error:', error);
    return [];
  }
};

export const fetchSuggestionsFromAPI = async (query) => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await axios.get(
      `${API_BASE}/products/search?q=${query}&limit=5&select=title,price,thumbnail`
    );
    return response.data.products || [];
  } catch (error) {
    console.error('Suggestions API Error:', error);
    return [];
  }
};