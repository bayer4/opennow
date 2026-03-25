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
  const actions: string[] = [];

  // Fix Philadelphia trip coordinates to actual center-city Philly
  const { error: phillyErr } = await supabase
    .from('trips')
    .update({ latitude: 39.9526, longitude: -75.1652 })
    .eq('user_id', userId)
    .eq('city', 'Philadelphia');

  actions.push(phillyErr
    ? `Philly fix error: ${phillyErr.message}`
    : 'Fixed Philadelphia coordinates to center-city (39.95, -75.17)');

  const html = `<!DOCTYPE html>
<html><head><title>Fixing...</title></head>
<body>
<p>Cleaning up... ${JSON.stringify(actions)}</p>
<script>
  // Clear stale caches
  localStorage.removeItem('opennow-last-city');
  localStorage.removeItem('opennow-geo-mappings');
  localStorage.removeItem('opennow-home-base');

  // Set mapping so "Upper Dublin Township" auto-resolves to Ambler
  try {
    var mappings = {};
    try { mappings = JSON.parse(localStorage.getItem('opennow-location-mappings') || '{}'); } catch(e) {}
    mappings['upper dublin township'] = 'Ambler';
    localStorage.setItem('opennow-location-mappings', JSON.stringify(mappings));
  } catch(e) {}

  window.location.href = '/dashboard';
</script>
</body></html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
