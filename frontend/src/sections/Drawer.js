import React from 'react';

function Drawer({ onClose, content }) {
  return (
    <div className="fixed inset-0 flex z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-green-50 w-full max-w-md sm:max-w-lg lg:max-w-xl h-full shadow-xl p-6 overflow-auto rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-green-600 hover:text-green-800"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-green-700 mb-6">Settings and Privacy</h2>
        
        {content}
      </div>
    </div>
  );
}

export default Drawer;
