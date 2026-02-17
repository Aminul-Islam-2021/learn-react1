import React from 'react';
import CategoryDropdown from './CategoryDropdown';
import PriceRangeFilter from './PriceRangeFilter';
import RatingFilter from './RatingFilter';

const FiltersSidebar = ({
  categories,
  filters,
  categoryRanges,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onClearFilters,
  showClearButton = false
}) => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-4 sticky top-20">
      <h2 className="font-semibold text-gray-700">Filters</h2>

      <CategoryDropdown
        categories={categories}
        selectedCategory={filters.category}
        onCategoryChange={onCategoryChange}
      />

      <PriceRangeFilter
        currentMin={filters.minPrice}
        currentMax={filters.maxPrice}
        onPriceChange={onPriceChange}
        range={categoryRanges.price}
      />

      <RatingFilter
        minRating={filters.minRating}
        onRatingChange={onRatingChange}
        maxAvailableRating={Math.max(...categoryRanges.ratings)}
      />

      {showClearButton && (
        <button
          onClick={onClearFilters}
          className="w-full mt-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FiltersSidebar;