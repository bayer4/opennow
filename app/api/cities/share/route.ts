import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getCityByIdForUser, shareCity, unshareCity } from '@/lib/db';

function slugifyCityName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 40)
    .replace(/^-|-$/g, '');
}

function randomSuffix(length = 4): string {
  return Math.random().toString(36).slice(2, 2 + length);
}

function isUniqueViolation(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const code = (err as { code?: string }).code;
  return code === '23505';
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as Record<string, unknown>).id as string;

  try {
    const body = (await req.json()) as { tripId?: string };
    const tripId = body.tripId;
    if (!tripId) {
      return NextResponse.json({ error: 'tripId is required' }, { status: 400 });
    }

    const city = await getCityByIdForUser(userId, tripId);
    if (!city) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    const baseUrl = req.nextUrl.origin;
    if (city.shareSlug) {
      return NextResponse.json({
        shareSlug: city.shareSlug,
        url: `${baseUrl}/list/${city.shareSlug}`,
      });
    }

    const base = slugifyCityName(city.name) || 'list';

    for (let attempt = 0; attempt < 6; attempt += 1) {
      const slug = `${base}-${randomSuffix(5)}`;
      try {
        await shareCity(tripId, slug);
        return NextResponse.json({
          shareSlug: slug,
          url: `${baseUrl}/list/${slug}`,
        });
      } catch (err: unknown) {
        if (!isUniqueViolation(err)) throw err;
      }
    }

    return NextResponse.json(
      { error: 'Could not generate a unique share link. Please retry.' },
      { status: 500 },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to share city';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as Record<string, unknown>).id as string;

  try {
    const body = (await req.json()) as { tripId?: string };
    const tripId = body.tripId;
    if (!tripId) {
      return NextResponse.json({ error: 'tripId is required' }, { status: 400 });
    }

    const city = await getCityByIdForUser(userId, tripId);
    if (!city) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    await unshareCity(tripId);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to unshare city';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
