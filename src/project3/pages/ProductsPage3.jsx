// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProducts,
//   fetchCategories,
//   processProducts,
// } from "../store/features/products/productsSlice";
// import {
//   setCategory,
//   setSearchQuery,
//   setPriceRange,
//   setMinRating,
//   setSortBy,
//   setPage,
//   toggleSidebar,
//   resetFilters,
// } from "../store/features/filters/filterSlice";
// import { fetchSuggestionsFromAPI } from "../store/features/products/productsApi";
// import SearchBar from "../components/SearchBar";
// import FiltersSidebar from "../components/FiltersSidebar";
// import ProductCard from "../components/ProductCard";
// import Pagination from "../components/Pagination";
// import ThemeToggle from "../components/ThemeToggle";
// import useDebounce from "../hooks/useDebounce";

// const ProductsPage3 = () => {
//   const dispatch = useDispatch();

//   // Get state from Redux
//   const { processedProducts, rawProducts, loading, error, categories } =
//     useSelector((state) => state.products);
//   const filters = useSelector((state) => state.filters);
//   const theme = useSelector((state) => state.theme);

//   // Local state for search suggestions
//   const [suggestions, setSuggestions] = useState([]);
//   const debouncedSearch = useDebounce(filters.searchQuery, 500);

//   // Fetch initial data
//   useEffect(() => {
//     dispatch(fetchProducts());
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   // Process products when filters change
//   useEffect(() => {
//     if (rawProducts.length > 0) {
//       dispatch(processProducts(filters));
//     }
//   }, [filters, rawProducts, dispatch]);

//   // Fetch search suggestions
//   useEffect(() => {
//     const getSuggestions = async () => {
//       if (debouncedSearch.length >= 2) {
//         const results = await fetchSuggestionsFromAPI(debouncedSearch);
//         setSuggestions(results);
//       } else {
//         setSuggestions([]);
//       }
//     };
//     getSuggestions();
//   }, [debouncedSearch]);

//   // Pagination
//   const paginatedProducts = processedProducts.slice(
//     (filters.page - 1) * filters.limit,
//     filters.page * filters.limit,
//   );

//   const totalPages = Math.ceil(processedProducts.length / filters.limit);

//   // Loading state
//   if (loading && rawProducts.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-red-500 mb-4">Error: {error}</p>
//         <button
//           onClick={() => dispatch(fetchProducts())}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className={`${theme.mode === "dark" ? "dark" : ""}`}>
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
//         {/* Header */}
//         <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//           <div className="container mx-auto px-4 py-4">
//             <div className="flex items-center justify-between">
//               <h1 className="text-2xl font-bold">Products</h1>
//               <div className="flex items-center gap-4">
//                 <ThemeToggle />
//                 <button
//                   onClick={() => dispatch(toggleSidebar())}
//                   className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="mt-4">
//               <SearchBar
//                 value={filters.searchQuery}
//                 onChange={(value) => dispatch(setSearchQuery(value))}
//                 suggestions={suggestions}
//                 onSelectSuggestion={(product) => {
//                   dispatch(setSearchQuery(product.title));
//                 }}
//               />
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Sidebar Overlay for Mobile */}
//             {filters.isSidebarOpen && (
//               <div
//                 className="fixed inset-0 bg-black/50 z-20 lg:hidden"
//                 onClick={() => dispatch(toggleSidebar())}
//               />
//             )}

//             {/* Sidebar */}
//             <aside
//               className={`
//               fixed lg:static inset-y-0 left-0 z-30 w-80 lg:w-72
//               transform transition-transform duration-300 bg-white dark:bg-gray-800
//               ${filters.isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//               overflow-y-auto p-6 border-r border-gray-200 dark:border-gray-700
//             `}
//             >
//               <FiltersSidebar
//                 categories={categories}
//                 filters={filters}
//                 onCategoryChange={(cat) => dispatch(setCategory(cat))}
//                 onPriceChange={(min, max) =>
//                   dispatch(setPriceRange({ min, max }))
//                 }
//                 onRatingChange={(rating) => dispatch(setMinRating(rating))}
//                 onSortChange={(sort) => dispatch(setSortBy(sort))}
//                 onClose={() => dispatch(toggleSidebar())}
//               />
//             </aside>

//             {/* Products Grid */}
//             <main className="flex-1">
//               {/* Sort and Results Count */}
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//                 <p className="text-gray-600 dark:text-gray-400">
//                   Showing {paginatedProducts.length} of{" "}
//                   {processedProducts.length} products
//                 </p>

//                 <select
//                   value={filters.sortBy}
//                   onChange={(e) => dispatch(setSortBy(e.target.value))}
//                   className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 
//                            rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 
//                            focus:ring-blue-500 transition-shadow"
//                 >
//                   <option value="default">Default</option>
//                   <option value="price-asc">Price: Low to High</option>
//                   <option value="price-desc">Price: High to Low</option>
//                   <option value="rating-desc">Top Rated</option>
//                   <option value="title-asc">Name: A to Z</option>
//                 </select>
//               </div>

//               {/* Products Grid */}
//               {paginatedProducts.length > 0 ? (
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {paginatedProducts.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500 dark:text-gray-400 mb-4">
//                     No products match your filters
//                   </p>
//                   <button
//                     onClick={() => dispatch(resetFilters())}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               )}

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <Pagination
//                   currentPage={filters.page}
//                   totalPages={totalPages}
//                   onPageChange={(page) => dispatch(setPage(page))}
//                 />
//               )}
//             </main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage3;
