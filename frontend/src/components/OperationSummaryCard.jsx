import React from 'react';
import { Map, Clock, DollarSign, Cloud, AlertTriangle, ChevronRight } from 'lucide-react';

/**
 * OperationSummaryCard
 * A unified dashboard component synthesizing key logistics: Route, Weather, and Budget.
 * Includes hazard-aware risk highlighting and responsive layout.
 */
const OperationSummaryCard = ({ data }) => {
  if (!data) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 p-8 text-center text-gray-500">
        No operational data available
      </div>
    );
  }

  const { route, weather, budget } = data;
  
  // Safe extraction with fallbacks
  const distance = route?.distance_km ?? 0;
  const eta      = route?.eta_minutes ?? 0;
  const summary  = weather?.weather_summary ?? 'Conditions unknown';
  const risk     = (weather?.risk_level ?? 'UNKNOWN').toUpperCase();
  const cost     = budget?.total_estimated_cost ?? 0;

  // Dynamic risk styling
  const riskStyles = {
    LOW:    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    MEDIUM: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    HIGH:   'bg-rose-500/10 text-rose-400 border-rose-500/20',
    DEFAULT: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  };

  const currentRiskStyle = riskStyles[risk] || riskStyles.DEFAULT;

  return (
    <div className="group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl p-6 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-1">
      {/* Header with Risk Badge */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
            <AlertTriangle className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Tactical Brief</h3>
            <p className="text-[10px] text-gray-500 font-bold">MISSION ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
          </div>
        </div>
        
        <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest shadow-lg ${currentRiskStyle}`}>
          {risk} RISK
        </div>
      </div>

      {/* Main Grid Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Distance */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-400">
            <Map className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-wider">Distance</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white">{distance}</span>
            <span className="text-[10px] font-bold text-gray-500">KM</span>
          </div>
        </div>

        {/* Time */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-wider">Duration</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white">{eta}</span>
            <span className="text-[10px] font-bold text-gray-500">MIN</span>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-400">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-wider">Budget</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white">₹{cost.toLocaleString()}</span>
            <span className="text-[10px] font-bold text-gray-500">INR</span>
          </div>
        </div>

        {/* Weather (Summary) */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-400">
            <Cloud className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-black uppercase tracking-wider">Weather</span>
          </div>
          <div className="truncate max-w-full">
            <span className="text-sm font-bold text-white leading-tight block">{summary}</span>
          </div>
        </div>
      </div>

      {/* Footer / Call to Action */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-[#1e293b] bg-indigo-500/20 flex items-center justify-center">
                    <span className="text-[8px] font-bold">A{i+1}</span>
                </div>
            ))}
            <div className="pl-4 text-[9px] font-bold text-gray-500">3 Agents Synchronized</div>
        </div>
        
        <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">
          View Detail <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Decorative Gradient Flare */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default OperationSummaryCard;
