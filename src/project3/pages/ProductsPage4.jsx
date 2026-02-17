// // ProductsPage.jsx
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
// import ThemeToggle from "../components/ThemeToggle";
// import useDebounce from "../hooks/useDebounce";

// // Icons Component
// const Icons = {
//   Search: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//       />
//     </svg>
//   ),
//   Filter: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
//       />
//     </svg>
//   ),
//   Close: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M6 18L18 6M6 6l12 12"
//       />
//     </svg>
//   ),
//   Star: ({ filled }) => (
//     <svg
//       className={`w-3 h-3 ${filled ? "text-yellow-400" : "text-gray-300"}`}
//       fill="currentColor"
//       viewBox="0 0 20 20"
//     >
//       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//     </svg>
//   ),
//   ChevronDown: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M19 9l-7 7-7-7"
//       />
//     </svg>
//   ),
// };

// const ProductsPage4 = () => {
//   const dispatch = useDispatch();

//   // Redux state
//   const { processedProducts, rawProducts, loading, error, categories } =
//     useSelector((state) => state.products);
//   const filters = useSelector((state) => state.filters);
//   const theme = useSelector((state) => state.theme);

//   // Local state for search
//   const [searchInput, setSearchInput] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

//   // Debounce search input for both suggestions and actual search
//   const debouncedSearch = useDebounce(searchInput, 500);

//   // Fetch initial data
//   useEffect(() => {
//     dispatch(fetchProducts());
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   // 🔥 CRITICAL: Update Redux search query when debounced search changes
//   // This triggers the main product list to update
//   useEffect(() => {
//     dispatch(setSearchQuery(debouncedSearch));
//   }, [debouncedSearch, dispatch]);

//   // Process products when filters change (including search query)
//   useEffect(() => {
//     if (rawProducts.length > 0) {
//       dispatch(processProducts(filters));
//     }
//   }, [filters, rawProducts, dispatch]);

//   // Fetch search suggestions (separate from main search)
//   useEffect(() => {
//     const getSuggestions = async () => {
//       if (searchInput.length >= 2) {
//         // Use searchInput, not debouncedSearch for instant suggestions
//         const results = await fetchSuggestionsFromAPI(searchInput);
//         setSuggestions(results);
//       } else {
//         setSuggestions([]);
//       }
//     };
//     getSuggestions();
//   }, [searchInput]); // Update suggestions on every keystroke

//   // Pagination
//   const paginatedProducts = processedProducts.slice(
//     (filters.page - 1) * filters.limit,
//     filters.page * filters.limit,
//   );

//   const totalPages = Math.ceil(processedProducts.length / filters.limit);

//   // Handle suggestion click
//   const handleSuggestionClick = (product) => {
//     setSearchInput(product.title);
//     dispatch(setSearchQuery(product.title)); // Immediately update search query
//     setShowSuggestions(false);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     setShowSuggestions(true);
//     // Don't dispatch setSearchQuery here - let debounce handle it
//   };

//   // Loading state
//   if (loading && rawProducts.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 mb-3">{error}</p>
//           <button
//             onClick={() => dispatch(fetchProducts())}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={theme.mode === "dark" ? "dark" : ""}>
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//         {/* Header */}
//         <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//           <div className="max-w-7xl mx-auto px-4 py-3">
//             <div className="flex items-center justify-between gap-4">
//               <h1 className="text-xl font-bold text-gray-800 dark:text-white">
//                 Products
//               </h1>

//               {/* Search Bar - with suggestions */}
//               <div className="flex-1 max-w-md relative">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchInput}
//                     onChange={handleSearchChange}
//                     onFocus={() => setShowSuggestions(true)}
//                     placeholder="Search products..."
//                     className="w-full px-4 py-2 pl-9 pr-4 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//                   />
//                   <div className="absolute left-3 top-2.5 text-gray-400">
//                     <Icons.Search />
//                   </div>
//                 </div>

