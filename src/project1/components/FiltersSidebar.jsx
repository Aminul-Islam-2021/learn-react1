import React from 'react';
import CategoryDropdown from './CategoryDropdown';
import PriceRangeFilter from './PriceRangeFilter';
import RatingFilter from './RatingFilter';

const FiltersSidebar = ({
  categories,
  filters,
  categoryRanges,
  categoryCounts,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onClearFilters,
  showClearButton = false
}) => {
  return (
    <div className="bg-white rounded-box p-4 shadow-sm space-y-4 sticky top-20">
      <h2 className="text-lg font-semibold">Filters</h2>

      <CategoryDropdown
        categories={categories}
        selectedCategory={filters.category}
        onCategoryChange={onCategoryChange}
        categoryCounts={categoryCounts}
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
          className="btn btn-outline btn-primary btn-sm w-full mt-2"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FiltersSidebar;