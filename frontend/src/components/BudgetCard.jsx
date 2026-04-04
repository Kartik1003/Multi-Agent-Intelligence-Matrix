import React from 'react';
import { Car, Bus, Plane, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

/**
 * BudgetCard
 * Advanced multi-modal transit analysis component.
 * Displays various transport modes with intelligent recommendation highlighting.
 */
const BudgetCard = ({ budget }) => {
  if (!budget) return null;

  const { car_travel, bus_travel, flight_travel, recommended_option, reasoning } = budget;

  // Render logic for modes
  const modes = [
    {
      id: "Car",
      name: "Private Transit",
      icon: Car,
      cost: car_travel?.cost ?? 0,
      details: `${car_travel?.fuel_required_liters ?? 0}L Fuel Required`,
      color: "blue"
    },
    {
      id: "Bus",
      name: "Public Transport",
      icon: Bus,
      cost: bus_travel?.estimated_cost ?? 0,
      details: "Mid-to-long range intercity",
      color: "indigo"
    },
    {
      id: "Flight",
      name: "Aerial Link",
      icon: Plane,
      cost: flight_travel?.estimated_cost ?? 0,
      details: flight_travel?.estimated_cost === "Not recommended" ? "Distance too short" : "High-speed transit",
      color: "sky"
    }
  ];

  return (
    <div className="glass-card p-6 border-emerald-400/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-400/20">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-[#94a3b8]">Budget Estimator</h2>
          <p className="text-[10px] text-gray-500 font-medium">Multi-Modal Financial Analysis</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {modes.map((mode) => {
          const isRecommended = mode.id === recommended_option;
          const isNotAvailable = mode.cost === "Not recommended";
          
          return (
            <div 
              key={mode.id}
              className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                isRecommended 
                ? 'bg-emerald-500/5 border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
                : 'bg-white/5 border-white/5 opacity-70 hover:opacity-100 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isRecommended ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                  <mode.icon className={`w-5 h-5 ${isRecommended ? 'text-emerald-400' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{mode.name}</h4>
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{mode.details}</p>
                </div>
              </div>

              <div className="text-right flex items-center gap-2">
                {isNotAvailable ? (
                    <span className="text-[10px] font-black uppercase text-rose-400/60 leading-tight">N/A</span>
                ) : (
                    <div>
                        <div className={`text-lg font-black ${isRecommended ? 'text-emerald-400' : 'text-white'}`}>
                            ₹{mode.cost.toLocaleString()}
                        </div>
                        {isRecommended && (
                             <div className="text-[8px] font-black uppercase tracking-widest text-emerald-500/70">RECOMMENDED</div>
                        )}
                    </div>
                )}
                {isRecommended && <CheckCircle className="w-4 h-4 text-emerald-400 ml-1" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation Reasoning */}
      <div className="mt-auto p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 flex gap-3 items-start animate-fade-in">
        <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div>
           <p className="text-xs font-bold text-indigo-300">Intelligent Recommendation</p>
           <p className="text-[10px] text-indigo-200/60 leading-relaxed mt-1">{reasoning}</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