//                 {/* Search Suggestions - shows while typing */}
//                 {showSuggestions && suggestions.length > 0 && (
//                   <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
//                     {suggestions.map((product) => (
//                       <button
//                         key={product.id}
//                         className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                         onClick={() => handleSuggestionClick(product)}
//                       >
//                         <img
//                           src={product.thumbnail}
//                           alt={product.title}
//                           className="w-8 h-8 rounded object-cover"
//                         />
//                         <div className="flex-1 text-left">
//                           <div className="text-sm font-medium">
//                             {product.title}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             ${product.price}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {/* Show search indicator when searching */}
//                 {filters.searchQuery && (
//                   <div className="absolute -bottom-6 left-0 text-xs text-blue-500">
//                     Searching: "{filters.searchQuery}"
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center gap-2">
//                 <ThemeToggle />
//                 <button
//                   onClick={() => setMobileFiltersOpen(true)}
//                   className="lg:hidden p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
//                 >
//                   <Icons.Filter />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex gap-6">
//             {/* Desktop Sidebar Filters */}
//             <aside className="hidden lg:block w-64 shrink-0">
//               <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4 sticky top-20">
//                 <h2 className="font-semibold text-gray-700 dark:text-gray-200">
//                   Filters
//                 </h2>

//                 {/* Categories */}
//                 {/* Categories Dropdown */}
//                 <div>
//                   <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Category
//                   </p>
//                   <select
//                     value={filters.category}
//                     onChange={(e) => dispatch(setCategory(e.target.value))}
//                     className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600
//                rounded-lg bg-white dark:bg-gray-700 focus:outline-none
//                focus:ring-2 focus:ring-blue-500 transition-shadow"
//                   >
//                     <option value="all">All Categories</option>
//                     {categories.map((cat) => (
//                       <option
//                         key={cat.slug}
//                         value={cat.slug}
//                         className="capitalize"
//                       >
//                         {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {/* Price Range */}
//                 <div>
//                   <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Price Range
//                   </p>
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2 text-xs text-gray-500">
//                       <span>${filters.minPrice || 0}</span>
//                       <span>-</span>
//                       <span>${filters.maxPrice || 1000}</span>
//                     </div>
//                     <input
//                       type="range"
//                       min={0}
//                       max={1000}
//                       value={filters.maxPrice || 1000}
//                       onChange={(e) =>
//                         dispatch(
//                           setPriceRange({
//                             min: filters.minPrice,
//                             max: e.target.value,
//                           }),
//                         )
//                       }
//                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
//                     />
//                     <div className="flex gap-2">
//                       <input
//                         type="number"
//                         placeholder="Min"
//                         value={filters.minPrice || ""}
//                         onChange={(e) =>
//                           dispatch(
//                             setPriceRange({
//                               min: e.target.value,
//                               max: filters.maxPrice,
//                             }),
//                           )
//                         }
//                         className="w-full px-2 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
//                       />
//                       <input
//                         type="number"
//                         placeholder="Max"
//                         value={filters.maxPrice || ""}
//                         onChange={(e) =>
//                           dispatch(
//                             setPriceRange({
//                               min: filters.minPrice,
//                               max: e.target.value,
//                             }),
//                           )
//                         }
//                         className="w-full px-2 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Rating */}

//                 <div>
//                   <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Rating
//                   </p>
//                   <div className="rating rating-md">
//                     <input
//                       type="radio"
//                       name="rating-filter"
//                       className="mask mask-star-2 bg-green-500"
//                       aria-label="1 star"
//                       checked={filters.minRating === 1}
//                       onChange={() =>
//                         dispatch(setMinRating(filters.minRating === 1 ? 0 : 1))
//                       }
//                     />
//                     <input
//                       type="radio"
//                       name="rating-filter"
//                       className="mask mask-star-2 bg-green-500"
//                       aria-label="2 star"
//                       checked={filters.minRating === 2}
//                       onChange={() =>
//                         dispatch(setMinRating(filters.minRating === 2 ? 0 : 2))
//                       }
//                     />
//                     <input
//                       type="radio"
//                       name="rating-filter"
//                       className="mask mask-star-2 bg-green-500"
//                       aria-label="3 star"
//                       checked={filters.minRating === 3}
//                       onChange={() =>
//                         dispatch(setMinRating(filters.minRating === 3 ? 0 : 3))
//                       }
//                     />
//                     <input
//                       type="radio"
//                       name="rating-filter"
//                       className="mask mask-star-2 bg-green-500"
//                       aria-label="4 star"
//                       checked={filters.minRating === 4}
//                       onChange={() =>
//                         dispatch(setMinRating(filters.minRating === 4 ? 0 : 4))
//                       }
//                     />
//                     <input
//                       type="radio"
//                       name="rating-filter"
//                       className="mask mask-star-2 bg-green-500"
//                       aria-label="5 star"
//                       checked={filters.minRating === 5}
//                       onChange={() =>
//                         dispatch(setMinRating(filters.minRating === 5 ? 0 : 5))
//                       }
//                     />
//                   </div>

