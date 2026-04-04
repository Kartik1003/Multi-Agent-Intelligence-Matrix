import React from 'react';
import { Calendar, MapPin, Clock, Info, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';

/**
 * ItineraryPanel
 * Human-readable travel guidance component.
 * Features a vertical timeline UI for day-wise planning and an insights box for strategic choices.
 */
const ItineraryPanel = ({ data }) => {
  if (!data || !data.itinerary) return null;

  const { itinerary, explanations, summary } = data;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Day-Wise Timeline */}
      <div className="glass-card p-6 border-indigo-400/10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-400/20">
            <Calendar className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-[#94a3b8]">Guidance Itinerary</h2>
            <p className="text-[10px] text-gray-500 font-medium">Strategic Timeline Allocation</p>
          </div>
        </div>

        <div className="relative pl-8 space-y-12 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-indigo-500/20">
          {itinerary.map((dayText, i) => {
            const [dayTitle, ...daySteps] = dayText.split('\n- ');
            return (
              <div key={i} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[2.15rem] top-1.5 w-7 h-7 rounded-full bg-[#0f172a] border-2 border-indigo-400/30 flex items-center justify-center p-1 group-hover:scale-125 transition-transform">
                  <div className="w-full h-full rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <span className="text-[10px] font-black text-indigo-400">{i + 1}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-white italic flex items-center gap-2 tracking-wide">
                    {dayTitle}
                    <div className="w-1 h-1 rounded-full bg-indigo-500/30"></div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase not-italic">Segment Active</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {daySteps.map((step, si) => (
                      <div 
                        key={si} 
                        className={`p-4 rounded-xl text-xs font-medium leading-relaxed transition-all duration-300 border ${
                          step.includes('ALERT') 
                          ? 'bg-rose-500/5 text-rose-300 border-rose-500/20' 
                          : 'bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-white/10 text-gray-300 hover:text-white'
                        }`}
                      >
                        <div className="flex gap-3">
                           {step.includes('ALERT') ? <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-40" />}
                           <span>{step.replace('ALERT: ', '')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Strategic Insights / Explanations */}
      <div className="glass-card p-6 border-sky-400/10 overflow-hidden relative group">
        {/* Decorative Flare */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full"></div>

        <div className="flex items-center gap-3 mb-6 relative">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-400/20">
            <Sparkles className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-[#94a3b8]">Strategic Insights</h2>
            <p className="text-[10px] text-gray-500 font-medium">Why these choices were made</p>
          </div>
        </div>

        <div className="space-y-4 relative">
          {explanations.map((exp, i) => {
            const [title, detail] = exp.split(': ');
            return (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-sky-500/5 border border-sky-500/10 hover:border-sky-500/20 transition-all">
                <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-sky-400/80">{title}</p>
                  <p className="text-xs text-sky-100/70 leading-relaxed font-medium">{detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Executive Brief</p>
            <p className="text-sm font-black text-white italic leading-tight">"{summary}"</p>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPanel;
