import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';

const CategoryDropdown = ({ categories, selectedCategory, onCategoryChange, categoryCounts = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalProducts = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);

  const getSelectedName = () => {
    if (selectedCategory === 'all') return 'All Categories';
    const cat = categories.find(c => c.slug === selectedCategory);
    return cat ? cat.name.replace(/-/g, ' ') : 'Select Category';
  };

  const getSelectedCount = () => {
    if (selectedCategory === 'all') return totalProducts;
    return categoryCounts[selectedCategory] || 0;
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Trigger - Beautiful Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800 capitalize truncate max-w-37.5">
              {getSelectedName()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
              {getSelectedCount()}
            </span>
            <Icons.ChevronDown />
          </div>
        </div>
      </button>

      {/* Dropdown Menu - Beautiful List */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700">Select Category</h3>
          </div>

          {/* All Categories Option */}
          <button
            onClick={() => {
              onCategoryChange('all');
              setIsOpen(false);
            }}
            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between border-b border-gray-100 ${
              selectedCategory === 'all' ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs">📦</span>
              </div>
              <div>
                <span className={`text-sm font-medium ${selectedCategory === 'all' ? 'text-blue-600' : 'text-gray-700'}`}>
                  All Categories
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {totalProducts}
              </span>
              {selectedCategory === 'all' && (
                <span className="text-blue-600">
                  <Icons.Check />
                </span>
              )}
            </div>
          </button>

          {/* Categories List */}
          <div className="max-h-60 overflow-y-auto">
            {categories.map((cat) => {
              const count = categoryCounts[cat.slug] || 0;
              const isSelected = selectedCategory === cat.slug;
              
              return (
                <button
                  key={cat.slug}
                  onClick={() => {
                    onCategoryChange(cat.slug);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Category Icon based on name */}
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs">
                        {cat.name.includes('beauty') && '💄'}
                        {cat.name.includes('fragrances') && '👃'}
                        {cat.name.includes('furniture') && '🪑'}
                        {cat.name.includes('groceries') && '🛒'}
                        {cat.name.includes('home') && '🏠'}
                        {cat.name.includes('kitchen') && '🍳'}
                        {cat.name.includes('laptops') && '💻'}
                        {cat.name.includes('mens') && '👔'}
                        {cat.name.includes('womens') && '👗'}
                        {cat.name.includes('smartphones') && '📱'}
                        {cat.name.includes('mobile') && '📱'}
                        {cat.name.includes('skin') && '🧴'}
                        {cat.name.includes('sports') && '⚽'}
                        {cat.name.includes('sunglasses') && '🕶️'}
                        {(!cat.name.includes('beauty') && !cat.name.includes('fragrances') && 
                          !cat.name.includes('furniture') && !cat.name.includes('groceries') && 
                          !cat.name.includes('home') && !cat.name.includes('kitchen') && 
                          !cat.name.includes('laptops') && !cat.name.includes('mens') && 
                          !cat.name.includes('womens') && !cat.name.includes('smartphones') && 
                          !cat.name.includes('mobile') && !cat.name.includes('skin') && 
                          !cat.name.includes('sports') && !cat.name.includes('sunglasses')) && '📦'}
                      </span>
                    </div>
                    <div>
                      <span className={`text-sm font-medium capitalize ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>
                        {cat.name.replace(/-/g, ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {count}
                    </span>
                    {isSelected && (
                      <span className="text-blue-600">
                        <Icons.Check />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-2 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;