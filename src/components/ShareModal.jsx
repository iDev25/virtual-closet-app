import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

const ShareModal = ({ link, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Share Your Outfit</h2>
        
        <p className="text-gray-600 mb-4">
          Share this link with friends to show off your outfit creation!
        </p>
        
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={copyToClipboard}
            className="bg-primary-600 text-white p-2 rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
