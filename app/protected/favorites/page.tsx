'use client';

import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import Link from 'next/link';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          redirect("/login");
        }

        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          if (Array.isArray(parsedFavorites)) {
            setFavorites(parsedFavorites);
          } else {
            setError('Stored favorites are not in the expected format');
          }
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('An error occurred while fetching favorites');
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = (ico: string) => {
    const updatedFavorites = favorites.filter(company => company.properties?.ico !== ico);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Companies</h1>
      {favorites.length === 0 ? (
        <p>No favorite companies added yet.</p>
      ) : (
        <ul>
          {favorites.map((company, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <span>
                <strong>{company.properties?.nazev_spolecnosti || 'Unknown Company'}</strong>
                {' - '}
                <span>IČO: {company.properties?.ico || 'N/A'}</span>
              </span>
              <button 
                onClick={() => removeFavorite(company.properties?.ico)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link href="/protected/Map" className="text-blue-500 hover:text-blue-700">
        Back to Map
      </Link>
    </div>
  );
}
