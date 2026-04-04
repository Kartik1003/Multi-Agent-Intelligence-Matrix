import React from 'react';
import { Terminal, CheckCircle, Clock } from 'lucide-react';

const AgentLogs = ({ logs }) => {
  return (
    <div className="glass-card p-6 border-white/5 flex-grow flex flex-col min-h-[300px]">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-4 h-4 text-emerald-400" />
        <h2 className="text-xs font-black uppercase tracking-widest text-[#94a3b8]">Agent Execution Logs</h2>
      </div>
      
      <div className="flex-grow space-y-4 font-mono text-[0.6rem] sm:text-xs text-gray-500 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center opacity-30 italic">
            Awaiting Command...
          </div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex gap-3 items-start animate-fade-in animate-slide-in">
              <span className="text-emerald-500/50 flex-shrink-0">[{log.time}]</span>
              <div className="flex gap-2 items-center text-gray-300">
                {log.msg.includes('Error') ? (
                   <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                ) : log.msg.includes('Success') ? (
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                )}
                <span>{log.msg}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentLogs;
