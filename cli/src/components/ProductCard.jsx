import React from 'react';

const ProductCard = ({ product, onSelect, onRemove, isSelected }) => {
  return (
    <div className='border p-4 rounded-md shadow-sm'>
      <img
        src={product.thumbnail}
        alt={product.name}
        className='w-full h-32 object-cover mb-4'
      />
      <h3 className='text-lg font-semibold'>{product.name}</h3>
      <p className='text-sm text-gray-500'>{product.description}</p>
      <p className='text-lg font-bold'>${product.price.toFixed(2)}</p>

      <button
        onClick={onSelect}
        className={`mt-2 px-4 py-2 text-white rounded-md ${
          isSelected ? 'bg-red-500' : 'bg-blue-500'
        }`}
      >
        {isSelected ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
