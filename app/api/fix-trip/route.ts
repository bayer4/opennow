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

  const { data: trips } = await supabase
    .from('trips')
    .select('id, name, city')
    .eq('user_id', userId);

  const actions: string[] = [];

  // The trip with places was originally "Ambler" — rename it back
  const udtTrip = (trips ?? []).find(
    (t) => t.city === 'Upper Dublin Township',
  );
  if (udtTrip) {
    await supabase
      .from('trips')
      .update({ name: 'Ambler', city: 'Ambler' })
      .eq('id', udtTrip.id);
    actions.push(`Renamed "${udtTrip.name}" back to "Ambler"`);
  }

  // Delete any empty ghost trips (Ambler or Upper Dublin Township with 0 places)
  for (const trip of trips ?? []) {
    if (trip.id === udtTrip?.id) continue;
    if (trip.city === 'Ambler' || trip.city === 'Upper Dublin Township') {
      const { count } = await supabase
        .from('places')
        .select('id', { count: 'exact', head: true })
        .eq('trip_id', trip.id);
      if (count === 0) {
        await supabase.from('trips').delete().eq('id', trip.id);
        actions.push(`Deleted empty ghost trip: ${trip.name} (${trip.id})`);
      }
    }
  }

  const html = `<!DOCTYPE html>
<html><head><title>Fixing...</title></head>
<body>
<p>Cleaning up...</p>
<script>
  localStorage.removeItem('opennow-last-city');
  localStorage.removeItem('opennow-location-mappings');
  localStorage.removeItem('opennow-geo-mappings');
  localStorage.removeItem('opennow-home-base');
  window.location.href = '/dashboard';
</script>
</body></html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
