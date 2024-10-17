'use client';

import { useState, useCallback, useEffect } from 'react';
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/client";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import dynamic from 'next/dynamic';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

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

const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function ProtectedPage() {
  const [geojson, setGeojson] = useState(null);
  const [favorites, setFavorites] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });

  useEffect(() => {
    const fetchGeoJSON = async () => {
      const response = await fetch('/api/companies');
      const data = await response.json();
      setGeojson({ type: "FeatureCollection", features: data });
    };
    fetchGeoJSON();
  }, []);

  const handleAddFavorite = useCallback((company: any) => {
    setFavorites(prevFavorites => {
      const newFavorites = [...prevFavorites, company];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
    alert('Company added to favorites!');
  }, []);

  if (!geojson) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <SearchBar geojsonData={geojson} />
        <Link href="/protected/favorites" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Favorites ({favorites.length})
        </Link>
      </div>
      <div style={{ height: '500px', width: '100%', minWidth: '1000px' }}>
        <Map geojsonData={geojson} onAddFavorite={handleAddFavorite} />
      </div>
      <h2 className='text-2xl font-bold pt-3'>Společnosti:</h2>
      <ul>
        {geojson.features.map((feature, index) => (
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
