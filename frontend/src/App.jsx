import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Compass, Cloud, DollarSign, LayoutList, ShieldAlert, Cpu } from 'lucide-react';

// Components
import InputForm from './components/InputForm';
import SummaryCards from './components/SummaryCards';
import AgentLogs from './components/AgentLogs';
import OperationSummaryCard from './components/OperationSummaryCard';
import BudgetCard from './components/BudgetCard';
import ItineraryPanel from './components/ItineraryPanel';
import AnimatedRouteMap from './components/AnimatedRouteMap';
import SmartStopsPanel from './components/SmartStopsPanel';
import HotelRecommendations from './components/HotelRecommendations';
import ExploreNearby from './components/ExploreNearby';

/**
 * Premium App Intelligence Hub
 * Coordinates all multi-agent travel operations with professional grade UI/UX.
 */
const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg }]);
  };

  const handleGeneratePlan = async (inputs) => {
    setLoading(true);
    setError(null);
    setData(null);
    setLogs([]);
    addLog("Initializing Mainframe Orchestrator...");

    try {
      await new Promise(r => setTimeout(r, 600));
      addLog("Route Agent: Geospatial uplink active...");
      
      await new Promise(r => setTimeout(r, 600));
      addLog("Weather Agent: Atmospheric risk scanning...");

      const response = await axios.post('http://127.0.0.1:8000/generate-plan', inputs);
      
      await new Promise(r => setTimeout(r, 400));
      addLog("Budget Agent: Financial liquidity analysis...");
      
      await new Promise(r => setTimeout(r, 400));
      addLog("Summary Agent: Synthetic intelligence merging...");

      setData(response.data);
      addLog("Success: Mission Directive Issued.");
    } catch (err) {
      setError(err.response?.data?.detail || "System Link Failure. Ensure Backend Node is online.");
      addLog("Error: Signal corruption detected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8 max-w-7xl mx-auto space-y-12 text-slate-200 selection:bg-indigo-500/30">
      {/* Header Section */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-10"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Compass className="w-6 h-6 text-white" />
             </div>
             <h1 className="text-4xl font-black bg-gradient-to-tr from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent tracking-tighter">
                MISSION CONTROL
             </h1>
          </div>
          <p className="text-slate-500 font-bold tracking-[0.3em] text-[10px] uppercase pl-[52px]">Multi-Agent Intelligence Matrix</p>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-500/5 px-4 py-2 rounded-2xl border border-emerald-500/20 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">System Integrity: 100%</span>
            </div>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Control Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 space-y-10"
        >
          <InputForm onGenerate={handleGeneratePlan} loading={loading} />
          <AgentLogs logs={logs} />
        </motion.div>

        {/* Right Operations Center */}
        <div className="lg:col-span-8 space-y-10">
          <AnimatePresence mode="wait">
            {!data && !loading && (
               <motion.div 
                 key="idle"
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="glass-card p-16 text-center space-y-6 border-white/5"
               >
                 <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto border border-indigo-500/20 relative">
                    <Cpu className="w-12 h-12 text-indigo-400/40" />
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin opacity-50"></div>
                 </div>
                 <div className="space-y-2">
                   <h3 className="text-2xl font-black text-white">READY FOR DEPLOYMENT</h3>
                   <p className="text-slate-400 text-sm max-w-xs mx-auto font-medium">Input mission parameters to activate tactical sub-agents.</p>
                 </div>
               </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 space-y-8"
              >
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full"></div>
                  <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-black tracking-[0.3em] uppercase animate-pulse text-indigo-400">Syncing Matrix</p>
                  <p className="text-slate-500 text-xs font-bold">Cross-referencing geospatial assets...</p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-red-500/5 border border-red-500/20 rounded-[2rem] flex items-center gap-4 text-red-400 font-bold"
              >
                <ShieldAlert className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm tracking-wide">{error}</span>
              </motion.div>
            )}

            {data && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                {/* 1. Geospatial Visualization */}
                <AnimatedRouteMap 
                  geometry={data.route.geometry || []} 
                  source={data.source} 
                  destination={data.destination} 
                  stops={data.final_plan.stops}
                />

                {/* 2. Tactical Briefing Cards */}
                <div className="grid grid-cols-1 gap-10">
                   <div className="space-y-10">
                      <OperationSummaryCard data={data} />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                         <div className="md:col-span-2">
                            <SummaryCards route={data.route} weather={data.weather} budget={data.budget} />
                         </div>
                         <BudgetCard budget={data.budget} />
                      </div>
                   </div>
                </div>

                {/* 3. Itinerary & Waypoints */}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
                   <ItineraryPanel data={data.final_plan} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
                   <SmartStopsPanel stops={data.final_plan.stops} />
                </div>

                {/* 4. Logistics: Hotels & Food */}
                <div className="space-y-10">
                   <HotelRecommendations hotels={data.final_plan.hotels} />
                   <ExploreNearby explore={data.final_plan.explore} />
                </div>

                {/* Debug Layer */}
                <details className="group opacity-40 hover:opacity-100 transition-opacity">
                   <summary className="text-[10px] font-black uppercase tracking-[0.4em] cursor-pointer text-slate-500 mb-4 list-none flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-slate-500"></span> Raw Data Export
                   </summary>
                   <pre className="text-[10px] bg-black/50 p-6 rounded-[2rem] text-emerald-400 overflow-x-auto border border-white/5 max-h-60 custom-scrollbar">
                      {JSON.stringify(data, null, 2)}
                   </pre>
                </details>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="pt-20 text-center border-t border-white/5 space-y-4 pb-12">
        <div className="flex items-center justify-center gap-6 opacity-30">
           <Plane className="w-4 h-4" />
           <div className="w-1 h-1 rounded-full bg-slate-500"></div>
           <Cloud className="w-4 h-4" />
           <div className="w-1 h-1 rounded-full bg-slate-500"></div>
           <DollarSign className="w-4 h-4" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
           © 2026 ANTIGRAVITY MISSION INTERFACE • V2.0 PRODUCTION CORE
        </p>
      </footer>
    </div>
  );
};

export default App;
