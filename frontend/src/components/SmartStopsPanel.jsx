import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Timer, ShieldAlert } from 'lucide-react';

/**
 * SmartStopsPanel
 * Visual timeline of strategic mission waypoints.
 */
const SmartStopsPanel = ({ stops }) => {
  if (!stops || stops.length === 0) return null;

  return (
    <div className="glass-card p-6 border-amber-400/10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-400/20">
          <Navigation className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-[#94a3b8]">Smart Waypoints</h2>
          <p className="text-[10px] text-gray-500 font-medium">Strategic Mission Logistics</p>
        </div>
      </div>

      <div className="space-y-6 relative pl-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-amber-500/20">
        {stops.map((stop, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-400/20 transition-all hover:bg-white/[0.08]"
          >
            {/* Timeline Indicator */}
            <div className="absolute -left-[1.65rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-amber-500 flex items-center justify-center p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full rounded-full bg-amber-500 animate-pulse"></div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <h3 className="text-sm font-bold text-white tracking-wide italic">{stop.location}</h3>
                </div>
                <p className="text-[10px] text-gray-400 font-medium ml-5">{stop.reason}</p>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-amber-400/60 transition-all group-hover:text-amber-400">
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/5 rounded-full border border-amber-500/10">
                    <Timer className="w-3 h-3" />
                    <span>~{Math.round(stop.distance_from_origin)} KM POINT</span>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SmartStopsPanel;
