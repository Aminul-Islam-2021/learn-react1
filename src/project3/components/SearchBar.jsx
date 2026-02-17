import React, { useState, useRef, useEffect } from 'react';

const Icons = {
  Search: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
};

const SearchBar = ({ value, onChange, suggestions = [], onSuggestionClick }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
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
              onClick={() => {
                onSuggestionClick(product);
                setShowSuggestions(false);
              }}
            >
              <img src={product.thumbnail} alt={product.title} className="w-8 h-8 rounded object-cover" />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">{product.title}</div>
                <div className="text-xs text-gray-500">${product.price}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;