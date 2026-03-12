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

  try {
    const { data } = await getServiceClient()
      .from('user_settings')
      .select('home_base')
      .eq('user_id', userId)
      .maybeSingle();

    return NextResponse.json({ homeBase: data?.home_base ?? null });
  } catch {
    return NextResponse.json({ homeBase: null });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as Record<string, unknown>).id as string;
  const { homeBase } = await req.json();

  try {
    await getServiceClient()
      .from('user_settings')
      .upsert({
        user_id: userId,
        home_base: homeBase,
        updated_at: new Date().toISOString(),
      });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
