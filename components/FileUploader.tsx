import React, { useRef, useState } from 'react';

interface FileUploaderProps {
  onUpload: (content: string, fileName: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const text = await file.text();
    onUpload(text, file.name);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    const text = await file.text();
    onUpload(text, file.name);
  };

  return (
    <div 
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        w-full aspect-video md:aspect-[2.5/1] rounded-3xl border-2 border-dashed 
        flex flex-col items-center justify-center cursor-pointer transition-all
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]' 
          : 'border-slate-700 bg-slate-900/50 hover:border-indigo-500 hover:bg-slate-800/50'
        }
      `}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".txt,.md"
      />
      
      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
      </div>
      
      <p className="text-lg font-medium text-slate-300">클릭하여 업로드하거나 파일을 여기로 끌어다 놓으세요</p>
      <p className="text-sm text-slate-500 mt-2">.txt, .md 파일을 지원합니다</p>
    </div>
  );
};

export default FileUploader;