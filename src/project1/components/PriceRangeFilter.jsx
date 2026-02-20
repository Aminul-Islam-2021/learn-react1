import React, { useState, useEffect } from "react";

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onPriceChange,
  range,
}) => {
  const [localMin, setLocalMin] = useState(
    currentMin !== null ? currentMin : range?.min || 0
  );
  const [localMax, setLocalMax] = useState(
    currentMax !== null ? currentMax : range?.max || 1000
  );
  const [sliderValue, setSliderValue] = useState(
    currentMax !== null ? currentMax : range?.max || 1000
  );

  // Update local state when props change
  useEffect(() => {
    if (range) {
      setLocalMin(currentMin !== null ? currentMin : range.min);
      setLocalMax(currentMax !== null ? currentMax : range.max);
      setSliderValue(currentMax !== null ? currentMax : range.max);
    }
  }, [currentMin, currentMax, range]);

  // Handle slider change
  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setSliderValue(value);
    setLocalMax(value);
    onPriceChange({ min: localMin, max: value });
  };

  // Handle min input change
  const handleMinChange = (e) => {
    const value = e.target.value === "" ? null : Number(e.target.value);
    setLocalMin(value);

    if (value !== null && localMax !== null && value > localMax) {
      onPriceChange({ min: value, max: value });
    } else {
      onPriceChange({ min: value, max: localMax });
    }
  };

  // Handle max input change
  const handleMaxChange = (e) => {
    const value = e.target.value === "" ? null : Number(e.target.value);
    setLocalMax(value);
    setSliderValue(value !== null ? value : range?.max || 1000);

    if (value !== null && localMin !== null && value < localMin) {
      onPriceChange({ min: value, max: value });
    } else {
      onPriceChange({ min: localMin, max: value });
    }
  };

  // Handle blur to ensure values are within range
  const handleMinBlur = () => {
    if (localMin !== null && range) {
      if (localMin < range.min) {
        setLocalMin(range.min);
        onPriceChange({ min: range.min, max: localMax });
      } else if (localMin > range.max) {
        setLocalMin(range.max);
        onPriceChange({ min: range.max, max: localMax });
      }
    }
  };

  const handleMaxBlur = () => {
    if (localMax !== null && range) {
      if (localMax > range.max) {
        setLocalMax(range.max);
        setSliderValue(range.max);
        onPriceChange({ min: localMin, max: range.max });
      } else if (localMax < range.min) {
        setLocalMax(range.min);
        setSliderValue(range.min);
        onPriceChange({ min: localMin, max: range.min });
      }
    }
  };

  // If range is not available, don't render
  if (!range) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700">Price Range</h3>

      {/* Range Display */}
      <div className="flex items-center justify-between text-sm">
        <div className="bg-blue-50 px-3 py-1 rounded-full">
          <span className="text-blue-600 font-semibold">
            ${localMin !== null ? localMin : range.min}
          </span>
        </div>
        <span className="text-gray-400">→</span>
        <div className="bg-blue-50 px-3 py-1 rounded-full">
          <span className="text-blue-600 font-semibold">
            ${localMax !== null ? localMax : range.max}
          </span>
        </div>
      </div>

      {/* Range Slider */}
      <div className="space-y-2">
        <input
          type="range"
          min={range.min}
          max={range.max}
          value={sliderValue}
          onChange={handleSliderChange}
          step="1"
          className="range range-primary range-sm"
        />

        {/* Range Track Labels */}
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>${range.min}</span>
          <span>${range.max}</span>
        </div>
      </div>

      {/* Input Fields - Uncomment if needed */}
      {/* <div className="flex gap-3">
        <div className="flex-1">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              placeholder="Min price"
              value={localMin !== null ? localMin : ""}
              onChange={handleMinChange}
              onBlur={handleMinBlur}
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={range.min}
              max={range.max}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              placeholder="Max price"
              value={localMax !== null ? localMax : ""}
              onChange={handleMaxChange}
              onBlur={handleMaxBlur}
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={range.min}
              max={range.max}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PriceRangeFilter;