import React from 'react';
import { Icons } from './Icons';

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-white shadow-sm hover:shadow-md transition-shadow">
      <figure className="aspect-square overflow-hidden bg-base-200">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-120 transition-transform duration-400"
        />
      </figure>
      <div className="card-body p-2">
        <h3 className="card-title text-sm line-clamp-1">{product.title}</h3>
        <p className="text-xs opacity-70 line-clamp-1">{product.description?.slice(0, 30)}</p>
        <div className="flex justify-between items-center mt-1">
          <span className="text-lg font-bold">${product.price}</span>
          <div className="flex items-center gap-1">
            <Icons.Star filled={true} />
            <span className="text-sm">{product.rating}</span>
          </div>
        </div>
        <button className="btn bg-blue-500 font-semibold text-lg text-white mt-1 w-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;