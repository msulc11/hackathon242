'use client';  // Add this line at the top of the file

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  geojsonData: any;
}

const Map: React.FC<MapProps> = ({ geojsonData }) => {
  useEffect(() => {
    const map = L.map('map').setView([50.0755, 14.4378], 7); // Centered on Czech Republic

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create a custom SVG icon
    const svgIcon = L.divIcon({
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 0C7.31 0 3.5 3.81 3.5 8.5C3.5 14.88 12 24 12 24S20.5 14.88 20.5 8.5C20.5 3.81 16.69 0 12 0ZM12 13C9.24 13 7 10.76 7 8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8C17 10.76 14.76 13 12 13Z" fill="#FF0000"/>
        </svg>
      `,
      className: "svg-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24]
    });

    // Add markers for each feature in the GeoJSON data
    geojsonData.features.forEach((feature: any) => {
      const { coordinates } = feature.geometry;
      const { nazev_spolecnosti, nazev_ulice, cislo_domovni, nazev_obce, psc, www } = feature.properties;

      const marker = L.marker([coordinates[1], coordinates[0]], { icon: svgIcon }).addTo(map);
      
      marker.bindPopup(`
        <strong>${nazev_spolecnosti}</strong><br>
        ${nazev_ulice} ${cislo_domovni}<br>
        ${nazev_obce}, ${psc}<br>
        <a href="${www}" target="_blank">Website</a>
      `);
    });

    return () => {
      map.remove();
    };
  }, [geojsonData]);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default Map;
