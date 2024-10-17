'use client';  // Add this line at the top of the file

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import { useSearchParams } from 'next/navigation';

interface MapProps {
  geojsonData: any; // Replace 'any' with your actual GeoJSON type
  onAddFavorite: (company: any) => void;
}

const Map: React.FC<MapProps> = ({ geojsonData, onAddFavorite }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerClusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!mapRef.current) {
        const map = L.map('map').setView([49.8175, 15.4730], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        mapRef.current = map;

        // Custom icon
        const customIcon = L.divIcon({
          html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 0C7.58 0 4 3.58 4 8C4 13.54 12 24 12 24C12 24 20 13.54 20 8C20 3.58 16.42 0 12 0ZM12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11Z" fill="#007bff"/>
                 </svg>`,
          className: 'custom-pin',
          iconSize: [24, 24],
          iconAnchor: [12, 24],
          popupAnchor: [0, -24],
        });

        // Create a new MarkerClusterGroup
        markerClusterGroupRef.current = L.markerClusterGroup();

        // Add markers to the cluster group instead of directly to the map
        L.geoJSON(geojsonData, {
          pointToLayer: (feature, latlng) => {
            return L.marker(latlng, { icon: customIcon });
          },
          onEachFeature: (feature, layer) => {
            const popupContent = `
              <strong>${feature.properties.nazev_spolecnosti}</strong><br>
              Ulice: ${feature.properties.nazev_ulice} ${feature.properties.cislo_domovni}<br>
              Město: ${feature.properties.nazev_obce}, PSČ: ${feature.properties.psc}<br>
              Země původu: ${feature.properties.země_puvodu_zadatele}<br>
              IČO: ${feature.properties.ico}<br>
              <a href="${feature.properties.www}" target="_blank" rel="noopener noreferrer">Web</a><br>
              <button class="add-to-favorites" data-ico="${feature.properties.ico}">Add to Favorites</button>
            `;
            layer.bindPopup(popupContent);
          }
        }).addTo(markerClusterGroupRef.current);

        // Add the marker cluster group to the map
        map.addLayer(markerClusterGroupRef.current);

        // Add event listener for "Add to Favorites" button
        map.on('popupopen', function(e) {
          const addToFavoritesBtn = document.querySelector('.add-to-favorites');
          if (addToFavoritesBtn) {
            addToFavoritesBtn.addEventListener('click', function(event) {
              const ico = (event.target as HTMLElement).getAttribute('data-ico');
              if (ico) {
                const company = geojsonData.features.find((f: any) => f.properties.ico === ico);
                if (company) {
                  onAddFavorite(company);
                }
              }
            });
          }
        });
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
  }, [geojsonData, searchParams, onAddFavorite]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default Map;
