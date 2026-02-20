import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
  processProducts,
} from "../store/features/products/productsSlice";
import {
  setCategory,
  setSearchQuery,
  setPriceRange,
  setMinRating,
  setSortBy,
  setPage,
  resetFilters,
} from "../store/features/filters/filterSlice";
import { fetchSuggestionsFromAPI } from "../store/features/products/productsApi";
import { Icons } from "../components/Icons";
import SearchBar from "../components/Searchbar";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductCard from "../components/ProductCard";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";
import LoadingSkeleton from "../components/LoadingSkeleton";
import useDebounce from "../hooks/useDebounce";
import CategoryDropdown from "../components/CategoryDropdown";
import PriceRangeFilter from "../components/PriceRangeFilter";
import RatingFilter from "../components/RatingFilter";

const ProductsPage1 = () => {
  const dispatch = useDispatch();
  const { processedProducts, rawProducts, loading, error, categories } =
    useSelector((state) => state.products);
  const filters = useSelector((state) => state.filters);

  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minRating: filters.minRating,
  });

  const debouncedSearch = useDebounce(searchInput, 500);

  // Calculate category-specific ranges
  const categoryRanges = useMemo(() => {
    if (!rawProducts.length)
      return {
        price: { min: 0, max: 1000 },
        ratings: [1, 2, 3, 4, 5],
      };

    const filtered =
      filters.category === "all"
        ? rawProducts
        : rawProducts.filter((p) => p.category === filters.category);

    const prices = filtered.map((p) => p.price);
    const ratings = [
      ...new Set(filtered.map((p) => Math.floor(p.rating))),
    ].sort((a, b) => a - b);

    return {
      price: {
        min: Math.min(...prices),
        max: Math.max(...prices),
      },
      ratings: ratings.length ? ratings : [1, 2, 3, 4, 5],
    };
  }, [rawProducts, filters.category]);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    if (!rawProducts.length) return {};
    const counts = {};
    rawProducts.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, [rawProducts]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    if (rawProducts.length > 0) {
      dispatch(processProducts(filters));
    }
  }, [filters, rawProducts, dispatch]);

  useEffect(() => {
    const getSuggestions = async () => {
      if (searchInput.length >= 2) {
        const results = await fetchSuggestionsFromAPI(searchInput);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };
    getSuggestions();
  }, [searchInput]);

  useEffect(() => {
    setTempFilters({
      category: filters.category,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
    });
  }, [filters, mobileFiltersOpen]);

  // Update tempFilters when filters change OR when mobile drawer opens
  // useEffect(() => {
  //   setTempFilters({
  //     category: filters.category,
  //     minPrice: filters.minPrice,
  //     maxPrice: filters.maxPrice,
  //     minRating: filters.minRating,
  //   });
  // }, [filters]); // Remove mobileFiltersOpen dependency - always sync with filters

  // Calculate category-specific ranges for mobile preview
  // Calculate mobile category ranges
  const mobileCategoryRanges = useMemo(() => {
    if (!rawProducts.length)
      return {
        price: { min: 0, max: 1000 },
        ratings: [1, 2, 3, 4, 5],
      };

    // Use tempFilters.category for mobile preview
    const filtered =
      tempFilters.category === "all"
        ? rawProducts
        : rawProducts.filter((p) => p.category === tempFilters.category);

    if (filtered.length === 0) {
      return {
        price: { min: 0, max: 1000 },
        ratings: [1, 2, 3, 4, 5],
      };
    }

    const prices = filtered.map((p) => p.price);
    const ratings = [
      ...new Set(filtered.map((p) => Math.floor(p.rating))),
    ].sort((a, b) => a - b);

    return {
      price: {
        min: Math.min(...prices),
        max: Math.max(...prices),
      },
      ratings: ratings.length ? ratings : [1, 2, 3, 4, 5],
    };
  }, [rawProducts, tempFilters.category]); // Dependency on tempFilters.category // Dependency on tempFilters.category

  const paginatedProducts = processedProducts.slice(
    (filters.page - 1) * filters.limit,
    filters.page * filters.limit,
  );

  const totalPages = Math.ceil(processedProducts.length / filters.limit);

  const handleSuggestionClick = (product) => {
    setSearchInput(product.title);
    dispatch(setSearchQuery(product.title));
  };

  // In your ProductsPage component
  // const handleSuggestionClick = (product) => {
  //   setSearchInput(product.title); // Update local state
  //   dispatch(setSearchQuery(product.title)); // Update Redux search query
  //   // Don't setShowSuggestions(false) here - it's already handled in the child component
  // };

  const handleClearFilters = () => {
    dispatch(resetFilters());
    setSearchInput("");
  };

 const handleApplyMobileFilters = () => {
  // Apply category
  if (tempFilters.category !== filters.category) {
    dispatch(setCategory(tempFilters.category));
  }
  
  // Apply price range - check if values are different
  if (tempFilters.minPrice !== filters.minPrice || tempFilters.maxPrice !== filters.maxPrice) {
    dispatch(setPriceRange({ 
      min: tempFilters.minPrice, 
      max: tempFilters.maxPrice 
    }));
  }
  
  // Apply rating
  if (tempFilters.minRating !== filters.minRating) {
    dispatch(setMinRating(tempFilters.minRating));
  }
  
  setMobileFiltersOpen(false);
};

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minRating > 0 ||
    filters.searchQuery;

  if (loading && rawProducts.length === 0) return <LoadingSkeleton />;
  if (error) return <div className="text-center py-12 text-error">{error}</div>;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl font-bold text-base-content">Products</h1>

            <div className="flex-1 max-w-md">
              <SearchBar
                value={searchInput}
                onChange={setSearchInput}
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
              />
            </div>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="btn btn-outline btn-square lg:hidden"
            >
              <Icons.Filter />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FiltersSidebar
              categories={categories}
              filters={filters}
              categoryRanges={categoryRanges}
              categoryCounts={categoryCounts}
              onCategoryChange={(cat) => dispatch(setCategory(cat))}
              onPriceChange={(range) => dispatch(setPriceRange(range))}
              onRatingChange={(rating) => dispatch(setMinRating(rating))}
              onClearFilters={handleClearFilters}
              showClearButton={hasActiveFilters}
            />
          </aside>

          {/* Mobile Filters Drawer */}
          {mobileFiltersOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:hidden flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-base-300">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="btn btn-ghost btn-sm btn-square"
                  >
                    <Icons.Close />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  <CategoryDropdown
                    categories={categories}
                    selectedCategory={tempFilters.category}
                    onCategoryChange={(cat) => {
                      setTempFilters((prev) => ({ ...prev, category: cat }));
                    }}
                    categoryCounts={categoryCounts}
                  />

                  {/* <PriceRangeFilter
                    currentMin={tempFilters.minPrice}
                    currentMax={tempFilters.maxPrice}
                    onPriceChange={(range) =>
                      setTempFilters((prev) => ({ ...prev, ...range }))
                    }
                    range={mobileCategoryRanges.price} // Use mobile-specific ranges
                  /> */}

                  <PriceRangeFilter
                    key={`mobile-price-${tempFilters.category}-${mobileCategoryRanges.price.min}-${mobileCategoryRanges.price.max}`} // Add key to force re-render
                    currentMin={tempFilters.minPrice}
                    currentMax={tempFilters.maxPrice}
                    onPriceChange={(range) =>
                      setTempFilters((prev) => ({ ...prev, ...range }))
                    }
                    range={mobileCategoryRanges.price}
                  />

                  <RatingFilter
                    minRating={tempFilters.minRating}
                    onRatingChange={(rating) =>
                      setTempFilters((prev) => ({ ...prev, minRating: rating }))
                    }
                    maxAvailableRating={Math.max(...categoryRanges.ratings)}
                  />
                </div>

                {/* Mobile Filters Bottom Section - Replace your existing bottom section with this */}
                <div className="border-t border-base-300 p-4 bg-white">
                  <div className="flex flex-col gap-2">
                    {/* Reset Button - Only shown after filters are applied */}
                    {(filters.category !== "all" ||
                      filters.minPrice ||
                      filters.maxPrice ||
                      filters.minRating > 0 ||
                      filters.searchQuery) && (
                      <button
                        onClick={() => {
                          dispatch(resetFilters());
                          setSearchInput("");
                          setTempFilters({
                            category: "all",
                            minPrice: null,
                            maxPrice: null,
                            minRating: 0,
                          });
                          setMobileFiltersOpen(false);
                        }}
                        className="btn btn-outline w-full text-error hover:bg-error hover:text-white mb-2"
                      >
                        Reset All Filters
                      </button>
                    )}

                    {/* Apply Button - Always visible */}
                    <button
                      onClick={handleApplyMobileFilters}
                      className="btn btn-primary w-full"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm opacity-70">
                Showing {paginatedProducts.length} of {processedProducts.length}{" "}
                products
                {filters.searchQuery && (
                  <span className="ml-2 text-primary">
                    for "{filters.searchQuery}"
                  </span>
                )}
              </p>
              <SortDropdown
                currentSort={filters.sortBy}
                onSortChange={(sort) => dispatch(setSortBy(sort))}
              />
            </div>

            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Pagination
                  currentPage={filters.page}
                  totalPages={totalPages}
                  onPageChange={(page) => dispatch(setPage(page))}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="opacity-70 mb-3">
                  No products match your filters
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage1;
