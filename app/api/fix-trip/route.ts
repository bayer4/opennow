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

  // Delete any empty "Ambler" trips that were created as ghosts
  const { data: trips } = await supabase
    .from('trips')
    .select('id, name, city')
    .eq('user_id', userId);

  const cleaned: string[] = [];
  for (const trip of trips ?? []) {
    if (trip.city === 'Ambler' || trip.name === 'Ambler') {
      const { count } = await supabase
        .from('places')
        .select('id', { count: 'exact', head: true })
        .eq('trip_id', trip.id);
      if (count === 0) {
        await supabase.from('trips').delete().eq('id', trip.id);
        cleaned.push(trip.id);
      }
    }
  }

  // Return an HTML page that clears localStorage and redirects
  const html = `<!DOCTYPE html>
<html><head><title>Fixing...</title></head>
<body>
<p>Cleaning up...</p>
<script>
  // Clear stale cached data from the rename
  localStorage.removeItem('opennow-last-city');
  localStorage.removeItem('opennow-location-mappings');
  localStorage.removeItem('opennow-geo-mappings');
  localStorage.removeItem('opennow-home-base');
  // Redirect to dashboard
  window.location.href = '/dashboard';
</script>
</body></html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
