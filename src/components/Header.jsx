import React from 'react';
import { FaHanger } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaHanger className="text-primary-600 text-2xl" />
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-primary-600">Coheme</span> Virtual Closet
          </h1>
        </div>
        <div>
          <p className="text-sm text-gray-500">Demo Concept</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
