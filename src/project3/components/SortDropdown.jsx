import React from 'react';

const Icons = {
  ChevronDown: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
};

const SortDropdown = ({ currentSort, onSortChange }) => {
  const getDisplayName = () => {
    switch(currentSort) {
      case 'price-asc': return 'Price: Low to High';
      case 'price-desc': return 'Price: High to Low';
      case 'rating-desc': return 'Top Rated';
      default: return 'Sort by';
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-sm bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-normal flex items-center gap-2 hover:bg-gray-50"
      >
        {getDisplayName()}
        <Icons.ChevronDown />
      </div>
      <ul tabIndex={-1} className="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-lg border border-gray-200">
        <li>
          <a 
            className={`${currentSort === 'default' ? 'active bg-blue-50 text-blue-600' : ''}`}
            onClick={() => onSortChange('default')}
          >
            Default
          </a>
        </li>
        <li>
          <a 
            className={`${currentSort === 'price-asc' ? 'active bg-blue-50 text-blue-600' : ''}`}
            onClick={() => onSortChange('price-asc')}
          >
            Price: Low to High
          </a>
        </li>
        <li>
          <a 
            className={`${currentSort === 'price-desc' ? 'active bg-blue-50 text-blue-600' : ''}`}
            onClick={() => onSortChange('price-desc')}
          >
            Price: High to Low
          </a>
        </li>
        <li>
          <a 
            className={`${currentSort === 'rating-desc' ? 'active bg-blue-50 text-blue-600' : ''}`}
            onClick={() => onSortChange('rating-desc')}
          >
            Top Rated
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SortDropdown;