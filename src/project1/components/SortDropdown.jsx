import React from 'react';
import { Icons } from './Icons';

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
      <div tabIndex={0} role="button" className="btn btn-outline btn-sm gap-2">
        {getDisplayName()}
        <Icons.ChevronDown />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-lg border border-base-300">
        <li>
          <a className={currentSort === 'default' ? 'active' : ''} onClick={() => onSortChange('default')}>
            Default
          </a>
        </li>
        <li>
          <a className={currentSort === 'price-asc' ? 'active' : ''} onClick={() => onSortChange('price-asc')}>
            Price: Low to High
          </a>
        </li>
        <li>
          <a className={currentSort === 'price-desc' ? 'active' : ''} onClick={() => onSortChange('price-desc')}>
            Price: High to Low
          </a>
        </li>
        <li>
          <a className={currentSort === 'rating-desc' ? 'active' : ''} onClick={() => onSortChange('rating-desc')}>
            Top Rated
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SortDropdown;