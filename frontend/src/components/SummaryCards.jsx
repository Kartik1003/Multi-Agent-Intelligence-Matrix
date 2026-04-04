import React from 'react';
import { Compass, Clock, DollarSign, Cloud, ArrowRight } from 'lucide-react';

const Card = ({ icon: Icon, label, value, color, delay, sub }) => (
  <div className={`glass-card p-5 border-${color}-400/20 shadow-lg shadow-${color}-500/10 animate-fade-in`} style={{ animationDelay: `${delay}s` }}>
    <div className="flex items-center gap-4 mb-3">
      <div className={`w-12 h-12 bg-${color}-500/10 rounded-2xl flex items-center justify-center border border-${color}-400/30`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">{label}</p>
        <h4 className={`text-xl font-black text-white`}>{value}</h4>
      </div>
    </div>
    {sub && (
      <div className="flex items-center gap-2 pt-3 border-t border-white/5 opacity-60">
        <ArrowRight className="w-3 h-3" />
        <span className="text-[11px] font-medium leading-tight">{sub}</span>
      </div>
    )}
  </div>
);

const SummaryCards = ({ route, weather, budget }) => {
  const isHighRisk = weather.risk_level === 'HIGH';
  const riskColor = isHighRisk ? 'red' : (weather.risk_level === 'MEDIUM' ? 'orange' : 'emerald');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card 
        icon={Compass} 
        label="Total Distance" 
        value={`${route.distance_km} km`} 
        color="indigo" 
        delay={0.1}
        sub={route.main_route}
      />
      <Card 
        icon={Clock} 
        label="Estimated Time" 
        value={`${route.eta_minutes} min`} 
        color="blue" 
        delay={0.2}
        sub={`~${Math.round(route.eta_minutes / 60 * 10) / 10} hours road duration`}
      />
      <Card 
        icon={DollarSign} 
        label="Total Cost" 
        value={`₹${budget.total_estimated_cost.toLocaleString()}`} 
        color="emerald" 
        delay={0.3}
        sub={`Fuel: ₹${budget.fuel_cost_inr.toLocaleString()} + 15% manual buffer`}
      />
      <Card 
        icon={Cloud} 
        label="Weather Risk" 
        value={weather.risk_level} 
        color={riskColor}
        delay={0.4}
        sub={weather.weather_summary}
      />
    </div>
  );
};

export default SummaryCards;