//                   {/* Optional: Show selected rating text */}
//                   {filters.minRating > 0 && (
//                     <div className="flex items-center justify-between mt-1">
//                       <span className="text-xs text-blue-500">
//                         {filters.minRating}+ Stars selected
//                       </span>
//                       <button
//                         onClick={() => dispatch(setMinRating(0))}
//                         className="text-xs text-gray-500 hover:text-gray-700"
//                       >
//                         Clear
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Clear Filters */}
//                 {(filters.category !== "all" ||
//                   filters.minPrice ||
//                   filters.maxPrice ||
//                   filters.minRating > 0 ||
//                   filters.searchQuery) && (
//                   <button
//                     onClick={() => {
//                       dispatch(resetFilters());
//                       setSearchInput("");
//                     }}
//                     className="w-full mt-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
//                   >
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             </aside>

//             {/* Mobile Filters Drawer */}
//             {mobileFiltersOpen && (
//               <>
//                 <div
//                   className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//                   onClick={() => setMobileFiltersOpen(false)}
//                 />
//                 <div className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 z-50 lg:hidden overflow-y-auto p-4">
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="font-semibold">Filters</h2>
//                     <button
//                       onClick={() => setMobileFiltersOpen(false)}
//                       className="p-1"
//                     >
//                       <Icons.Close />
//                     </button>
//                   </div>
//                   <div className="space-y-4">
//                     {/* Same filter content as desktop */}
//                     {/* Categories Dropdown */}
//                     <div>
//                       <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Category
//                       </p>
//                       <select
//                         value={filters.category}
//                         onChange={(e) => dispatch(setCategory(e.target.value))}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600
//                rounded-lg bg-white dark:bg-gray-700 focus:outline-none
//                focus:ring-2 focus:ring-blue-500 transition-shadow"
//                       >
//                         <option value="all">All Categories</option>
//                         {categories.map((cat) => (
//                           <option
//                             key={cat.slug}
//                             value={cat.slug}
//                             className="capitalize"
//                           >
//                             {cat.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     {/* Price Range */}
//                     <div>
//                       <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Price Range
//                       </p>
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-xs text-gray-500">
//                           <span>${filters.minPrice || 0}</span>
//                           <span>-</span>
//                           <span>${filters.maxPrice || 1000}</span>
//                         </div>
//                         <input
//                           type="range"
//                           min={0}
//                           max={1000}
//                           value={filters.maxPrice || 1000}
//                           onChange={(e) =>
//                             dispatch(
//                               setPriceRange({
//                                 min: filters.minPrice,
//                                 max: e.target.value,
//                               }),
//                             )
//                           }
//                           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
//                         />
//                         <div className="flex gap-2">
//                           <input
//                             type="number"
//                             placeholder="Min"
//                             value={filters.minPrice || ""}
//                             onChange={(e) =>
//                               dispatch(
//                                 setPriceRange({
//                                   min: e.target.value,
//                                   max: filters.maxPrice,
//                                 }),
//                               )
//                             }
//                             className="w-full px-2 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
//                           />
//                           <input
//                             type="number"
//                             placeholder="Max"
//                             value={filters.maxPrice || ""}
//                             onChange={(e) =>
//                               dispatch(
//                                 setPriceRange({
//                                   min: filters.minPrice,
//                                   max: e.target.value,
//                                 }),
//                               )
//                             }
//                             className="w-full px-2 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Rating */}

