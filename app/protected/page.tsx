import { useState } from 'react';
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import fs from 'fs';
import path from 'path';
import dynamic from 'next/dynamic';
import SearchBar from '@/components/SearchBar';

interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    title: string;
    description: string;
  };
}

interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}

const fetchGeoJSON = async (): Promise<GeoJSON> => {
  const filePath = path.join(process.cwd(), 'json', 'investice.geojson');
  const geojsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(geojsonData);
};

// Dynamically import the Map component with no SSR
const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const geojson = await fetchGeoJSON();

  return (
    <div>
      <h1>Companies Map</h1>
      <SearchBar geojsonData={geojson} />
      <div style={{ height: '500px', width: '100%', minWidth: '1000px' }}>
        <Map geojsonData={geojson} />
      </div>
      <h2>Companies List</h2>
      <ul>
        {geojson.features.map((feature, index) => (
          <li key={index}>
            <strong>{feature.properties.nazev_spolecnosti}</strong><br />
            Ulice: {feature.properties.nazev_ulice} {feature.properties.cislo_domovni}<br />
            Město: {feature.properties.nazev_obce}, PSČ: {feature.properties.psc}<br />
            Země původu: {feature.properties.země_puvodu_zadatele}<br />
            IČO: {feature.properties.ico}<br />
            <a href={feature.properties.www} target="_blank" rel="noopener noreferrer">
              Web
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
