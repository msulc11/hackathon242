'use client';  // Add this line at the top of the file

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSearchParams } from 'next/navigation';

interface MapProps {
  geojsonData: any; // Replace 'any' with your actual GeoJSON type
}

const Map: React.FC<MapProps> = ({ geojsonData }) => {
  const mapRef = useRef<L.Map | null>(null);
  const geojsonLayerRef = useRef<L.GeoJSON | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!mapRef.current) {
        const map = L.map('map').setView([49.8175, 15.4730], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        mapRef.current = map;

        geojsonLayerRef.current = L.geoJSON(geojsonData).addTo(map);
      }

      const lat = searchParams.get('lat');
      const lon = searchParams.get('lon');
      const zoom = searchParams.get('zoom');

      if (lat && lon && zoom && mapRef.current) {
        mapRef.current.setView([parseFloat(lat), parseFloat(lon)], parseInt(zoom));
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [geojsonData, searchParams]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default Map;