//                     <div>
//                       <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Rating
//                       </p>
//                       <div className="rating rating-md">
//                         <input
//                           type="radio"
//                           name="rating-filter"
//                           className="mask mask-star-2 bg-green-500"
//                           aria-label="1 star"
//                           checked={filters.minRating === 1}
//                           onChange={() =>
//                             dispatch(
//                               setMinRating(filters.minRating === 1 ? 0 : 1),
//                             )
//                           }
//                         />
//                         <input
//                           type="radio"
//                           name="rating-filter"
//                           className="mask mask-star-2 bg-green-500"
//                           aria-label="2 star"
//                           checked={filters.minRating === 2}
//                           onChange={() =>
//                             dispatch(
//                               setMinRating(filters.minRating === 2 ? 0 : 2),
//                             )
//                           }
//                         />
//                         <input
//                           type="radio"
//                           name="rating-filter"
//                           className="mask mask-star-2 bg-green-500"
//                           aria-label="3 star"
//                           checked={filters.minRating === 3}
//                           onChange={() =>
//                             dispatch(
//                               setMinRating(filters.minRating === 3 ? 0 : 3),
//                             )
//                           }
//                         />
//                         <input
//                           type="radio"
//                           name="rating-filter"
//                           className="mask mask-star-2 bg-green-500"
//                           aria-label="4 star"
//                           checked={filters.minRating === 4}
//                           onChange={() =>
//                             dispatch(
//                               setMinRating(filters.minRating === 4 ? 0 : 4),
//                             )
//                           }
//                         />
//                         <input
//                           type="radio"
//                           name="rating-filter"
//                           className="mask mask-star-2 bg-green-500"
//                           aria-label="5 star"
//                           checked={filters.minRating === 5}
//                           onChange={() =>
//                             dispatch(
//                               setMinRating(filters.minRating === 5 ? 0 : 5),
//                             )
//                           }
//                         />
//                       </div>

//                       {/* Optional: Show selected rating text */}
//                       {filters.minRating > 0 && (
//                         <div className="flex items-center justify-between mt-1">
//                           <span className="text-xs text-blue-500">
//                             {filters.minRating}+ Stars selected
//                           </span>
//                           <button
//                             onClick={() => dispatch(setMinRating(0))}
//                             className="text-xs text-gray-500 hover:text-gray-700"
//                           >
//                             Clear
//                           </button>
//                         </div>
//                       )}
//                     </div>

//                     {/* Clear Filters */}
//                     {(filters.category !== "all" ||
//                       filters.minPrice ||
//                       filters.maxPrice ||
//                       filters.minRating > 0 ||
//                       filters.searchQuery) && (
//                       <button
//                         onClick={() => {
//                           dispatch(resetFilters());
//                           setSearchInput("");
//                         }}
//                         className="w-full mt-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
//                       >
//                         Clear Filters
//                       </button>
//                     )}

//                     {/* Add other filters similarly */}
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Products Grid */}
//             <main className="flex-1">
//               {/* Header with Sort and Count */}
//               <div className="flex justify-between items-center mb-4">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Showing {paginatedProducts.length} of{" "}
//                   {processedProducts.length} products
//                   {filters.searchQuery && (
//                     <span className="ml-2 text-blue-500">
//                       for "{filters.searchQuery}"
//                     </span>
//                   )}
//                 </p>
//                 <div className="relative">
//                   <select
//                     value={filters.sortBy}
//                     onChange={(e) => dispatch(setSortBy(e.target.value))}
//                     className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                   >
//                     <option value="default">Sort</option>
//                     <option value="price-asc">Price: Low to High</option>
//                     <option value="price-desc">Price: High to Low</option>
//                     <option value="rating-desc">Top Rated</option>
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
//                     <Icons.ChevronDown />
//                   </div>
//                 </div>
//               </div>

//               {/* Products Grid */}
//               {paginatedProducts.length > 0 ? (
//                 <>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//                     {paginatedProducts.map((product) => (
//                       <div
//                         key={product.id}
//                         className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
//                       >
//                         <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
//                           <img
//                             src={product.thumbnail}
//                             alt={product.title}
//                             className="w-full h-full object-cover hover:scale-105 transition-transform"
//                           />
//                         </div>
//                         <div className="p-2 space-y-1">
//                           <h3 className="text-xs font-semibold line-clamp-1">
//                             {product.title}
//                           </h3>
//                           <p className="text-xs text-gray-500 line-clamp-1">
//                             {product.description?.slice(0, 20)}
//                           </p>
//                           <div className="flex justify-between items-center text-xs">
//                             <span className="font-bold">${product.price}</span>
//                             <span className="flex items-center gap-0.5">
//                               <Icons.Star filled={true} />
//                               {product.rating}
//                             </span>
//                           </div>
//                           <button className="w-full mt-1 px-2 py-2 bg-blue-500 text-white text-md font-semibold rounded hover:bg-blue-600 transition-colors">
//                             Add to Cart
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   {/* Pagination */}
//                   {totalPages > 1 && (
//                     <div className="flex justify-center items-center gap-2 mt-8">
//                       <button
//                         onClick={() => dispatch(setPage(filters.page - 1))}
//                         disabled={filters.page === 1}
//                         className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
//                disabled:opacity-50 disabled:cursor-not-allowed
//                hover:bg-gray-100 dark:hover:bg-gray-700
//                transition-colors duration-200 text-sm
//                focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         Previous
//                       </button>

