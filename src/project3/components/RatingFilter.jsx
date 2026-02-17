import React from 'react';

const RatingFilter = ({ minRating, onRatingChange, maxAvailableRating = 5 }) => {
  const availableStars = [1, 2, 3, 4, 5].filter(r => r <= maxAvailableRating);

  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">Rating</p>
      <div className="rating rating-md">
        {availableStars.map((rating) => (
          <input
            key={rating}
            type="radio"
            name="rating-filter"
            className="mask mask-star-2 bg-green-500"
            aria-label={`${rating} star`}
            checked={minRating === rating}
            onChange={() => onRatingChange(minRating === rating ? 0 : rating)}
          />
        ))}
      </div>
      
      {maxAvailableRating < 5 && (
        <div className="text-xs text-gray-500 mt-1">
          Up to {maxAvailableRating}+ stars available
        </div>
      )}

      {minRating > 0 && (
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-blue-500">{minRating}+ Stars selected</span>
          <button
            onClick={() => onRatingChange(0)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default RatingFilter;