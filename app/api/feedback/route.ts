import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, message, cityName } = body as {
    type: string;
    message: string;
    cityName?: string;
  };

  if (!type || !message?.trim()) {
    return NextResponse.json(
      { error: 'type and message are required' },
      { status: 400 },
    );
  }

  if (!['bug', 'feature', 'comment'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  let userId: string | null = null;
  try {
    const session = await getServerSession(authOptions);
    if (session?.user) {
      userId = (session.user as Record<string, unknown>).id as string;
    }
  } catch {}

  const supabase = getServiceClient();
  const { error } = await supabase.from('feedback').insert({
    user_id: userId,
    type,
    message: message.trim(),
    city_name: cityName ?? null,
  });

  if (error) {
    return NextResponse.json(
      { error: 'Failed to save feedback' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
