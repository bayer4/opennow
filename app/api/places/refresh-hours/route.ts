import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { getPlaceDetails } from '@/lib/google-places';

/**
 * POST /api/places/refresh-hours
 * Re-fetches operating hours from Google for all places belonging to a trip.
 * Body: { tripId: string }
 */
export async function POST(req: NextRequest) {
  const { tripId } = await req.json();
  if (!tripId) {
    return NextResponse.json({ error: 'tripId required' }, { status: 400 });
  }

  const supabase = getServiceClient();

  const { data: places, error: fetchErr } = await supabase
    .from('places')
    .select('id, google_place_id')
    .eq('trip_id', tripId);

  if (fetchErr) {
    return NextResponse.json({ error: fetchErr.message }, { status: 500 });
  }

  let updated = 0;

  for (const place of (places ?? [])) {
    if (!place.google_place_id) continue;

    const details = await getPlaceDetails(place.google_place_id);
    if (!details || details.hours.length === 0) continue;

    const { error: delErr } = await supabase
      .from('operating_hours')
      .delete()
      .eq('place_id', place.id);

    if (delErr) continue;

    const rows = details.hours.map((h) => ({
      place_id: place.id,
      day_of_week: h.dayOfWeek,
      open_time: h.openTime,
      close_time: h.closeTime,
      is_closed: h.isClosed,
      is_overnight: h.isOvernight,
    }));

    const { error: insErr } = await supabase
      .from('operating_hours')
      .insert(rows);

    if (!insErr) updated++;
  }

  return NextResponse.json({ updated, total: places?.length ?? 0 });
}
