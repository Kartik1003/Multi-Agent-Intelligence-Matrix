import React from 'react';
import { Map, MapPin, Navigation, Info, Compass } from 'lucide-react';

const MapView = ({ source, destination, route }) => {
  return (
    <div className="glass-card overflow-hidden h-[400px] relative group border-indigo-400/10 shadow-2xl shadow-indigo-500/10">
      {/* Visual Background Pattern */}
      <div className="absolute inset-0 bg-[#1e293b] opacity-50"></div>
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-1 opacity-20 group-hover:opacity-30 transition-opacity">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="border border-white/5 w-full h-full"></div>
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 p-12">
        <div className="relative w-full max-w-lg aspect-video flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center animate-pulse">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">{source}</div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-500/10 border-2 border-indigo-500 flex items-center justify-center">
            <Compass className="w-4 h-4 text-indigo-400" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">{destination}</div>
          </div>

          <svg className="w-full h-full opacity-60 overflow-visible" viewBox="0 0 100 100">
             <path 
                d="M 10 10 Q 50 10 90 90" 
                fill="none" 
                stroke="url(#grad1)" 
                strokeWidth="1.5" 
                strokeDasharray="4 2"
                className="animate-dash"
             />
             <defs>
               <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" style={{stopColor:'#10b981', stopOpacity:1}} />
                 <stop offset="100%" style={{stopColor:'#6366f1', stopOpacity:1}} />
               </linearGradient>
             </defs>
          </svg>
        </div>

        <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-lg w-full transform group-hover:scale-[1.05] transition-all shadow-2xl relative z-10 text-center animate-fade-in">
           <div className="flex items-center gap-3 justify-center mb-2">
             <Navigation className="w-4 h-4 text-indigo-400" />
             <h3 className="text-xs font-black uppercase tracking-widest text-[#94a3b8]">Active Tactical Corridor</h3>
           </div>
           <p className="text-xl font-black text-white italic">{route}</p>
           <p className="text-[10px] text-gray-500 font-medium mt-2 flex items-center gap-2 justify-center border-t border-white/5 pt-3">
             <Info className="w-3 h-3" /> Satellite Uplink Verified • Route Integrity Check Complete
           </p>
        </div>
      </div>

      <style>{`
        .animate-dash {
          stroke-dashoffset: 1000;
          animation: dash 5s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MapView;
