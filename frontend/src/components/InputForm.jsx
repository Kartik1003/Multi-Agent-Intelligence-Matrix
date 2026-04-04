import React, { useState } from 'react';
import { Send, MapPin, Clock } from 'lucide-react';

const InputForm = ({ onGenerate, loading }) => {
  const [inputs, setInputs] = useState({
    source: '',
    destination: '',
    time: '09:00 AM'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(inputs);
  };

  return (
    <div className="glass-card p-6 border-indigo-400/20 shadow-2xl shadow-indigo-500/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-400/30">
          <Send className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Input Parameters</h2>
          <p className="text-xs text-gray-500 font-medium">Configure Strategic Constraints</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-indigo-300 flex items-center gap-2">
            <MapPin className="w-3 h-3" /> Source
          </label>
          <input 
            type="text" 
            placeholder="e.g. San Francisco, CA"
            value={inputs.source}
            onChange={(e) => setInputs({...inputs, source: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500 transition-all text-white placeholder-white/20 font-medium"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-indigo-300 flex items-center gap-2">
            <MapPin className="w-3 h-3" /> Destination
          </label>
          <input 
            type="text" 
            placeholder="e.g. South Lake Tahoe, CA"
            value={inputs.destination}
            onChange={(e) => setInputs({...inputs, destination: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500 transition-all text-white placeholder-white/20 font-medium"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-indigo-300 flex items-center gap-2">
            <Clock className="w-3 h-3" /> Departure Time
          </label>
          <input 
            type="text" 
            placeholder="e.g. Tomorrow 9 AM"
            value={inputs.time}
            onChange={(e) => setInputs({...inputs, time: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500 transition-all text-white placeholder-white/20 font-medium"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-4 shadow-xl shadow-indigo-500/30"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span className="uppercase tracking-widest">Execute Plan</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
