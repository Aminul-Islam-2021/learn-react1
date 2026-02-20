import React from 'react';

const RatingFilter = ({ minRating, onRatingChange, maxAvailableRating = 5 }) => {
  const availableStars = [1, 2, 3, 4, 5].filter(r => r <= maxAvailableRating);

  return (
    <div>
      <h3 className="font-medium mb-2">Rating</h3>
      <div className="rating rating-md">
        {availableStars.map((rating) => {
          // Generate a unique ID for each radio
          const radioId = `rating-${rating}-${minRating}`;
          
          return (
            <React.Fragment key={rating}>
              <input
                type="radio"
                name="rating-filter"
                id={radioId}
                className="mask mask-star-2 bg-warning"
                aria-label={`${rating} star`}
                checked={minRating === rating}
                onChange={() => onRatingChange(minRating === rating ? 0 : rating)}
              />
              {/* DaisyUI rating works with labels, so add an invisible label */}
              <label htmlFor={radioId} className="hidden"></label>
            </React.Fragment>
          );
        })}
      </div>
      
      {maxAvailableRating < 5 && (
        <div className="text-xs opacity-70 mt-1">
          Up to {maxAvailableRating}+ stars available
        </div>
      )}

      {minRating > 0 && (
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-primary">{minRating}+ Stars selected</span>
          <button
            onClick={() => onRatingChange(0)}
            className="btn btn-xs btn-ghost"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default RatingFilter;