import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ value, onChange, suggestions, onSelectSuggestion }) => {
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
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search products..."
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((product) => (
            <li
              key={product.id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                onSelectSuggestion(product);
                setShowSuggestions(false);
              }}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <div className="font-medium">{product.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    ${product.price}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;