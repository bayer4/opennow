import { NextRequest, NextResponse } from 'next/server';
import tzlookup from 'tz-lookup';

interface NominatimAddress {
  neighbourhood?: string;
  borough?: string;
  suburb?: string;
  village?: string;
  hamlet?: string;
  town?: string;
  city?: string;
  municipality?: string;
}

function stripSuffix(name: string): string {
  return name
    .replace(/\s+(Township|Borough|Municipality|CDP)$/i, '')
    .trim();
}

function pickCityName(addr: NominatimAddress): string {
  // Priority: village/borough (proper small towns) > city/town > suburb >
  // hamlet/neighbourhood (can be subdivision names, used as last resort)
  const raw =
    addr.village ||
    addr.borough ||
    addr.city ||
    addr.town ||
    addr.suburb ||
    addr.hamlet ||
    addr.neighbourhood ||
    addr.municipality ||
    null;
  if (!raw) return 'Unknown';
  return stripSuffix(raw);
}

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

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`,
      { headers: { 'User-Agent': 'OpenNow/1.0 (https://getopennow.com)' } },
    );

    let city = 'Unknown';
    if (res.ok) {
      const data = await res.json();
      const addr: NominatimAddress = data.address ?? {};
      city = pickCityName(addr);
    }

    return NextResponse.json({ city, timezone });
  } catch {
    return NextResponse.json({ city: 'Unknown', timezone });
  }
}
