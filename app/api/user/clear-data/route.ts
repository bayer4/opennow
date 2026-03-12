import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as Record<string, unknown>).id as string;
  const supabase = getServiceClient();

  const { data: trips } = await supabase
    .from('trips')
    .select('id')
    .eq('user_id', userId);

  const tripIds = (trips ?? []).map((t: { id: string }) => t.id);

  if (tripIds.length > 0) {
    const { data: places } = await supabase
      .from('places')
      .select('id')
      .in('trip_id', tripIds);

    const placeIds = (places ?? []).map((p: { id: string }) => p.id);

    if (placeIds.length > 0) {
      await supabase.from('operating_hours').delete().in('place_id', placeIds);
    }

    await supabase.from('places').delete().in('trip_id', tripIds);
    await supabase.from('trips').delete().eq('user_id', userId);
  }

  await supabase.from('user_settings').delete().eq('user_id', userId);

  return NextResponse.json({ ok: true });
}
