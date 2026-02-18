import React from "react";

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-2 space-y-2">
          <h3 className="text-xs font-semibold line-clamp-1">
            {product.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1">
            {product.description.slice(0, 20)}
          </p>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold">${product.price}</span>
            <span className="flex items-center gap-0.5">
              {/* <Icons.Star filled={true} /> */}
              {product.rating}
            </span>
          </div>
          <button className="w-full mt-1 px-2 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