//                       <div className="flex items-center gap-1">
//                         {[...Array(Math.min(5, totalPages))].map((_, i) => {
//                           let pageNum;
//                           if (totalPages <= 5) {
//                             pageNum = i + 1;
//                           } else if (filters.page <= 3) {
//                             pageNum = i + 1;
//                           } else if (filters.page >= totalPages - 2) {
//                             pageNum = totalPages - 4 + i;
//                           } else {
//                             pageNum = filters.page - 2 + i;
//                           }

//                           return (
//                             <button
//                               key={i}
//                               onClick={() => dispatch(setPage(pageNum))}
//                               className={`w-10 h-10 rounded-lg transition-colors text-sm
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${
//                         filters.page === pageNum
//                           ? "bg-blue-600 text-white"
//                           : "hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
//                       }`}
//                             >
//                               {pageNum}
//                             </button>
//                           );
//                         })}
//                       </div>

//                       <button
//                         onClick={() => dispatch(setPage(filters.page + 1))}
//                         disabled={filters.page === totalPages}
//                         className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
//                disabled:opacity-50 disabled:cursor-not-allowed
//                hover:bg-gray-100 dark:hover:bg-gray-700
//                transition-colors duration-200 text-sm
//                focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         Next
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
//                     No products match your filters
//                     {filters.searchQuery && (
//                       <span> for "{filters.searchQuery}"</span>
//                     )}
//                   </p>
//                   <button
//                     onClick={() => {
//                       dispatch(resetFilters());
//                       setSearchInput("");
//                     }}
//                     className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               )}
//             </main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage4;

// ProductsPage.jsx
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
  toggleSidebar,
  resetFilters,
} from "../store/features/filters/filterSlice";
import { fetchSuggestionsFromAPI } from "../store/features/products/productsApi";
import useDebounce from "../hooks/useDebounce";

