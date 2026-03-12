import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getOrCreateCity, getActiveCityForUser, restockStashedPlaces } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as Record<string, unknown>).id as string;
  const cityName = req.nextUrl.searchParams.get('name');
  const lat = req.nextUrl.searchParams.get('lat');
  const lng = req.nextUrl.searchParams.get('lng');
  const restock = req.nextUrl.searchParams.get('restock') === '1';

  try {
    let city;

    if (cityName && cityName !== 'Unknown') {
      city = await getOrCreateCity(
        userId,
        cityName,
        lat ? Number(lat) : undefined,
        lng ? Number(lng) : undefined,
      );
    } else {
      city = await getActiveCityForUser(userId);
      if (!city) {
        return NextResponse.json({ city: null });
      }
    }

    if (restock && city) {
      await restockStashedPlaces(city.id);
      city.places = city.places.map((p) => ({
        ...p,
        isStashed: false,
        stashedAt: undefined,
      }));
    }

    return NextResponse.json({ city });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to load city';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
