import axios from "axios";

const BASE_API = "https://dummyjson.com";

// Fetch products from API
export const fetchProductsFromAPI = async (params = {}) => {
  try {
    let url = `${BASE_API}/products`;
    const queryParams = new URLSearchParams();

    // Handle category
    if (params.category && params.category !== "all") {
      url = `${BASE_API}/products/category/${params.category}`;
    }

    // Handle search
    if (params.search) {
      url = `${BASE_API}/products/search`;
      queryParams.append("q", params.search);
    }

    // Pagination
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.skip) queryParams.append("skip", params.skip);

    const finalUrl = queryParams.toString()
      ? `${url}?${queryParams.toString()}`
      : url;

    const response = await axios.get(finalUrl);

    return {
      products: response.data.products || [],
      total: response.data.total || 0,
    };
  } catch (error) {
    throw error;
  }
};

// Fetch categories
export const fetchCategoriesFromAPI = async () => {
  try {
    const response = await axios.get(`${BASE_API}/products/categories`);
    return response.data;
  } catch (error) {
    return [];
  }
};

// Fetch search suggestions
export const fetchSuggestionsFromAPI = async (query) => {
  if (!query || query.length < 2) return [];

  try {
    const response = await axios.get(
      `${BASE_API}/products/search?q=${query}&limit=5&select=title,price,thumbnail`,
    );
    return response.data.products || [];
  } catch (error) {
    return [];
  }
};
