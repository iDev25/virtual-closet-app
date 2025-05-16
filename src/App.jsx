import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header';
import Closet from './components/Closet';
import Canvas from './components/Canvas';
import OutfitControls from './components/OutfitControls';
import ShareModal from './components/ShareModal';
import { v4 as uuidv4 } from 'uuid';

// Sample clothing items with relative paths
const initialItems = {
  tops: [
    { id: 'top1', type: 'tops', src: './src/assets/tops/top1.png', name: 'White T-Shirt' },
    { id: 'top2', type: 'tops', src: './src/assets/tops/top2.png', name: 'Black Blouse' },
    { id: 'top3', type: 'tops', src: './src/assets/tops/top3.png', name: 'Striped Shirt' },
    { id: 'top4', type: 'tops', src: './src/assets/tops/top4.png', name: 'Denim Jacket' },
  ],
  bottoms: [
    { id: 'bottom1', type: 'bottoms', src: './src/assets/bottoms/bottom1.png', name: 'Blue Jeans' },
    { id: 'bottom2', type: 'bottoms', src: './src/assets/bottoms/bottom2.png', name: 'Black Pants' },
    { id: 'bottom3', type: 'bottoms', src: './src/assets/bottoms/bottom3.png', name: 'Pleated Skirt' },
    { id: 'bottom4', type: 'bottoms', src: './src/assets/bottoms/bottom4.png', name: 'Shorts' },
  ],
  accessories: [
    { id: 'acc1', type: 'accessories', src: './src/assets/accessories/acc1.png', name: 'Gold Necklace' },
    { id: 'acc2', type: 'accessories', src: './src/assets/accessories/acc2.png', name: 'Sunglasses' },
    { id: 'acc3', type: 'accessories', src: './src/assets/accessories/acc3.png', name: 'Handbag' },
    { id: 'acc4', type: 'accessories', src: './src/assets/accessories/acc4.png', name: 'Hat' },
  ],
  shoes: [
    { id: 'shoe1', type: 'shoes', src: './src/assets/shoes/shoe1.png', name: 'Sneakers' },
    { id: 'shoe2', type: 'shoes', src: './src/assets/shoes/shoe2.png', name: 'Heels' },
    { id: 'shoe3', type: 'shoes', src: './src/assets/shoes/shoe3.png', name: 'Boots' },
    { id: 'shoe4', type: 'shoes', src: './src/assets/shoes/shoe4.png', name: 'Sandals' },
  ],
};

function App() {
  const [items, setItems] = useState(initialItems);
  const [canvasItems, setCanvasItems] = useState([]);
  const [currentOutfit, setCurrentOutfit] = useState(null);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const addToCanvas = (item) => {
    const canvasItem = {
      ...item,
      canvasId: uuidv4(),
      position: {
        x: Math.random() * 300 + 50,
        y: Math.random() * 300 + 50,
      },
      zIndex: canvasItems.length + 1,
    };
    setCanvasItems([...canvasItems, canvasItem]);
  };

  const updateCanvasItemPosition = (id, position) => {
    setCanvasItems(
      canvasItems.map((item) =>
        item.canvasId === id ? { ...item, position } : item
      )
    );
  };

  const removeFromCanvas = (id) => {
    setCanvasItems(canvasItems.filter((item) => item.canvasId !== id));
  };

  const clearCanvas = () => {
    setCanvasItems([]);
    setCurrentOutfit(null);
  };

  const saveOutfit = () => {
    if (canvasItems.length === 0) return;
    
    const outfit = {
      id: currentOutfit ? currentOutfit.id : uuidv4(),
      name: `Outfit ${savedOutfits.length + 1}`,
      items: [...canvasItems],
      createdAt: new Date().toISOString(),
    };
    
    if (currentOutfit) {
      setSavedOutfits(
        savedOutfits.map((o) => (o.id === outfit.id ? outfit : o))
      );
    } else {
      setSavedOutfits([...savedOutfits, outfit]);
    }
    
    setCurrentOutfit(outfit);
  };

  const loadOutfit = (outfit) => {
    setCanvasItems(outfit.items);
    setCurrentOutfit(outfit);
  };

  const shareOutfit = () => {
    // In a real app, this would generate a real shareable link
    // For demo purposes, we'll just create a mock link
    saveOutfit();
    const mockShareLink = `https://coheme.com/outfit/${currentOutfit ? currentOutfit.id : uuidv4()}`;
    setShareLink(mockShareLink);
    setShowShareModal(true);
  };

  const handleFileUpload = (e, category) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newItem = {
        id: `${category}${items[category].length + 1}`,
        type: category,
        src: event.target.result,
        name: file.name.split('.')[0],
      };
      
      setItems({
        ...items,
        [category]: [...items[category], newItem],
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex flex-col md:flex-row p-4 gap-4">
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4">
            <Closet 
              items={items} 
              onItemClick={addToCanvas} 
              onFileUpload={handleFileUpload}
            />
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow-md p-4 flex-grow">
              <Canvas 
                items={canvasItems} 
                updatePosition={updateCanvasItemPosition} 
                removeItem={removeFromCanvas}
              />
            </div>
            
            <OutfitControls 
              outfits={savedOutfits}
              currentOutfit={currentOutfit}
              onSave={saveOutfit}
              onLoad={loadOutfit}
              onClear={clearCanvas}
              onShare={shareOutfit}
            />
          </div>
        </main>
        
        {showShareModal && (
          <ShareModal 
            link={shareLink} 
            onClose={() => setShowShareModal(false)} 
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
