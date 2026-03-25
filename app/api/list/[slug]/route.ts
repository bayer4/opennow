import { NextResponse } from 'next/server';
import { getPublicCityBySlug } from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const city = await getPublicCityBySlug(slug);
    if (!city) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ city });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to load list';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
