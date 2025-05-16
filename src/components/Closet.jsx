import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ClothingItem from './ClothingItem';

const categories = [
  { id: 'tops', label: 'Tops' },
  { id: 'bottoms', label: 'Bottoms' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'shoes', label: 'Shoes' },
];

const Closet = ({ items, onItemClick, onFileUpload }) => {
  const [activeCategory, setActiveCategory] = useState('tops');

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">My Closet</h2>
      
      <div className="flex border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      <div className="flex-grow overflow-y-auto p-2">
        <div className="grid grid-cols-2 gap-4 mt-4">
          {items[activeCategory].map((item) => (
            <ClothingItem
              key={item.id}
              item={item}
              onClick={() => onItemClick(item)}
            />
          ))}
          
          <label className="closet-item flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-40 cursor-pointer">
            <div className="flex flex-col items-center text-gray-500">
              <FaPlus className="text-2xl mb-2" />
              <span>Add Item</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFileUpload(e, activeCategory)}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Closet;
