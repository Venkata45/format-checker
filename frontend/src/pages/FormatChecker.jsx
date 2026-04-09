import React, { useState } from 'react';
import FileUploadForm from '../components/FileUploadForm';
import ResultCard from '../components/ResultCard';
import ProgressBar from '../components/ProgressBar';
import IssueList from '../components/IssueList';
import { checkFormat } from '../services/api';

const FormatChecker = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (formData) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await checkFormat(formData);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong during analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/50 px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Format <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Checker Service</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
            Check the structure and ATS compatibility of your resume in seconds.
          </p>
        </header>

        <section className="mb-20">
          <FileUploadForm onUpload={handleUpload} loading={loading} />
          {error && (
            <div className="mt-8 p-5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-3 animate-bounce shadow-sm">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-bold text-sm tracking-wide uppercase">{error}</span>
            </div>
          )}
        </section>

        {result && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both">
            <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 ring-1 ring-slate-200/50 transform transition hover:shadow-3xl">
              <ProgressBar score={result.score} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <ResultCard 
                title="Detected Sections" 
                color="indigo"
                icon={<svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              >
                <IssueList issues={result.detected_sections} type="success" />
              </ResultCard>

              <ResultCard 
                title="Missing Sections" 
                color="rose"
                icon={<svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              >
                <IssueList issues={result.missing_sections} type="danger" />
              </ResultCard>

              <ResultCard 
                title="Formatting Issues" 
                color="amber"
                icon={<svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
              >
                <IssueList issues={result.format_issues} type="warning" />
              </ResultCard>

              <ResultCard 
                title="Suggestions" 
                color="emerald"
                icon={<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              >
                <IssueList issues={result.suggestions} type="info" />
              </ResultCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormatChecker;
