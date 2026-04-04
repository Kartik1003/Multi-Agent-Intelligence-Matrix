import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Star, DollarSign, BedDouble, ChevronRight } from 'lucide-react';

/**
 * HotelRecommendations
 * Premium card grid for mission-critical accommodations.
 */
const HotelRecommendations = ({ hotels }) => {
  if (!hotels || hotels.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-400/20 shadow-lg shadow-sky-500/10">
          <BedDouble className="w-5 h-5 text-sky-400" />
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-[#94a3b8]">Accommodations</h2>
          <p className="text-[10px] text-gray-500 font-medium">Mission Logistics Optimization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hotels.map((hotel, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'rgba(56, 189, 248, 0.4)' }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="group relative rounded-2xl bg-white/5 border border-white/5 p-6 backdrop-blur-xl h-full flex flex-col group overflow-hidden"
          >
            {/* Header / Badge */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center group-hover:bg-sky-500/20 transition-all">
                <Bed className="w-5 h-5 text-sky-400 group-hover:scale-110" />
              </div>
              <div className={`px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                hotel.type === 'Premium' ? 'bg-amber-500/10 text-amber-400 border-amber-400/20' : 'bg-sky-500/10 text-sky-400 border-sky-400/20'
              }`}>
                {hotel.type}
              </div>
            </div>

            {/* Title & Rating */}
            <div className="flex-grow space-y-2 mb-6">
                <h3 className="text-base font-black text-white italic group-hover:text-sky-400 transition-colors uppercase leading-tight tracking-wide">{hotel.name}</h3>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, si) => (
                        <Star key={si} className={`w-2.5 h-2.5 ${si < Math.floor(hotel.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-600'}`} />
                    ))}
                    <span className="text-[10px] font-black text-gray-500 ml-2">{hotel.rating} POINT SCORE</span>
                </div>
            </div>

            {/* Pricing & CTA */}
            <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                <div>
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-0.5 italic">Estimated Slot</p>
                   <p className="text-sm font-black text-white italic leading-tight">{hotel.price}</p>
                </div>
                <motion.button 
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-sky-500/10 rounded-full flex items-center justify-center border border-sky-400/20 hover:bg-sky-500 hover:text-white transition-all shadow-xl group-hover:scale-110"
                >
                    <ChevronRight className="w-4 h-4" />
                </motion.button>
            </div>

            {/* Hover Glow Flare */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 h-24 bg-sky-500/10 rounded-full blur-[40px] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HotelRecommendations;
