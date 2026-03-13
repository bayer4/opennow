import { NextRequest, NextResponse } from 'next/server';
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

  try {
    const { data } = await supabase
      .from('user_settings')
      .select('location_mappings')
      .eq('user_id', userId)
      .maybeSingle();

    return NextResponse.json({
      mappings: data?.location_mappings ?? {},
    });
  } catch {
    return NextResponse.json({ mappings: {} });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as Record<string, unknown>).id as string;
  const body = await req.json();
  const mappings = body.mappings ?? {};

  const supabase = getServiceClient();

  try {
    await supabase.from('user_settings').upsert(
      {
        user_id: userId,
        location_mappings: mappings,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );
  } catch {}

  return NextResponse.json({ ok: true });
}
