// components/CategoryDropdown.jsx - Simpler Version
import React, { useState, useRef, useEffect } from "react";

const Icons = {
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

const CategoryDropdown = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSelectedName = () => {
    if (selectedCategory === "all") return "All Categories";
    const cat = categories.find((c) => c.slug === selectedCategory);
    return cat ? cat.name.replace(/-/g, " ") : "Select Category";
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <span className="truncate font-medium capitalize">
          {getSelectedName()}
        </span>
        <Icons.ChevronDown />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 max-h-60 overflow-y-auto">
          {/* All Categories */}
          <button
            onClick={() => {
              onCategoryChange("all");
              setIsOpen(false);
            }}
            className={`w-full px-4 py-3 text-sm text-left hover:bg-gray-50 border-b border-gray-100 ${
              selectedCategory === "all"
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700"
            }`}
          >
            All Categories
          </button>

          {/* Categories List */}
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                onCategoryChange(cat.slug);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-sm text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 capitalize ${
                selectedCategory === cat.slug
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              {cat.name.replace(/-/g, " ")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
