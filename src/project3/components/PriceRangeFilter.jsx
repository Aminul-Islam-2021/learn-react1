import React from 'react';

const PriceRangeFilter = ({ minPrice, maxPrice, currentMin, currentMax, onPriceChange, range }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">Price Range</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Min: ${range.min}</span>
        <span>Max: ${range.max}</span>
      </div>
      <input
        type="range"
        min={range.min}
        max={range.max}
        value={currentMax || range.max}
        onChange={(e) => onPriceChange({ min: currentMin, max: Number(e.target.value) })}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min"
          value={currentMin || ""}
          onChange={(e) => onPriceChange({ min: e.target.value ? Number(e.target.value) : null, max: currentMax })}
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded bg-white"
          min={range.min}
          max={range.max}
        />
        <input
          type="number"
          placeholder="Max"
          value={currentMax || ""}
          onChange={(e) => onPriceChange({ min: currentMin, max: e.target.value ? Number(e.target.value) : null })}
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded bg-white"
          min={range.min}
          max={range.max}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;