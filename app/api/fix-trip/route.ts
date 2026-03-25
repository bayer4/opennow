import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as Record<string, unknown>).id as string;
  const supabase = getServiceClient();

  // Show all trips with place counts
  const { data: trips } = await supabase
    .from('trips')
    .select('id, name, city, latitude, longitude')
    .eq('user_id', userId);

  const tripInfo = [];
  for (const trip of trips ?? []) {
    const { count } = await supabase
      .from('places')
      .select('id', { count: 'exact', head: true })
      .eq('trip_id', trip.id);
    tripInfo.push({
      id: trip.id,
      name: trip.name,
      city: trip.city,
      lat: trip.latitude,
      lng: trip.longitude,
      placeCount: count,
    });
  }

  return NextResponse.json({ trips: tripInfo });
}
