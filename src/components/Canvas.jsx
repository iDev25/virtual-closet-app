import React from 'react';
import { useDrop } from 'react-dnd';
import CanvasItem from './CanvasItem';

const Canvas = ({ items, updatePosition, removeItem }) => {
  const [, drop] = useDrop({
    accept: 'CLOTHING_ITEM',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta && item.canvasId) {
        const x = Math.round(item.position.x + delta.x);
        const y = Math.round(item.position.y + delta.y);
        updatePosition(item.canvasId, { x, y });
      }
    },
  });

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Outfit Canvas</h2>
      
      <div
        ref={drop}
        className="flex-grow relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
        style={{ minHeight: '500px' }}
      >
        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Drag items here or click items in your closet to add them
          </div>
        )}
        
        {items.map((item) => (
          <CanvasItem
            key={item.canvasId}
            item={item}
            updatePosition={updatePosition}
            removeItem={removeItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
