
import React from 'react';
import { CleansingConfig } from '../types';

interface CleansingOptionsProps {
  config: CleansingConfig;
  onChange: (config: CleansingConfig) => void;
  disabled: boolean;
}

const CleansingOptions: React.FC<CleansingOptionsProps> = ({ config, onChange, disabled }) => {
  const toggle = (key: keyof CleansingConfig) => {
    if (disabled) return;
    onChange({ ...config, [key]: !config[key] });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Cleansing Filters</h3>
      
      <label className={`flex items-start space-x-3 cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="relative flex items-center pt-0.5">
          <input 
            type="checkbox" 
            checked={config.removeCitationLinks}
            onChange={() => toggle('removeCitationLinks')}
            disabled={disabled}
            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
        </div>
        <div>
          <span className="text-slate-700 font-medium text-sm group-hover:text-indigo-600 transition-colors">Remove Citation Links</span>
          <p className="text-xs text-slate-400">Removes [title](url) from Perplexity/Bing</p>
        </div>
      </label>

      <label className={`flex items-start space-x-3 cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="relative flex items-center pt-0.5">
          <input 
            type="checkbox" 
            checked={config.removeFootnoteMarkers}
            onChange={() => toggle('removeFootnoteMarkers')}
            disabled={disabled}
            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
        </div>
        <div>
          <span className="text-slate-700 font-medium text-sm group-hover:text-indigo-600 transition-colors">Remove Footnote Markers</span>
          <p className="text-xs text-slate-400">Removes [1], [2] from exports</p>
        </div>
      </label>

      <label className={`flex items-start space-x-3 cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="relative flex items-center pt-0.5">
          <input 
            type="checkbox" 
            checked={config.simplifyFormatting}
            onChange={() => toggle('simplifyFormatting')}
            disabled={disabled}
            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
        </div>
        <div>
          <span className="text-slate-700 font-medium text-sm group-hover:text-indigo-600 transition-colors">Clean Decorative Symbols</span>
          <p className="text-xs text-slate-400">Removes ⭐ and excessive markdown noise</p>
        </div>
      </label>

      <label className={`flex items-start space-x-3 cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="relative flex items-center pt-0.5">
          <input 
            type="checkbox" 
            checked={config.preserveHeaders}
            onChange={() => toggle('preserveHeaders')}
            disabled={disabled}
            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
        </div>
        <div>
          <span className="text-slate-700 font-medium text-sm group-hover:text-indigo-600 transition-colors">Preserve Headers</span>
          <p className="text-xs text-slate-400">Keep # and ## structure intact</p>
        </div>
      </label>
    </div>
  );
};

export default CleansingOptions;
