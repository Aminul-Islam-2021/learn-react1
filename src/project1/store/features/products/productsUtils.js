export const filterByPrice = (products, minPrice, maxPrice) => {
  return products.filter(product => {
    if (minPrice !== null && minPrice !== '' && product.price < Number(minPrice)) {
      return false;
    }
    if (maxPrice !== null && maxPrice !== '' && product.price > Number(maxPrice)) {
      return false;
    }
    return true;
  });
};

export const filterByRating = (products, minRating) => {
  if (!minRating || minRating === 0) return products;
  return products.filter(product => product.rating >= minRating);
};

export const filterByCategory = (products, category) => {
  if (!category || category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const filterBySearch = (products, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') return products;
  
  const query = searchQuery.toLowerCase().trim();
  return products.filter(product => 
    product.title.toLowerCase().includes(query) || 
    product.description?.toLowerCase().includes(query) ||
    product.brand?.toLowerCase().includes(query)
  );
};

export const applyAllFilters = (products, filters) => {
  let result = [...products];
  result = filterByCategory(result, filters.category);
  result = filterBySearch(result, filters.searchQuery);
  result = filterByPrice(result, filters.minPrice, filters.maxPrice);
  result = filterByRating(result, filters.minRating);
  return result;
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};

export const getPriceRange = (products) => {
  if (!products || products.length === 0) {
    return { min: 0, max: 1000 };
  }
  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};