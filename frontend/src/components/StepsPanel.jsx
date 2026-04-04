import React from 'react';
import { LayoutList, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';

const StepsPanel = ({ title, steps, isWarning = false }) => {
  if (!steps || (isWarning && steps.length === 0)) return null;

  return (
    <div className={`glass-card p-6 border-${isWarning ? 'red' : 'indigo'}-400/10 h-full flex flex-col`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 bg-${isWarning ? 'red' : 'indigo'}-500/10 rounded-xl flex items-center justify-center border border-${isWarning ? 'red' : 'indigo'}-400/20`}>
          {isWarning ? <ShieldAlert className="w-5 h-5 text-red-400" /> : <LayoutList className="w-5 h-5 text-indigo-400" />}
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-[#94a3b8]">{title}</h2>
          <p className="text-[10px] text-gray-500 font-medium">{isWarning ? "Immediate Attention Required" : "Sequential Intelligence Feed"}</p>
        </div>
      </div>

      <div className="space-y-4 flex-grow">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4 group items-start animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all ${isWarning ? 'bg-red-400/10 border border-red-400/20 text-red-400' : 'bg-indigo-400/10 border border-indigo-400/20 text-indigo-400 group-hover:bg-indigo-400 group-hover:text-white group-hover:scale-110'}`}>
              <span className="text-[10px] font-black">{i + 1}</span>
            </div>
            <div className={`flex-grow p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all ${isWarning ? 'text-red-300' : 'text-gray-300 group-hover:text-white'}`}>
              <p className="text-sm font-medium leading-relaxed">{step}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsPanel;
