import React from 'react';

const ResultCard = ({ title, children, icon, color = 'blue' }) => {
  const colors = {
    blue: 'border-blue-200 bg-blue-50/50',
    emerald: 'border-emerald-200 bg-emerald-50/50',
    rose: 'border-rose-200 bg-rose-50/50',
    amber: 'border-amber-200 bg-amber-50/50',
    indigo: 'border-indigo-200 bg-indigo-50/50',
  };

  return (
    <div className={`p-4 rounded-xl shadow-lg border transition-all hover:shadow-xl ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-1.5 rounded-lg bg-white shadow-sm ring-1 ring-slate-200`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
      </div>
      <div className="text-sm font-medium text-slate-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default ResultCard;
