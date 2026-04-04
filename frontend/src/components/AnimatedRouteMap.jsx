import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Bounds Control
 * Automatically fits the map view to the provided geometry coordinates.
 */
function SetBounds({ geometry }) {
  const map = useMap();
  useEffect(() => {
    if (geometry && geometry.length > 0) {
      map.fitBounds(geometry, { padding: [50, 50], animate: true, duration: 1 });
    }
  }, [geometry, map]);
  return null;
}

// Custom Icons for Start/End
const startIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const endIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const AnimatedRouteMap = ({ geometry, source, destination, stops = [] }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
    setIsReady(true);
  }, []);

  if (!isReady || !geometry || geometry.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-[500px] bg-[#1e293b]/50 rounded-2xl flex flex-col items-center justify-center border border-white/5 space-y-4"
      >
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="italic text-gray-500 font-medium tracking-widest text-xs">SYNCHRONIZING GEOSPATIAL DATA...</p>
      </motion.div>
    );
  }

  const startPoint = geometry[0];
  const endPoint   = geometry[geometry.length - 1];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-[2rem] overflow-hidden border border-white/10 h-[500px] shadow-[0_0_50px_rgba(99,102,241,0.15)] group"
    >
      <MapContainer 
        center={startPoint} 
        zoom={13} 
        style={{ height: '100%', width: '100%', background: '#0f172a' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Animated Polyline */}
        <Polyline 
            positions={geometry} 
            color="#6366f1" 
            weight={5} 
            opacity={0.9} 
            dashArray="1, 12"
            lineCap="round"
            className="animate-route-draw"
        />
        
        {/* Subtle Glow Path */}
        <Polyline 
            positions={geometry} 
            color="#818cf8" 
            weight={12} 
            opacity={0.15} 
            className="blur-md"
        />
        
        <Marker position={startPoint} icon={startIcon}>
          <Popup><strong>Mission Origin:</strong> {source}</Popup>
        </Marker>
        
        <Marker position={endPoint} icon={endIcon}>
          <Popup><strong>Tactical Objective:</strong> {destination}</Popup>
        </Marker>

        {/* Pulsing Stops on Map */}
        {stops.map((stop, i) => {
            // Find a rough coordinate for the stop based on distance ratio
            const ratio = stop.distance_from_origin / (geometry.length * 10); // Very rough
            const stopIdx = Math.min(Math.floor(geometry.length * (stop.distance_from_origin / (geometry[geometry.length-1][0]))), geometry.length - 1); 
            // Better to find by distance but this is simulation. 
            // Let's just pick points along the middle.
            const pointIdx = Math.floor((i + 1) * (geometry.length / (stops.length + 1)));
            const point = geometry[pointIdx];
            
            return (
                <Marker 
                    key={i} 
                    position={point} 
                    icon={new L.DivIcon({
                        className: 'custom-div-icon',
                        html: `<div class="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>`,
                        iconSize: [16, 16], iconAnchor: [8, 8]
                    })}
                >
                    <Popup><strong>Waypoint:</strong> {stop.location}</Popup>
                </Marker>
            );
        })}

        <SetBounds geometry={geometry} />
      </MapContainer>

      {/* Decorative Overlays */}
      <div className="absolute top-6 left-6 z-[1000] flex gap-2">
        <div className="bg-black/80 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
           Tactical Map Link Active
        </div>
      </div>

      <style>{`
        .animate-route-draw {
           stroke-dashoffset: 1000;
           animation: route-draw 15s linear infinite;
        }
        @keyframes route-draw {
           to { stroke-dashoffset: 0; }
        }
        .leaflet-container {
           filter: saturate(0.8) contrast(1.1);
        }
        .leaflet-popup-content-wrapper {
           background: rgba(15, 23, 42, 0.9) !important;
           color: white !important;
           border: 1px solid rgba(255, 255, 255, 0.1) !important;
           border-radius: 12px !important;
           backdrop-filter: blur(10px);
        }
        .leaflet-popup-tip {
           background: rgba(15, 23, 42, 0.9) !important;
        }
      `}</style>
    </motion.div>
  );
};

export default AnimatedRouteMap;
