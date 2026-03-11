import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get('lat');
  const lng = req.nextUrl.searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return fallbackCity(Number(lat), Number(lng));
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=locality&key=${apiKey}`,
    );
    if (res.ok) {
      const data = await res.json();
      const result = data.results?.[0];
      if (result) {
        const cityComp = result.address_components?.find(
          (c: { types: string[] }) =>
            c.types.includes('locality') || c.types.includes('sublocality'),
        );
        if (cityComp) {
          return NextResponse.json({ city: cityComp.long_name });
        }
      }
    }
  } catch {}

  return fallbackCity(Number(lat), Number(lng));
}

function fallbackCity(lat: number, lng: number): NextResponse {
  const knownCities = [
    { name: 'Chicago', lat: 41.8781, lng: -87.6298 },
    { name: 'New York', lat: 40.7128, lng: -74.006 },
    { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
    { name: 'Philadelphia', lat: 39.9526, lng: -75.1652 },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  ];

  let closest = knownCities[0];
  let minDist = Infinity;
  for (const city of knownCities) {
    const d = Math.sqrt((lat - city.lat) ** 2 + (lng - city.lng) ** 2);
    if (d < minDist) {
      minDist = d;
      closest = city;
    }
  }

  if (minDist < 1) {
    return NextResponse.json({ city: closest.name });
  }

  return NextResponse.json({ city: 'Unknown' });
}
