import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-gray-100 dark:hover:bg-gray-700 
                 transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Previous page"
      >
        Previous
      </button>
      
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`min-w-[40px] h-10 rounded-lg transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${page === currentPage
                        ? 'bg-blue-500 text-white'
                        : page === '...'
                        ? 'cursor-default'
                        : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={typeof page === 'number' ? `Page ${page}` : 'More pages'}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-gray-100 dark:hover:bg-gray-700 
                 transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;