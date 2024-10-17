'use client';

import { useState, useCallback, useEffect } from 'react';
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/client";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import dynamic from 'next/dynamic';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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
  loading: () => <p>Načítání mapy...</p>
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
  const [companyStats, setCompanyStats] = useState({ sro: 0, as: 0, other: 0 });
  const [countryStats, setCountryStats] = useState<{[key: string]: number}>({});
  const [districtStats, setDistrictStats] = useState<{[key: string]: number}>({});

  useEffect(() => {
    const fetchGeoJSON = async () => {
      const response = await fetch('/api/companies');
      const data = await response.json();
      
      // Deduplikace funkcí na základě IČO
      const uniqueFeatures = data.reduce((acc, current) => {
        const x = acc.find(item => item.properties.ico === current.properties.ico);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setGeojson({ type: "FeatureCollection", features: uniqueFeatures });

      // Výpočet statistik typů společností
      const typeStats = uniqueFeatures.reduce((acc, feature) => {
        const companyName = feature.properties.nazev_spolecnosti.toLowerCase();
        if (companyName.includes('s.r.o.') || companyName.includes('spol. s r.o.')) {
          acc.sro++;
        } else if (companyName.includes('a.s.') || companyName.includes('akciová společnost')) {
          acc.as++;
        } else {
          acc.other++;
        }
        return acc;
      }, { sro: 0, as: 0, other: 0 });

      setCompanyStats(typeStats);

      // Výpočet statistik zemí původu
      const countryData = uniqueFeatures.reduce((acc, feature) => {
        const country = feature.properties.země_puvodu_zadatele || 'Neznámé';
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {});

      setCountryStats(countryData);

      // Výpočet statistik okresů
      const districtData = uniqueFeatures.reduce((acc, feature) => {
        const district = feature.properties.nazev_okresu || 'Neznámý';
        acc[district] = (acc[district] || 0) + 1;
        return acc;
      }, {});

      setDistrictStats(districtData);
    };
    fetchGeoJSON();
  }, []);

  const handleAddFavorite = useCallback((company: any) => {
    setFavorites(prevFavorites => {
      const newFavorites = [...prevFavorites, company];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
    alert('Společnost přidána do oblíbených!');
  }, []);

  const companyTypeChartData = {
    labels: ['s.r.o.', 'a.s.', 'Ostatní'],
    datasets: [
      {
        data: [companyStats.sro, companyStats.as, companyStats.other],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const countryChartData = {
    labels: Object.keys(countryStats),
    datasets: [
      {
        label: 'Počet společností',
        data: Object.values(countryStats),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const districtChartData = {
    labels: Object.keys(districtStats),
    datasets: [
      {
        label: 'Počet společností',
        data: Object.values(districtStats),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Počet společností'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Název'
        }
      }
    }
  };

  if (!geojson) {
    return <div>načítání...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <SearchBar geojsonData={geojson} />
        <Link href="/protected/favorites" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Zobrazit oblíbené ({favorites.length})
        </Link>
      </div>
      <div style={{ height: '500px', width: '100%', minWidth: '1000px' }}>
        <Map geojsonData={geojson} onAddFavorite={handleAddFavorite} />
      </div>
      
      <div className="mt-8 mb-8">
        <h2 className='text-2xl font-bold mb-4'>Statistika typů společností</h2>
        <div style={{ width: '300px', margin: 'auto' }}>
          <Pie data={companyTypeChartData} />
        </div>
      </div>
      
      <div className="mt-8 mb-8">
        <h2 className='text-2xl font-bold mb-4'>Statistika zemí původu</h2>
        <div style={{ height: '400px', width: '100%' }}>
          <Bar data={countryChartData} options={chartOptions} />
        </div>
      </div>
      
      <div className="mt-8 mb-8">
        <h2 className='text-2xl font-bold mb-4'>Statistika okresů</h2>
        <div style={{ height: '400px', width: '100%' }}>
          <Bar data={districtChartData} options={chartOptions} />
        </div>
      </div>
      
      <h2 className='text-2xl font-bold pt-3'>Společnosti:</h2>
      <ul>
        {geojson.features.map((feature, index) => (
          <li key={index} className="mb-2">
            <strong>{feature.properties.nazev_spolecnosti}</strong>
            {' - '}
            <span>IČO: {feature.properties.ico}</span> <br />
            <span>Země původu: {feature.properties.země_puvodu_zadatele}</span> <br />
            <span>Okres: {feature.properties.nazev_okresu}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
