'use client';

import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import Link from 'next/link';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);

    const fetchCompanies = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        redirect("/login");
      }

      // Fetch companies data from your GeoJSON file or API
      const response = await fetch('/api/companies');
      const allCompanies = await response.json();
      
      const favoriteCompanies = allCompanies.filter((company: any) => 
        storedFavorites.includes(company.properties.ico)
      );
      setCompanies(favoriteCompanies);
    };

    fetchCompanies();
  }, []);

  const removeFavorite = (ico: string) => {
    const updatedFavorites = favorites.filter(fav => fav !== ico);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setCompanies(companies.filter(company => company.properties.ico !== ico));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Companies</h1>
      <ul>
        {companies.map((company, index) => (
          <li key={index} className="mb-2 flex justify-between items-center">
            <span>
              <strong>{company.properties.nazev_spolecnosti}</strong>
              {' - '}
              <span>IČO: {company.properties.ico}</span>
            </span>
            <button 
              onClick={() => removeFavorite(company.properties.ico)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <Link href="/protected/Map" className="text-blue-500 hover:text-blue-700">
        Back to Map
      </Link>
    </div>
  );
}
