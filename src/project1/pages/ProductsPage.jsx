import React, { useEffect, useState } from "react";
import SortDropdown from "../components/SortDropdown";
import SearchBar from "../components/SearchBar";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MenuButton from "../components/MenuButton";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { fetchCategoriesFromAPI } from "../../project3/store/features/products/productsApi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProducts,
} from "../../project3/store/features/products/productsSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { processedProducts, rawProducts, loading, error, categories } =
    useSelector((state) => state.products);
  //console.log(rawProducts, categories);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);
  if (loading && rawProducts.length === 0) return <LoadingSkeleton />;
  if (error)
    return <div className="text-center py-12 text-red-500">{error}</div>;
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-xl font-bold text-gray-800">Products</h1>
              <SearchBar />
              <MenuButton />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-2 md:px-4 py-6">
          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <FiltersSidebar />
            </aside>
            {mobileFiltersOpen && <div>Hello Mobile Filter</div>}
            {/* Products Grid */}
            <main className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">100 products found</p>
                <SortDropdown />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {rawProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
