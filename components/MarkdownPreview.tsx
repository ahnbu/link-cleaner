import React from 'react';

interface MarkdownPreviewProps {
  title: string;
  content: string | null;
  isProcessed: boolean;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ title, content, isProcessed }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden">
      <div className={`px-5 py-3 border-b border-slate-800 flex items-center justify-between ${isProcessed ? 'bg-green-900/20' : 'bg-slate-800/50'}`}>
        <h3 className="text-sm font-bold text-slate-200">{title}</h3>
        {isProcessed && (
          <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
            정리됨
          </span>
        )}
      </div>
      <div className="p-4 flex-1">
        <textarea
          readOnly
          value={content || ''}
          placeholder="문서 내용이 여기에 표시됩니다..."
          className="w-full h-64 lg:h-[300px] bg-transparent resize-none text-slate-300 font-mono text-sm focus:outline-none scrollbar-thin"
        />
      </div>
    </div>
  );
};

export default MarkdownPreview;