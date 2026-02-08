import React, { useState, useEffect } from 'react';
import { CleansingConfig, ProcessingState } from './types';
import { cleanseText } from './services/geminiService';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import MarkdownPreview from './components/MarkdownPreview';

const App: React.FC = () => {
  const [state, setState] = useState<ProcessingState>({
    isCleansing: false,
    error: null,
    cleansedContent: null,
    originalContent: null,
    fileName: null,
  });

  const [isCopied, setIsCopied] = useState(false);

  // Default config without UI control
  const config: CleansingConfig = {
    removeCitationLinks: true,
    removeFootnoteMarkers: true,
    simplifyFormatting: true,
    preserveHeaders: true,
    language: 'auto',
  };

  const triggerCleansing = async (content: string) => {
    setState(prev => ({ ...prev, isCleansing: true, error: null }));
    try {
      const result = await cleanseText(content, config);
      setState(prev => ({
        ...prev,
        cleansedContent: result,
        isCleansing: false
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isCleansing: false,
        error: err.message
      }));
    }
  };

  const handleFileUpload = (content: string, name: string) => {
    setState(prev => ({
      ...prev,
      originalContent: content,
      cleansedContent: null,
      fileName: name,
      error: null
    }));
    triggerCleansing(content);
  };

  const handleDownload = () => {
    if (!state.cleansedContent) return;
    const blob = new Blob([state.cleansedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // Enforce .md extension
    const baseName = state.fileName ? state.fileName.replace(/\.[^/.]+$/, "") : 'document';
    a.download = `cleansed_${baseName}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!state.cleansedContent) return;
    navigator.clipboard.writeText(state.cleansedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setState({
      isCleansing: false,
      error: null,
      cleansedContent: null,
      originalContent: null,
      fileName: null,
    });
    setIsCopied(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        <Header onReset={handleReset} />
        
        <div className="flex flex-col space-y-8 mt-12">
          {!state.originalContent && (
             <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">AI 문서 클렌징</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                텍스트나 마크다운 파일을 업로드하면 Perplexity 인용 링크, 
                NotebookLM 형식 노이즈 및 중복된 출처 링크를 자동으로 제거합니다.
              </p>
            </div>
          )}
          
          {!state.originalContent && (
            <FileUploader onUpload={handleFileUpload} />
          )}

          {/* Loading State Overlay or Indicator */}
          {state.isCleansing && (
             <div className="w-full py-12 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 shadow-sm animate-pulse">
                <svg className="animate-spin h-10 w-10 text-indigo-600 mb-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-600 font-medium">AI가 문서를 깨끗하게 정리하고 있습니다...</p>
             </div>
          )}

          {state.error && (
             <div className="w-full p-4 bg-red-50 text-red-600 rounded-xl text-center border border-red-100">
               {state.error}
               <button onClick={handleReset} className="ml-4 text-sm underline hover:text-red-800">다시 시도</button>
             </div>
          )}

          {/* 2. Results Area (Vertical Layout) */}
          {!state.isCleansing && state.originalContent && state.cleansedContent && (
            <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
              
              {/* Original */}
              <MarkdownPreview 
                title="원본 내용"
                content={state.originalContent}
                isProcessed={false}
              />
              
              {/* Cleansed */}
              <MarkdownPreview 
                title="정리된 내용"
                content={state.cleansedContent}
                isProcessed={true}
              />

              {/* Actions Toolbar */}
              <div className="sticky bottom-8 z-10 mx-auto w-full max-w-2xl bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/60 flex items-center justify-between space-x-2">
                 <button 
                    onClick={handleReset}
                    className="px-6 py-3 text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors"
                  >
                    새로 시작하기
                  </button>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={handleCopy}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                        isCopied 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {isCopied ? (
                         <>
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                           <span>복사 완료!</span>
                         </>
                      ) : (
                         <>
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                           <span>클립보드 복사</span>
                         </>
                      )}
                    </button>
                    <button 
                      onClick={handleDownload}
                      className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      <span>.md 다운로드</span>
                    </button>
                  </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;