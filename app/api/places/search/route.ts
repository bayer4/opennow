import { NextRequest, NextResponse } from 'next/server';
import { searchPlaces } from '@/lib/google-places';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const lat = req.nextUrl.searchParams.get('lat');
  const lng = req.nextUrl.searchParams.get('lng');
  const city = req.nextUrl.searchParams.get('city') ?? undefined;
  const locationBias =
    lat && lng ? { lat: Number(lat), lng: Number(lng) } : undefined;

  const results = await searchPlaces(q, locationBias, city);
  return NextResponse.json(results);
}
