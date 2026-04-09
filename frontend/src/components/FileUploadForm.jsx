import React, { useState } from 'react';

const FileUploadForm = ({ onUpload, loading }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const extension = selectedFile.name.split('.').pop().toLowerCase();
      if (['pdf', 'docx'].includes(extension)) {
        setFile(selectedFile);
        setError('');
      } else {
        setFile(null);
        setError('Unsupported file type. Please upload a PDF or DOCX file.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('request_file', file);
    onUpload(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 transition-all duration-300">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl shadow-2xl hover:shadow-3xl transform transition hover:-translate-y-1">
        <label className="text-[17px] font-bold text-slate-900 tracking-tight text-center">
          Upload Your Resume
        </label>
        
        <div className="relative group">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-slate-100/70 hover:border-indigo-400 group-hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-2">
              <svg className="w-12 h-12 text-slate-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm font-semibold text-slate-700">
                {file ? <span className="text-indigo-600 truncate max-w-[250px] inline-block mb-1">{file.name}</span> : <span>Click to upload or drag and drop</span>}
              </p>
              <p className="text-xs text-slate-500 font-medium">SVG, PDF or DOCX (MAX. 5MB)</p>
            </div>
          </label>
        </div>

        {error && <p className="text-rose-600 text-xs font-bold text-center animate-pulse">{error}</p>}
        
        <button
          type="submit"
          disabled={loading || !file}
          className={`w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-95 ${
            loading || !file
              ? 'bg-slate-300 cursor-not-allowed text-slate-500'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-200/50 hover:shadow-xl'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            'Check Format'
          )}
        </button>
      </form>
    </div>
  );
};

export default FileUploadForm;
