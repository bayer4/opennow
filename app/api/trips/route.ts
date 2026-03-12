import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createTrip } from '@/lib/db';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = (session.user as Record<string, unknown>).id as string;
    const body = await req.json();
    const { name, city, latitude, longitude } = body;

    if (!name || !city) {
      return NextResponse.json({ error: 'name and city required' }, { status: 400 });
    }

    const trip = await createTrip(userId, { name, city, latitude, longitude });
    return NextResponse.json(trip, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create trip';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
