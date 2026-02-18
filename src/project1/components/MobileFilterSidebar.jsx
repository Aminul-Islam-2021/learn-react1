import React from "react";

function MobileFilterSidebar() {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setMobileFiltersOpen(false)}
      />
      <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Filters</h2>
          <button
            // onClick={() => setMobileFiltersOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {/* <Icons.Close /> */}
            Close
          </button>
        </div>

        {/* Filter Content - Scrollable */}

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Categories */}

          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Category</p>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="mobile-category"
                  checked={tempFilters.category === "all"}
                  onChange={() =>
                    setTempFilters((prev) => ({
                      ...prev,
                      category: "all",
                    }))
                  }
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-sm">All Categories</span>
              </label>
              {categories.map((cat) => (
                <label
                  key={cat.slug}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="mobile-category"
                    checked={tempFilters.category === cat.slug}
                    onChange={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        category: cat.slug,
                      }))
                    }
                    className="w-4 h-4 text-blue-500"
                  />
                  <span className="text-sm capitalize">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Price Range */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Price Range
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Min: ${categoryRanges.price.min}</span>
                <span>Max: ${categoryRanges.price.max}</span>
              </div>
              <input
                type="range"
                min={categoryRanges.price.min}
                max={categoryRanges.price.max}
                value={tempFilters.maxPrice || categoryRanges.price.max}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value),
                  }))
                }
                className="w-full accent-blue-500"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={tempFilters.minPrice || ""}
                  onChange={(e) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      minPrice: e.target.value ? Number(e.target.value) : null,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  min={categoryRanges.price.min}
                  max={categoryRanges.price.max}
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={tempFilters.maxPrice || ""}
                  onChange={(e) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      maxPrice: e.target.value ? Number(e.target.value) : null,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  min={categoryRanges.price.min}
                  max={categoryRanges.price.max}
                />
              </div>
            </div>
          </div>
          {/* Rating */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Rating</p>
            <div className="rating rating-md">
              {[1, 2, 3, 4, 5]
                .filter((r) => r <= Math.max(...categoryRanges.ratings))
                .map((rating) => (
                  <input
                    key={rating}
                    type="radio"
                    name="mobile-rating"
                    className="mask mask-star-2 bg-green-500"
                    checked={tempFilters.minRating === rating}
                    onChange={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        minRating: prev.minRating === rating ? 0 : rating,
                      }))
                    }
                  />
                ))}
            </div>
          </div>
        </div>
        {/* Apply Filters Button - Fixed at Bottom */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-3">
            <button
              onClick={() => {
                // Reset temp filters to current actual filters
                setTempFilters({
                  category: filters.category,
                  minPrice: filters.minPrice,
                  maxPrice: filters.maxPrice,
                  minRating: filters.minRating,
                });
              }}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => {
                // Apply all filters at once and close drawer
                if (tempFilters.category !== filters.category) {
                  dispatch(setCategory(tempFilters.category));
                }
                if (
                  tempFilters.minPrice !== filters.minPrice ||
                  tempFilters.maxPrice !== filters.maxPrice
                ) {
                  dispatch(
                    setPriceRange({
                      min: tempFilters.minPrice,
                      max: tempFilters.maxPrice,
                    }),
                  );
                }
                if (tempFilters.minRating !== filters.minRating) {
                  dispatch(setMinRating(tempFilters.minRating));
                }
                setMobileFiltersOpen(false);
              }}
              className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileFilterSidebar;
