import { NextRequest, NextResponse } from 'next/server';
import tzlookup from 'tz-lookup';

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get('lat');
  const lng = req.nextUrl.searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 });
  }

  try {
    const timezone = tzlookup(Number(lat), Number(lng));
    return NextResponse.json({ timezone });
  } catch {
    return NextResponse.json({ timezone: null });
  }
}
