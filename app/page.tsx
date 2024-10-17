// app/page.tsx
import fs from 'fs';
import path from 'path';

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
  // Define the path to the GeoJSON file
  const filePath = path.join(process.cwd(), 'json', 'investice.geojson');

  // Read the GeoJSON file
  const geojsonData = fs.readFileSync(filePath, 'utf-8');

  // Parse the GeoJSON data
  return JSON.parse(geojsonData);
};

export default async function Home() {
  const geojson = await fetchGeoJSON();
  const features = geojson.features;

  return (
    <div>
      <h1>Companies List</h1>
      <ul>
        {geojson.features.map((feature) => (
          <li key={feature.id}>
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
