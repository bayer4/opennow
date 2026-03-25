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

  // Find the trip that was renamed to "Ambler" and restore it
  const { data: trips, error: findErr } = await supabase
    .from('trips')
    .select('id, name, city')
    .eq('user_id', userId);

  if (findErr) {
    return NextResponse.json({ error: findErr.message }, { status: 500 });
  }

  const results: string[] = [];

  for (const trip of trips ?? []) {
    results.push(`Found trip: id=${trip.id}, name=${trip.name}, city=${trip.city}`);
  }

  // Fix: rename "Ambler" back to "Upper Dublin Township"
  const amblerTrip = (trips ?? []).find(
    (t) => t.city === 'Ambler' || t.name === 'Ambler',
  );

  if (amblerTrip) {
    const { error: updateErr } = await supabase
      .from('trips')
      .update({ name: 'Upper Dublin Township', city: 'Upper Dublin Township' })
      .eq('id', amblerTrip.id);

    if (updateErr) {
      results.push(`Error fixing: ${updateErr.message}`);
    } else {
      results.push(`Fixed trip ${amblerTrip.id}: renamed back to "Upper Dublin Township"`);
    }
  }

  // Also delete any empty duplicate trips that may have been created
  for (const trip of trips ?? []) {
    if (trip.id === amblerTrip?.id) continue;
    const { count } = await supabase
      .from('places')
      .select('id', { count: 'exact', head: true })
      .eq('trip_id', trip.id);

    if (count === 0) {
      await supabase.from('trips').delete().eq('id', trip.id);
      results.push(`Deleted empty trip: ${trip.name} (${trip.id})`);
    }
  }

  return NextResponse.json({ results });
}
