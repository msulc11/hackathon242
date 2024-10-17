import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'json', 'investice.geojson');
  const geojsonData = fs.readFileSync(filePath, 'utf-8');
  const parsedData = JSON.parse(geojsonData);

  return NextResponse.json(parsedData.features);
}
