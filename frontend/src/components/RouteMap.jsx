import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * Bounds Control
 * Automatically fits the map view to the provided geometry coordinates.
 */
function SetBounds({ geometry }) {
  const map = useMap();
  useEffect(() => {
    if (geometry && geometry.length > 0) {
      map.fitBounds(geometry, { padding: [50, 50] });
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

const RouteMap = ({ geometry, source, destination }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Leaflet markers sometimes break in React without global fixes
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
      <div className="h-[400px] bg-[#1e293b]/50 rounded-2xl flex items-center justify-center border border-white/5 italic text-gray-500">
        Awaiting geospatial signal...
      </div>
    );
  }

  const startPoint = geometry[0];
  const endPoint   = geometry[geometry.length - 1];

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 h-[450px] shadow-2xl relative z-0">
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
        <Polyline 
            positions={geometry} 
            color="#6366f1" 
            weight={4} 
            opacity={0.8} 
            dashArray="10, 10" 
            className="animate-pulse"
        />
        
        <Marker position={startPoint} icon={startIcon}>
          <Popup className="custom-popup"><strong>Origin:</strong> {source}</Popup>
        </Marker>
        
        <Marker position={endPoint} icon={endIcon}>
          <Popup className="custom-popup"><strong>Destination:</strong> {destination}</Popup>
        </Marker>

        <SetBounds geometry={geometry} />
      </MapContainer>
    </div>
  );
};

export default RouteMap;
