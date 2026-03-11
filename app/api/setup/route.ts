import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isDBReady, createTrip, addPlaceToDB } from '@/lib/db';
import { chicagoTrip } from '@/lib/seed-data';

export async function GET() {
  const ready = await isDBReady();
  return NextResponse.json({
    dbReady: ready,
    message: ready
      ? 'Database is connected and tables exist.'
      : 'Tables not found. Run the SQL migration in supabase/migrations/001_initial_schema.sql via the Supabase Dashboard SQL Editor.',
  });
}

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const session = await getServerSession(authOptions);
  const body = await req.json().catch(() => ({}));
  const action = body.action;

  if (action === 'seed') {
    if (!session?.user) {
      return NextResponse.json({ error: 'Sign in first to seed data' }, { status: 401 });
    }

    const userId = (session.user as Record<string, unknown>).id as string;

    try {
      const trip = await createTrip(userId, {
        name: chicagoTrip.name,
        city: chicagoTrip.city,
        latitude: chicagoTrip.latitude,
        longitude: chicagoTrip.longitude,
      });

      let added = 0;
      for (const place of chicagoTrip.places) {
        await addPlaceToDB({ ...place, tripId: trip.id });
        added++;
      }

      return NextResponse.json({
        ok: true,
        tripId: trip.id,
        placesAdded: added,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Seed failed';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
