import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { addPlaceToDB } from '@/lib/db';
import { Place } from '@/types';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id: tripId } = await params;
    const body = await req.json();

    const place: Place = {
      id: '',
      cityId: tripId,
      tripId,
      googlePlaceId: body.googlePlaceId,
      name: body.name,
      address: body.address,
      latitude: body.latitude,
      longitude: body.longitude,
      category: body.category,
      cuisine: body.cuisine,
      rating: body.rating,
      priceLevel: body.priceLevel,
      photoReference: body.photoReference,
      isStashed: body.isStashed ?? false,
      isVisited: body.isVisited ?? false,
      sortOrder: body.sortOrder ?? 0,
      hours: body.hours ?? [],
    };

    const saved = await addPlaceToDB(place);
    return NextResponse.json(saved, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to add place';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
