import React from 'react';
import { useDrag } from 'react-dnd';

const ClothingItem = ({ item, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CLOTHING_ITEM',
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="closet-item bg-white"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={onClick}
    >
      <div className="h-40 bg-gray-50 flex items-center justify-center p-2">
        <img
          src={item.src}
          alt={item.name}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`;
          }}
        />
      </div>
      <div className="p-2 text-sm truncate">{item.name}</div>
    </div>
  );
};

export default ClothingItem;
