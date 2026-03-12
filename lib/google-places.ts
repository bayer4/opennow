import { PlaceSearchResult, PlaceDetails, OperatingHours } from '@/types';

const API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';
const BASE = 'https://places.googleapis.com/v1/places';

const TYPE_TO_CATEGORY: Record<string, string> = {
  restaurant: 'restaurant',
  cafe: 'cafe',
  bar: 'bar',
  bakery: 'cafe',
  meal_takeaway: 'restaurant',
  meal_delivery: 'restaurant',
  night_club: 'bar',
  food: 'restaurant',
};

const TYPE_TO_CUISINE: Record<string, string> = {
  italian_restaurant: 'Italian',
  mexican_restaurant: 'Mexican',
  japanese_restaurant: 'Japanese',
  chinese_restaurant: 'Chinese',
  indian_restaurant: 'Indian',
  thai_restaurant: 'Thai',
  french_restaurant: 'French',
  american_restaurant: 'American',
  pizza_restaurant: 'Pizza',
  seafood_restaurant: 'Seafood',
  steak_house: 'Steakhouse',
  sushi_restaurant: 'Sushi',
  coffee_shop: 'Coffee',
  ice_cream_shop: 'Ice Cream',
  bakery: 'Bakery',
};

/**
 * Search for places by text query using the Google Places API (New).
 * Biases results toward the given location.
 */
export async function searchPlaces(
  query: string,
  locationBias?: { lat: number; lng: number },
  cityName?: string,
): Promise<PlaceSearchResult[]> {
  if (!API_KEY) return [];

  const textQuery = cityName ? `${query} ${cityName}` : query;

  const body: Record<string, unknown> = {
    textQuery,
    maxResultCount: 8,
  };

  if (locationBias) {
    body.locationBias = {
      circle: {
        center: { latitude: locationBias.lat, longitude: locationBias.lng },
        radius: 10000,
      },
    };
  }

  const res = await fetch(`${BASE}:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.formattedAddress,places.types',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) return [];

  const data = await res.json();
  if (!data.places) return [];

  return data.places.map(
    (p: {
      id: string;
      displayName: { text: string };
      formattedAddress: string;
      types: string[];
    }) => ({
      placeId: p.id,
      name: p.displayName.text,
      address: p.formattedAddress,
      types: p.types ?? [],
    })
  );
}

/**
 * Fetch full place details including hours from the Google Places API (New).
 */
export async function getPlaceDetails(
  placeId: string
): Promise<PlaceDetails | null> {
  if (!API_KEY) return null;

  const res = await fetch(`${BASE}/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': [
        'id',
        'displayName',
        'formattedAddress',
        'location',
        'types',
        'rating',
        'priceLevel',
        'regularOpeningHours',
        'photos',
      ].join(','),
    },
  });

  if (!res.ok) return null;
  const p = await res.json();

  const types: string[] = p.types ?? [];
  const category =
    types.find((t: string) => TYPE_TO_CATEGORY[t])
      ? TYPE_TO_CATEGORY[types.find((t: string) => TYPE_TO_CATEGORY[t])!]
      : 'restaurant';
  const cuisine =
    types.find((t: string) => TYPE_TO_CUISINE[t])
      ? TYPE_TO_CUISINE[types.find((t: string) => TYPE_TO_CUISINE[t])!]
      : '';

  const hours = parseGoogleHours(placeId, p.regularOpeningHours);

  const priceLevelMap: Record<string, number> = {
    PRICE_LEVEL_FREE: 0,
    PRICE_LEVEL_INEXPENSIVE: 1,
    PRICE_LEVEL_MODERATE: 2,
    PRICE_LEVEL_EXPENSIVE: 3,
    PRICE_LEVEL_VERY_EXPENSIVE: 4,
  };

  return {
    placeId: p.id,
    name: p.displayName?.text ?? '',
    address: p.formattedAddress ?? '',
    latitude: p.location?.latitude ?? 0,
    longitude: p.location?.longitude ?? 0,
    category,
    cuisine,
    rating: p.rating ?? null,
    priceLevel: p.priceLevel ? (priceLevelMap[p.priceLevel] ?? null) : null,
    photoReference: p.photos?.[0]?.name ?? null,
    hours,
  };
}

/**
 * Convert Google's regularOpeningHours into our OperatingHours format.
 */
function parseGoogleHours(
  placeId: string,
  openingHours?: {
    periods?: Array<{
      open: { day: number; hour: number; minute: number };
      close?: { day: number; hour: number; minute: number };
    }>;
  }
): OperatingHours[] {
  if (!openingHours?.periods) return [];

  const hoursByDay = new Map<number, OperatingHours>();

  // Initialize all 7 days as closed
  for (let d = 0; d < 7; d++) {
    hoursByDay.set(d, {
      id: `${placeId}-${d}`,
      placeId,
      dayOfWeek: d,
      openTime: null,
      closeTime: null,
      isClosed: true,
      isOvernight: false,
    });
  }

  for (const period of openingHours.periods) {
    const openDay = period.open.day;
    const openTime = `${String(period.open.hour).padStart(2, '0')}:${String(period.open.minute).padStart(2, '0')}`;

    if (!period.close) {
      // 24-hour operation
      hoursByDay.set(openDay, {
        id: `${placeId}-${openDay}`,
        placeId,
        dayOfWeek: openDay,
        openTime: '00:00',
        closeTime: '23:59',
        isClosed: false,
        isOvernight: false,
      });
      continue;
    }

    const closeDay = period.close.day;
    const closeTime = `${String(period.close.hour).padStart(2, '0')}:${String(period.close.minute).padStart(2, '0')}`;
    const isOvernight = closeDay !== openDay;

    hoursByDay.set(openDay, {
      id: `${placeId}-${openDay}`,
      placeId,
      dayOfWeek: openDay,
      openTime,
      closeTime,
      isClosed: false,
      isOvernight,
    });
  }

  return Array.from(hoursByDay.values());
}
