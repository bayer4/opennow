import { NextRequest, NextResponse } from 'next/server';
import tzlookup from 'tz-lookup';

interface NominatimAddress {
  city?: string;
  town?: string;
  village?: string;
  hamlet?: string;
  suburb?: string;
  municipality?: string;
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
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`,
      { headers: { 'User-Agent': 'OpenNow/1.0 (https://getopennow.com)' } },
    );

    let city = 'Unknown';
    if (res.ok) {
      const data = await res.json();
      const addr: NominatimAddress = data.address ?? {};
      city = addr.city || addr.town || addr.village || addr.hamlet || addr.suburb || addr.municipality || 'Unknown';
    }

    return NextResponse.json({ city, timezone });
  } catch {
    return NextResponse.json({ city: 'Unknown', timezone });
  }
}
