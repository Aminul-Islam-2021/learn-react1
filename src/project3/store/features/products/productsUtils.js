// features/products/productsUtils.js

/**
 * Filter products by price range
 */
export const filterByPrice = (products, minPrice, maxPrice) => {
  return products.filter((product) => {
    if (
      minPrice !== null &&
      minPrice !== "" &&
      product.price < Number(minPrice)
    ) {
      return false;
    }
    if (
      maxPrice !== null &&
      maxPrice !== "" &&
      product.price > Number(maxPrice)
    ) {
      return false;
    }
    return true;
  });
};

/**
 * Filter products by minimum rating
 */
export const filterByRating = (products, minRating) => {
  if (!minRating || minRating === 0) return products;

  return products.filter((product) => product.rating >= minRating);
};

/**
 * Filter products by category
 */
export const filterByCategory = (products, category) => {
  if (!category || category === "all") return products;

  return products.filter((product) => product.category === category);
};

/**
 * Filter products by search query
 */
export const filterBySearch = (products, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === "") return products;

  const query = searchQuery.toLowerCase().trim();
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query),
  );
};

/**
 * Apply all filters to products
 */
export const applyAllFilters = (products, filters) => {
  let result = [...products];

  // Apply category filter
  result = filterByCategory(result, filters.category);

  // Apply search filter
  result = filterBySearch(result, filters.searchQuery);

  // Apply price filter
  result = filterByPrice(result, filters.minPrice, filters.maxPrice);

  // Apply rating filter
  result = filterByRating(result, filters.minRating);

  return result;
};

/**
 * Sort products
 */
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);

    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    default:
      return sorted;
  }
};

/**
 * Get unique categories from products (for when you need to extract from products)
 */
export const getUniqueCategories = (products) => {
  const categories = products.map((p) => p.category);
  return [...new Set(categories)];
};

/**
 * Get price range from products
 */
export const getPriceRange = (products) => {
  if (!products || products.length === 0) {
    return { min: 0, max: 1000 };
  }

  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

/**
 * Get rating range from products
 */
export const getRatingRange = (products) => {
  if (!products || products.length === 0) {
    return { min: 0, max: 5 };
  }

  const ratings = products.map((p) => p.rating);
  return {
    min: Math.min(...ratings),
    max: Math.max(...ratings),
  };
};

/**
 * Paginate products
 */
export const paginateProducts = (products, page, limit) => {
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    items: products.slice(start, end),
    totalPages: Math.ceil(products.length / limit),
    currentPage: page,
    totalItems: products.length,
  };
};
