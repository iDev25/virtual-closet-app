import React, { useState } from 'react';
import { FaSave, FaTrash, FaShare } from 'react-icons/fa';

const OutfitControls = ({ outfits, currentOutfit, onSave, onLoad, onClear, onShare }) => {
  const [showOutfits, setShowOutfits] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex gap-2">
          <button 
            className="btn btn-primary flex items-center gap-1"
            onClick={onSave}
          >
            <FaSave />
            <span>Save Outfit</span>
          </button>
          
          <button 
            className="btn btn-outline flex items-center gap-1"
            onClick={onShare}
          >
            <FaShare />
            <span>Share</span>
          </button>
          
          <button 
            className="btn btn-secondary flex items-center gap-1"
            onClick={onClear}
          >
            <FaTrash />
            <span>Clear</span>
          </button>
        </div>
        
        <div>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowOutfits(!showOutfits)}
          >
            {showOutfits ? 'Hide Saved Outfits' : 'Show Saved Outfits'}
          </button>
        </div>
      </div>
      
      {showOutfits && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Saved Outfits</h3>
          
          {outfits.length === 0 ? (
            <p className="text-gray-500">No saved outfits yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {outfits.map((outfit) => (
                <div 
                  key={outfit.id} 
                  className={`p-2 rounded cursor-pointer border ${
                    currentOutfit && currentOutfit.id === outfit.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => onLoad(outfit)}
                >
                  <div className="text-sm font-medium truncate">{outfit.name}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(outfit.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OutfitControls;
