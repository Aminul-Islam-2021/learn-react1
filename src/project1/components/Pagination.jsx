import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        // onClick={() => onPageChange(currentPage - 1)}
        // disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-sm"
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {/* {getPageNumbers().map((pageNum, i) => (
          <button
            key={i}
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 rounded-lg transition-colors text-sm ${
              currentPage === pageNum
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 border border-gray-300"
            }`}
          >
            {pageNum}
          </button>
        ))} */}

        <button
          className="w-10 h-10 rounded-lg transition-colors text-sm"
          // key={i}
          // onClick={() => onPageChange(pageNum)}
          // className={`w-10 h-10 rounded-lg transition-colors text-sm ${
          //   currentPage === pageNum
          //     ? "bg-blue-600 text-white"
          //     : "hover:bg-gray-100 border border-gray-300"
          // }`}
        >
          4
        </button>
      </div>

      <button
        // onClick={() => onPageChange(currentPage + 1)}
        // disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-sm"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
