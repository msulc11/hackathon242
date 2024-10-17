'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  geojsonData: any; // Replace 'any' with your actual GeoJSON type
}

const SearchBar: React.FC<SearchBarProps> = ({ geojsonData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const feature = geojsonData.features.find((f: any) => 
      f.properties.nazev_spolecnosti.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.properties.ico.includes(searchTerm)
    );

    if (feature) {
      const coordinates = feature.geometry.coordinates;
      router.push(`/protected?lat=${coordinates[1]}&lon=${coordinates[0]}&zoom=15`);
    } else {
      alert('Company not found');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Zadej jméno nebo Ičo společnosti"
        className="w-full"
        style={{ backgroundColor: 'black', color: 'white' }}
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white mb-5 rounded-md p-2">Hledat</button>
    </div>
  );
};

export default SearchBar;
