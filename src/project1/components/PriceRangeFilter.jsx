import React from "react";

const PriceRangeFilter = () => {
  return (
    <div>
      <input
        type="range"
        name="priceRange"
        min={0}
        max="100"
        value="40"
        readOnly={true}
        className="range range-primary"
      />
    </div>
  );
};

export default PriceRangeFilter;
