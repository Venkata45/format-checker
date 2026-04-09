import React from 'react';

const ProgressBar = ({ score }) => {
  const getColor = (s) => {
    if (s >= 80) return 'bg-emerald-500';
    if (s >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-700">ATS Compatibility Score</span>
        <span className="text-lg font-bold text-slate-900">{score}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className={`h-full transition-all duration-700 ease-out ${getColor(score)} h-4 rounded-full shadow-md`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
