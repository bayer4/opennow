import { NextRequest, NextResponse } from 'next/server';
import tzlookup from 'tz-lookup';

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get('lat');
  const lng = req.nextUrl.searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 });
  }

  let timezone: string | null = null;
  try {
    timezone = tzlookup(Number(lat), Number(lng));
  } catch {}

  const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ city: 'Unknown', timezone });
  }

  try {
    const geoRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`,
    );

    let city = 'Unknown';
    if (geoRes.ok) {
      const geoData = await geoRes.json();
      city = extractCityName(geoData.results ?? []) ?? 'Unknown';
    }

    return NextResponse.json({ city, timezone });
  } catch {
    return NextResponse.json({ city: 'Unknown', timezone });
  }
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GeoResult {
  address_components?: AddressComponent[];
  types?: string[];
}

/**
 * Extract the most specific locality from geocoding results.
 * Prefers: sublocality > locality > admin_area_level_3
 * Uses the first result (most precise) to find the component.
 */
function extractCityName(results: GeoResult[]): string | null {
  if (results.length === 0) return null;

  const first = results[0];
  const components = first.address_components ?? [];

  const locality = components.find((c) => c.types.includes('locality'));
  if (locality) return locality.long_name;

  const sublocality = components.find((c) =>
    c.types.includes('sublocality') || c.types.includes('sublocality_level_1'),
  );
  if (sublocality) return sublocality.long_name;

  const adminL3 = components.find((c) =>
    c.types.includes('administrative_area_level_3'),
  );
  if (adminL3) return adminL3.long_name;

  const neighborhood = components.find((c) =>
    c.types.includes('neighborhood'),
  );
  if (neighborhood) return neighborhood.long_name;

  return null;
}
