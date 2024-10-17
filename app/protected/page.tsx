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

  // Filter out duplicate companies based on IČO
  const uniqueCompanies = geojson.features.reduce((acc, current) => {
    const x = acc.find(item => item.properties.ico === current.properties.ico);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // Create a new GeoJSON object with unique companies
  const uniqueGeojson = {
    ...geojson,
    features: uniqueCompanies
  };

  let duplicateCount = geojson.features.length - uniqueCompanies.length;
  console.log(`Removed ${duplicateCount} duplicate entries`);

  return (
    <div>
      
      <SearchBar geojsonData={uniqueGeojson} />
      <div style={{ height: '500px', width: '100%', minWidth: '1000px' }}>
        <Map geojsonData={uniqueGeojson} />
      </div>
      <h2 className='text-2xl font-bold pt-3'>Společnosti:</h2>
      <ul>
        {uniqueCompanies.map((feature, index) => (
          <li key={index} className="mb-2">
            <strong>{feature.properties.nazev_spolecnosti}</strong>
            {' - '}
            <span>IČO: {feature.properties.ico}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
