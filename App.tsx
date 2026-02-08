import React, { useState, useEffect } from 'react';
import { CleansingConfig, ProcessingState } from './types';
import { cleanseText } from './services/geminiService';
import { cleanseTextLocally } from './services/localCleansingService';
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

  const [useAI, setUseAI] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Default config
  const config: CleansingConfig = {
    removeCitationLinks: true,
    removeFootnoteMarkers: true,
    simplifyFormatting: true,
    preserveHeaders: true,
    language: 'auto',
    useAI: useAI,
  };

  const triggerCleansing = async (content: string) => {
    setState(prev => ({ ...prev, isCleansing: true, error: null }));
    try {
      let result;
      if (useAI) {
        result = await cleanseText(content, config);
      } else {
        // Fast local cleansing
        result = cleanseTextLocally(content, config);
        // Add a tiny delay for UX so it doesn't feel like nothing happened
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
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
    a.download = `${baseName}_정리.md`;
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
              <h2 className="text-3xl font-bold text-slate-100 mb-4">AI 문서 클렌징</h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                텍스트나 마크다운 파일을 업로드하면 Perplexity 인용 링크, 
                NotebookLM 형식 노이즈 및 중복된 출처 링크를 자동으로 제거합니다.
              </p>
            </div>
          )}
          
          {!state.originalContent && (
            <div className="flex flex-col items-center space-y-6">
              <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 shadow-inner">
                <button
                  onClick={() => setUseAI(false)}
                  className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                    !useAI 
                      ? 'bg-slate-700 text-white shadow-lg' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  ⚡ Fast (Local)
                </button>
                <button
                  onClick={() => setUseAI(true)}
                  className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                    useAI 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  🤖 Deep (AI)
                </button>
              </div>
              <FileUploader onUpload={handleFileUpload} />
            </div>
          )}

          {/* Loading State Overlay or Indicator */}
          {state.isCleansing && (
             <div className="w-full py-12 flex flex-col items-center justify-center bg-slate-900 rounded-3xl border border-slate-800 shadow-sm animate-pulse">
                <svg className="animate-spin h-10 w-10 text-indigo-500 mb-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-300 font-medium">
                  {useAI ? 'AI가 문서를 깊이 있게 정리하고 있습니다...' : '로컬에서 빠르게 문서를 정리하고 있습니다...'}
                </p>
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
              
              {/* Actions Toolbar - Floating Centered Buttons */}
              <div className="sticky top-6 z-20 w-full flex items-center justify-center space-x-3 pointer-events-none">
                  <div className="flex items-center space-x-3 pointer-events-auto">
                    <button 
                      onClick={handleCopy}
                      className={`w-40 flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-200 font-medium shadow-lg backdrop-blur-md ${
                        isCopied 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                          : 'bg-slate-800/90 text-slate-200 border border-slate-700 hover:bg-slate-700'
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
                           <span>복사</span>
                         </>
                      )}
                    </button>

                    <button 
                      onClick={handleDownload}
                      className="w-40 flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600/90 backdrop-blur-md text-white rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/40 font-medium border border-indigo-500/30"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      <span>다운로드</span>
                    </button>
                  </div>
              </div>

              {/* Cleansed Content - Now Primary */}
              <MarkdownPreview 
                title="정리된 내용"
                content={state.cleansedContent}
                isProcessed={true}
              />

              {/* Original Content - Now for Reference */}
              <MarkdownPreview 
                title="원본 내용"
                content={state.originalContent}
                isProcessed={false}
              />

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;