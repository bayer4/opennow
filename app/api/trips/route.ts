import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getTrips, createTrip } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = (session.user as Record<string, unknown>).id as string;
    const trips = await getTrips(userId);
    return NextResponse.json(trips);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch trips';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = (session.user as Record<string, unknown>).id as string;
    const body = await req.json();
    const { name, city, latitude, longitude, startDate, endDate } = body;

    if (!name || !city) {
      return NextResponse.json({ error: 'name and city required' }, { status: 400 });
    }

    const trip = await createTrip(userId, { name, city, latitude, longitude, startDate, endDate });
    return NextResponse.json(trip, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create trip';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
