import React from 'react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="w-full flex justify-between items-center py-6">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11l-7-7-7 7m14 6l-7-7-7 7"></path>
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-100">
          Link <span className="text-indigo-500">Cleaner</span>
        </h1>
      </div>
      
      <button 
        onClick={onReset}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 hover:border-slate-700 hover:text-indigo-400 transition-all duration-200 shadow-sm active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>새 문서</span>
      </button>
    </header>
  );
};

export default Header;
