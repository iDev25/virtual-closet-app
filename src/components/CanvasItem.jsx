import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { FaTimes } from 'react-icons/fa';

const CanvasItem = ({ item, updatePosition, removeItem }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'CLOTHING_ITEM',
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div
      ref={ref}
      className="canvas-item"
      style={{
        left: item.position.x,
        top: item.position.y,
        opacity: isDragging ? 0.5 : 1,
        zIndex: item.zIndex,
        width: '120px',
      }}
    >
      <div className="relative group">
        <button
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={() => removeItem(item.canvasId)}
        >
          <FaTimes size={12} />
        </button>
        
        <div className="bg-white p-1">
          <img
            src={item.src}
            alt={item.name}
            className="max-w-full object-contain"
            style={{ maxHeight: '120px' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/120?text=${encodeURIComponent(item.name)}`;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasItem;
