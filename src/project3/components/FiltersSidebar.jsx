import React from 'react';

const FiltersSidebar = ({
  categories,
  filters,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onSortChange,
  onClose
}) => {
  return (
    <div className="space-y-6">
      {/* Header with close button for mobile */}
      <div className="flex justify-between items-center lg:hidden">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <select
          value={filters.category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                   rounded-lg bg-white dark:bg-gray-700 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 transition-shadow"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug || cat} value={cat.slug || cat}>
              {cat.name || cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Min</label>
            <input
              type="number"
              placeholder="$0"
              value={filters.minPrice || ''}
              onChange={(e) => onPriceChange(e.target.value, filters.maxPrice)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg bg-white dark:bg-gray-700 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Max</label>
            <input
              type="number"
              placeholder="$1000"
              value={filters.maxPrice || ''}
              onChange={(e) => onPriceChange(filters.minPrice, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg bg-white dark:bg-gray-700 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium mb-3">Minimum Rating</h4>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(rating)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                filters.minRating === rating
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {rating === 0 ? 'Any' : `${rating}+ ⭐`}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="font-medium mb-3">Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                   rounded-lg bg-white dark:bg-gray-700 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 transition-shadow"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Top Rated</option>
          <option value="title-asc">Name: A to Z</option>
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          onCategoryChange('all');
          onPriceChange(null, null);
          onRatingChange(0);
          onSortChange('default');
        }}
        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 
                 hover:bg-gray-200 dark:hover:bg-gray-600 
                 rounded-lg transition-colors font-medium"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FiltersSidebar;