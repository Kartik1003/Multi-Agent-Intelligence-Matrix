import React from 'react';
import { Bed, MapPin, Search, Sparkles, Building, Briefcase, Info } from 'lucide-react';

/**
 * StayCard
 * Displays accommodation planning and mission relay points.
 */
const StayCard = ({ stays }) => {
  if (!stays || stays.length === 0) {
    return (
      <div className="glass-card p-8 text-center text-gray-500 italic opacity-40">
        No overnight stay required (single day mission).
      </div>
    );
  }

  return (
    <div className="glass-card p-6 border-sky-400/10 h-full flex flex-col group overflow-hidden relative">
      {/* Background flare */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[50px] pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 relative">
        <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-400/20">
          <Bed className="w-5 h-5 text-sky-400" />
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-[#94a3b8]">Stay Recommendations</h2>
          <p className="text-[10px] text-gray-500 font-medium">Overnight Intelligence Sync</p>
        </div>
      </div>

      <div className="space-y-4">
        {stays.map((stay, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-sky-500/20 transition-all duration-300 relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400" />
                <h3 className="text-base font-black text-white italic">{stay.city}</h3>
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-sky-400">
                {stay.type}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-sky-500/5 p-4 rounded-xl border border-sky-500/10 mb-4 opacity-80">
              <Info className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-sky-100/70 leading-relaxed italic">
                "{stay.reason}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-black/20 rounded-xl border border-white/5 text-center">
                 <Building className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1.5" />
                 <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400 underline decoration-sky-500/50">View Hotels</span>
              </div>
              <div className="p-3 bg-black/20 rounded-xl border border-white/5 text-center">
                <Briefcase className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1.5" />
                <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400 underline decoration-sky-500/50">Office Space</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestion Footer */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-gray-500 text-[10px] font-bold italic">
         <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-500/50" />
            <span>Automated based on transit window.</span>
         </div>
         <button className="text-sky-400 not-italic hover:underline underline-offset-4 tracking-widest">Manual Override</button>
      </div>
    </div>
  );
};

export default StayCard;
