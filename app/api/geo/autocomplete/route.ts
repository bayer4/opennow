import { NextRequest, NextResponse } from 'next/server';

interface Suggestion {
  placeId: string;
  name: string;
  description: string;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const referer = 'https://getopennow.com';
    const res = await fetch(
      'https://places.googleapis.com/v1/places:autocomplete',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'Referer': referer,
        },
        body: JSON.stringify({
          input: q,
          includedPrimaryTypes: ['locality', 'administrative_area_level_3'],
        }),
      },
    );

    if (!res.ok) {
      return NextResponse.json({ suggestions: [] });
    }

    const data = await res.json();
    const suggestions: Suggestion[] = (data.suggestions ?? [])
      .filter((s: Record<string, unknown>) => s.placePrediction)
      .slice(0, 6)
      .map(
        (s: {
          placePrediction: {
            placeId: string;
            text: { text: string };
            structuredFormat: {
              mainText: { text: string };
              secondaryText?: { text: string };
            };
          };
        }) => ({
          placeId: s.placePrediction.placeId,
          name: s.placePrediction.structuredFormat.mainText.text,
          description:
            s.placePrediction.structuredFormat.secondaryText?.text ??
            s.placePrediction.text.text,
        }),
      );

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
