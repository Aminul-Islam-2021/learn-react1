import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                    hover:shadow-lg transition-all duration-300 overflow-hidden
                    border border-gray-200 dark:border-gray-700">
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.rating})
          </span>
        </div>
        
        {/* Price and Discount */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          {product.discountPercentage && (
            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 
                           text-green-700 dark:text-green-300 rounded-full">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 
                         text-white font-medium rounded-lg 
                         transition-colors duration-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:ring-offset-2 dark:focus:ring-offset-gray-800">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;