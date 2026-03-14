import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city');
  if (!city) {
    return NextResponse.json({ error: 'city param required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`,
      { headers: { 'User-Agent': 'OpenNow/1.0 (https://getopennow.com)' } },
    );
    if (res.ok) {
      const data = await res.json();
      if (data.length > 0) {
        return NextResponse.json({
          latitude: Number(data[0].lat),
          longitude: Number(data[0].lon),
        });
      }
    }
    return NextResponse.json({ latitude: null, longitude: null });
  } catch {
    return NextResponse.json({ error: 'Geocoding failed' }, { status: 500 });
  }
}
