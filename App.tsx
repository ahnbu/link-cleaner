
import React, { useState, useCallback } from 'react';
import { CleansingConfig, ProcessingState } from './types';
import { cleanseText } from './services/geminiService';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import CleansingOptions from './components/CleansingOptions';
import MarkdownPreview from './components/MarkdownPreview';

const App: React.FC = () => {
  const [state, setState] = useState<ProcessingState>({
    isCleansing: false,
    error: null,
    cleansedContent: null,
    originalContent: null,
    fileName: null,
  });

  const [config, setConfig] = useState<CleansingConfig>({
    removeCitationLinks: true,
    removeFootnoteMarkers: true,
    simplifyFormatting: true,
    preserveHeaders: true,
    language: 'auto',
  });

  const handleFileUpload = (content: string, name: string) => {
    setState(prev => ({
      ...prev,
      originalContent: content,
      cleansedContent: null,
      fileName: name,
      error: null
    }));
  };

  const handleCleansing = async () => {
    if (!state.originalContent) return;

    setState(prev => ({ ...prev, isCleansing: true, error: null }));
    try {
      const result = await cleanseText(state.originalContent, config);
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

  const handleDownload = () => {
    if (!state.cleansedContent) return;
    const blob = new Blob([state.cleansedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleansed_${state.fileName || 'document.md'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!state.cleansedContent) return;
    navigator.clipboard.writeText(state.cleansedContent);
    alert('Copied to clipboard!');
  };

  const handleReset = () => {
    setState({
      isCleansing: false,
      error: null,
      cleansedContent: null,
      originalContent: null,
      fileName: null,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        <Header onReset={handleReset} />
        
        {!state.originalContent ? (
          <div className="mt-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Cleanse Your AI Output</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Upload text or markdown files to automatically remove Perplexity citations, 
                NotebookLM formatting noise, and redundant source links.
              </p>
            </div>
            <FileUploader onUpload={handleFileUpload} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column: Settings and Action */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <CleansingOptions config={config} onChange={setConfig} disabled={state.isCleansing} />
                
                <button
                  onClick={handleCleansing}
                  disabled={state.isCleansing}
                  className={`w-full mt-6 py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 ${
                    state.isCleansing 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                  }`}
                >
                  {state.isCleansing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Cleansing...
                    </span>
                  ) : 'Start Cleansing'}
                </button>
                
                {state.error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                    {state.error}
                  </div>
                )}
              </div>

              {state.cleansedContent && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Actions</h3>
                  <button 
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center space-x-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                    <span>Copy to Clipboard</span>
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-colors font-medium border border-indigo-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    <span>Download Markdown</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Previewer */}
            <div className="lg:col-span-2 space-y-4">
              <MarkdownPreview 
                title="Original Content"
                content={state.originalContent}
                isProcessed={false}
              />
              
              {state.cleansedContent && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <MarkdownPreview 
                    title="Cleansed Content"
                    content={state.cleansedContent}
                    isProcessed={true}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
