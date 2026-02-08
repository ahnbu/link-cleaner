
import React from 'react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="w-full flex justify-between items-center py-6">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11l-7-7-7 7m14 6l-7-7-7 7"></path>
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">
          Cleanse<span className="text-indigo-600">AI</span>
        </h1>
      </div>
      
      <button 
        onClick={onReset}
        className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        New Document
      </button>
    </header>
  );
};

export default Header;
