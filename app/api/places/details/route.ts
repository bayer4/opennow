import { NextRequest, NextResponse } from 'next/server';
import { getPlaceDetails } from '@/lib/google-places';

export async function GET(req: NextRequest) {
  const placeId = req.nextUrl.searchParams.get('placeId');
  if (!placeId) {
    return NextResponse.json({ error: 'placeId required' }, { status: 400 });
  }

  const details = await getPlaceDetails(placeId);
  if (!details) {
    return NextResponse.json({ error: 'Place not found' }, { status: 404 });
  }

  return NextResponse.json(details);
}
