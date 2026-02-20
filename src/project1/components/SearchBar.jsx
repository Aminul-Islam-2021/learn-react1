import React, { useState, useRef, useEffect } from "react";
import { Icons } from "./Icons";

const SearchBar = ({
  value,
  onChange,
  suggestions = [],
  onSuggestionClick,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (product) => {
    onSuggestionClick(product);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full " ref={wrapperRef}>
      {/* Search Input */}
      <label className="input input-bordered flex items-center gap-2 bg-white outline-none border-2 border-blue-400">
        <Icons.Search />
        <input
          type="text"
          className="grow"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search products..."
        />
        {value && (
          <button
            onClick={() => {
              onChange("");
              setShowSuggestions(false);
            }}
            className="btn btn-ghost btn-xs btn-circle"
          >
            ✕
          </button>
        )}
      </label>

      {/* Suggestions Dropdown - Vertical List */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
          {/* Show only first 6 suggestions */}
          {suggestions.slice(0, 6).map((product) => (
            <li
              key={product.id}
              className="border-b border-gray-100 last:border-b-0"
            >
              <button
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                onClick={() => handleSuggestionClick(product)}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{product.title}</div>
                  <div className="text-sm text-gray-500">${product.price}</div>
                </div>
              </button>
            </li>
          ))}

          {/* Show "View all results" if more than 6 */}
          {suggestions.length > 6 && (
            <li className="p-2 text-center">
              <button className="text-xs text-blue-500 hover:text-blue-700">
                View all {suggestions.length} results
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