// Icons Component
const Icons = {
  Search: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  Filter: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
    </svg>
  ),
  Close: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  Star: ({ filled }) => (
    <svg
      className={`w-3 h-3 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  ChevronDown: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  ),
};

const ProductsPage4 = () => {
  const dispatch = useDispatch();

  // Redux state
  const { processedProducts, rawProducts, loading, error, categories } =
    useSelector((state) => state.products);
  const filters = useSelector((state) => state.filters);

  // Local state
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 500);

  // Get category-specific price and rating ranges
  const categoryRanges = useMemo(() => {
    if (!rawProducts.length)
      return { price: { min: 0, max: 1000 }, ratings: [1, 2, 3, 4, 5] };

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

  // Update price range when category changes
  useEffect(() => {
    if (filters.category !== "all") {
      dispatch(
        setPriceRange({
          min: categoryRanges.price.min,
          max: categoryRanges.price.max,
        }),
      );
    }
  }, [
    filters.category,
    categoryRanges.price.min,
    categoryRanges.price.max,
    dispatch,
  ]);

  // Fetch initial data
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

  const paginatedProducts = processedProducts.slice(
    (filters.page - 1) * filters.limit,
    filters.page * filters.limit,
  );

  const totalPages = Math.ceil(processedProducts.length / filters.limit);

  const handleSuggestionClick = (product) => {
    setSearchInput(product.title);
    dispatch(setSearchQuery(product.title));
    setShowSuggestions(false);
  };

  // Loading state with skeletons matching product card layout
  if (loading && rawProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header skeleton */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="skeleton h-8 w-32"></div>
              <div className="flex-1 max-w-md">
                <div className="skeleton h-10 w-full rounded-lg"></div>
              </div>
              <div className="skeleton h-10 w-10 rounded-lg lg:hidden"></div>
            </div>
          </div>
        </div>

        {/* Main content with skeletons */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Sidebar skeleton - hidden on mobile */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-lg p-4 space-y-4">
                <div className="skeleton h-6 w-20"></div>
                <div className="skeleton h-10 w-full"></div>
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-24 w-full"></div>
                <div className="skeleton h-10 w-full"></div>
              </div>
            </aside>

            {/* Products grid skeletons */}
            <main className="flex-1">
              {/* Header skeleton */}
              <div className="flex justify-between items-center mb-4">
                <div className="skeleton h-4 w-48"></div>
                <div className="skeleton h-8 w-32"></div>
              </div>

              {/* Product cards grid - showing 10 skeletons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="skeleton h-48 w-full"></div>
                    <div className="p-2 space-y-2">
                      <div className="skeleton h-4 w-3/4"></div>
                      <div className="skeleton h-3 w-full"></div>
                      <div className="flex justify-between items-center">
                        <div className="skeleton h-4 w-16"></div>
                        <div className="skeleton h-4 w-12"></div>
                      </div>
                      <div className="skeleton h-8 w-full rounded mt-1"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination skeleton */}
              <div className="flex justify-center items-center gap-2 mt-8">
                <div className="skeleton h-10 w-20"></div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-10 w-10"></div>
                  ))}
                </div>
                <div className="skeleton h-10 w-20"></div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-3">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl font-bold text-gray-800">Products</h1>

            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-9 pr-4 bg-gray-100 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Icons.Search />
                </div>
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 transition-colors"
                      onClick={() => handleSuggestionClick(product)}
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium">
                          {product.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${product.price}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Icons.Filter />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-lg p-4 space-y-4 sticky top-20">
              <h2 className="font-semibold text-gray-700">Filters</h2>
              {/* Categories Dropdown */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Category
                </p>
                <select
                  value={filters.category}
                  onChange={(e) => dispatch(setCategory(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option
                      key={cat.slug}
                      value={cat.slug}
                      className="capitalize"
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Price Range - Category Specific */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Min: ${categoryRanges.price.min}</span>
                    <span>Max: ${categoryRanges.price.max}</span>
                  </div>
                  <input
                    type="range"
                    min={categoryRanges.price.min}
                    max={categoryRanges.price.max}
                    value={filters.maxPrice || categoryRanges.price.max}
                    onChange={(e) =>
                      dispatch(
                        setPriceRange({
                          min: filters.minPrice,
                          max: Number(e.target.value),
                        }),
                      )
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice || ""}
                      onChange={(e) =>
                        dispatch(
                          setPriceRange({
                            min: e.target.value ? Number(e.target.value) : null,
                            max: filters.maxPrice,
                          }),
                        )
                      }
                      className="w-full px-2 py-1 text-sm border border-gray-200 rounded bg-white"
                      min={categoryRanges.price.min}
                      max={categoryRanges.price.max}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice || ""}
                      onChange={(e) =>
                        dispatch(
                          setPriceRange({
                            min: filters.minPrice,
                            max: e.target.value ? Number(e.target.value) : null,
                          }),
                        )
                      }
                      className="w-full px-2 py-1 text-sm border border-gray-200 rounded bg-white"
                      min={categoryRanges.price.min}
                      max={categoryRanges.price.max}
                    />
                  </div>
                </div>
              </div>
              {/* Rating - Category Specific */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Rating</p>
                <div className="rating rating-md">
                  {[1, 2, 3, 4, 5]
                    .filter(
                      (rating) => rating <= Math.max(...categoryRanges.ratings),
                    )
                    .map((rating) => (
                      <input
                        key={rating}
                        type="radio"
                        name="rating-filter"
                        className="mask mask-star-2 bg-green-500"
                        aria-label={`${rating} star`}
                        checked={filters.minRating === rating}
                        onChange={() =>
                          dispatch(
                            setMinRating(
                              filters.minRating === rating ? 0 : rating,
                            ),
                          )
                        }
                      />
                    ))}
                </div>

                {/* Show max rating info */}
                <div className="text-xs text-gray-500 mt-1">
                  {categoryRanges.ratings.length > 0 ? (
                    <span>
                      Up to {Math.max(...categoryRanges.ratings)}+ stars
                      available
                    </span>
                  ) : (
                    <span>No ratings available</span>
                  )}
                </div>

                {filters.minRating > 0 && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-blue-500">
                      {filters.minRating}+ Stars selected
                    </span>
                    <button
                      onClick={() => dispatch(setMinRating(0))}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
              {/* Clear Filters */}
              {(filters.category !== "all" ||
                filters.minPrice ||
                filters.maxPrice ||
                filters.minRating > 0 ||
                filters.searchQuery) && (
                <button
                  onClick={() => {
                    dispatch(resetFilters());
                    setSearchInput("");
                  }}
                  className="w-full mt-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* Mobile Filters Drawer */}
          {mobileFiltersOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="fixed left-0 top-0 h-full w-72 bg-white z-50 lg:hidden overflow-y-auto p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1"
                  >
                    <Icons.Close />
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Same filter content as desktop */}
                  <div>
                    <p className="text-sm font-medium mb-2">Category</p>
                    <select
                      value={filters.category}
                      onChange={(e) => {
                        dispatch(setCategory(e.target.value));
                        setMobileFiltersOpen(false);
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((cat) => (
                        <option
                          key={cat.slug}
                          value={cat.slug}
                          className="capitalize"
                        >
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Price Range</p>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={categoryRanges.price.min}
                        max={categoryRanges.price.max}
                        value={filters.maxPrice || categoryRanges.price.max}
                        onChange={(e) =>
                          dispatch(
                            setPriceRange({
                              min: filters.minPrice,
                              max: Number(e.target.value),
                            }),
                          )
                        }
                        className="w-full accent-blue-500"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.minPrice || ""}
                          onChange={(e) =>
                            dispatch(
                              setPriceRange({
                                min: e.target.value,
                                max: filters.maxPrice,
                              }),
                            )
                          }
                          className="w-full px-2 py-1 text-sm border rounded"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.maxPrice || ""}
                          onChange={(e) =>
                            dispatch(
                              setPriceRange({
                                min: filters.minPrice,
                                max: e.target.value,
                              }),
                            )
                          }
                          className="w-full px-2 py-1 text-sm border rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Rating</p>
                    <div className="rating rating-md">
                      {categoryRanges.ratings.map((rating) => (
                        <input
                          key={rating}
                          type="radio"
                          name="mobile-rating"
                          className="mask mask-star-2 bg-green-500"
                          checked={filters.minRating === rating}
                          onChange={() => {
                            dispatch(
                              setMinRating(
                                filters.minRating === rating ? 0 : rating,
                              ),
                            );
                            setMobileFiltersOpen(false);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                Showing {paginatedProducts.length} of {processedProducts.length}{" "}
                products
                {filters.searchQuery && (
                  <span className="ml-2 text-blue-500">
                    for "{filters.searchQuery}"
                  </span>
                )}
              </p>
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="default">Sort</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Top Rated</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <Icons.ChevronDown />
                </div>
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-2 space-y-1">
                        <h3 className="text-xs font-semibold line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {product.description?.slice(0, 20)}
                        </p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold">${product.price}</span>
                          <span className="flex items-center gap-0.5">
                            <Icons.Star filled={true} />
                            {product.rating}
                          </span>
                        </div>
                        <button className="w-full mt-1 px-2 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => dispatch(setPage(filters.page - 1))}
                      disabled={filters.page === 1}
                      className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-sm"
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (filters.page <= 3) {
                          pageNum = i + 1;
                        } else if (filters.page >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = filters.page - 2 + i;
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => dispatch(setPage(pageNum))}
                            className={`w-10 h-10 rounded-lg transition-colors text-sm ${
                              filters.page === pageNum
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100 border border-gray-300"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => dispatch(setPage(filters.page + 1))}
                      disabled={filters.page === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-sm"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm mb-3">
                  No products match your filters
                  {filters.searchQuery && (
                    <span> for "{filters.searchQuery}"</span>
                  )}
                </p>
                <button
                  onClick={() => {
                    dispatch(resetFilters());
                    setSearchInput("");
                  }}
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
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

export default ProductsPage4;
