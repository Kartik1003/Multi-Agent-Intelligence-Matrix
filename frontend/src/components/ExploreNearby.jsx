import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, MapPin, Search, Compass, ChevronRight } from 'lucide-react';

/**
 * ExploreNearby
 * Tactical mission-relay point exploration guides.
 * Features an animated horizontal scroll effect for food and attractions.
 */
const ExploreNearby = ({ explore }) => {
  if (!explore || explore.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-400/20">
          <Compass className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-[#94a3b8]">Region Analysis</h2>
          <p className="text-[10px] text-gray-500 font-medium">Intelligence Points of Interest</p>
        </div>
      </div>

      <div className="space-y-6">
        {explore.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border-indigo-400/10 overflow-hidden relative group"
          >
             {/* Header */}
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-400/20">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                   </div>
                   <h3 className="text-sm font-black text-white italic tracking-widest uppercase">{item.location} RECON</h3>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                   <Search className="w-4 h-4 text-gray-500 hover:text-indigo-400" />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                {/* Food Section */}
                <div className="space-y-6">
                   <div className="flex items-center gap-3 text-indigo-400/70">
                      <Utensils className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase">Tactical Sustenance</span>
                   </div>
                   <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                      {item.food.map((food, fi) => (
                        <motion.div 
                          key={fi} 
                          whileHover={{ y: -4, scale: 1.05 }}
                          className="flex-shrink-0 px-5 py-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-100 flex items-center gap-3 shadow-lg shadow-indigo-500/5 group/chip"
                        >
                           <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse group-hover/chip:scale-125"></div>
                           {food}
                        </motion.div>
                      ))}
                   </div>
                </div>

                {/* Places Section */}
                <div className="space-y-6">
                   <div className="flex items-center gap-3 text-sky-400/70">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase">Strategic Landmarks</span>
                   </div>
                   <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                      {item.places.map((place, pi) => (
                        <motion.div 
                          key={pi} 
                          whileHover={{ y: -4, scale: 1.05 }}
                          className="flex-shrink-0 px-5 py-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-100 flex items-center gap-3 shadow-lg shadow-sky-500/5 group/chip"
                        >
                           <div className="w-2 h-2 rounded-full bg-amber-400 group-hover/chip:animate-ping"></div>
                           {place}
                        </motion.div>
                      ))}
                   </div>
                </div>
             </div>
             
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExploreNearby;
