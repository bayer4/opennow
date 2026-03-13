import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city');
  if (!city) {
    return NextResponse.json({ error: 'city param required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server geocoding unavailable' },
      { status: 500 },
    );
  }

  const referer = 'https://getopennow.com';
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`,
      { headers: { Referer: referer } },
    );
    const data = await res.json();
    const loc = data.results?.[0]?.geometry?.location;
    if (loc) {
      return NextResponse.json({ latitude: loc.lat, longitude: loc.lng });
    }
    return NextResponse.json({ latitude: null, longitude: null });
  } catch {
    return NextResponse.json({ error: 'Geocoding failed' }, { status: 500 });
  }
}
