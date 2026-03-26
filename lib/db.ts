import { getServiceClient } from './supabase';
import { City, Place, OperatingHours } from '@/types';

const supabase = () => getServiceClient();

// ─── Row types matching Supabase snake_case columns ───

interface TripRow {
  id: string;
  user_id: string;
  name: string;
  city: string;
  share_slug: string | null;
  is_public: boolean;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
}

interface PlaceRow {
  id: string;
  trip_id: string;
  google_place_id: string | null;
  name: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  category: string | null;
  cuisine: string | null;
  rating: number | null;
  price_level: number | null;
  photo_reference: string | null;
  is_priority: boolean;
  is_stashed: boolean | null;
  stashed_at: string | null;
  is_visited: boolean;
  sort_order: number;
  created_at: string;
}

interface HoursRow {
  id: string;
  place_id: string;
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
  is_overnight: boolean;
}

export interface PublicCitySlugEntry {
  citySlug: string;
  cityName: string;
  placeCount: number;
}

export interface PublicCityPlacesResult {
  cityName: string;
  timezone?: string;
  places: Place[];
}

export interface PublicCitySharedListEntry {
  shareSlug: string;
  createdAt: string;
}

export function cityToSlug(cityName: string): string {
  return cityName
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Converters ───

function tripRowToCity(row: TripRow, places: Place[] = []): City {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.city || row.name,
    shareSlug: row.share_slug ?? undefined,
    isPublic: row.is_public,
    latitude: row.latitude ?? 0,
    longitude: row.longitude ?? 0,
    timezone: row.timezone ?? undefined,
    places,
  };
}

function placeRowToModel(row: PlaceRow, hours: OperatingHours[] = []): Place {
  return {
    id: row.id,
    cityId: row.trip_id,
    tripId: row.trip_id,
    googlePlaceId: row.google_place_id ?? undefined,
    name: row.name,
    address: row.address ?? undefined,
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,
    category: row.category ?? undefined,
    cuisine: row.cuisine ?? undefined,
    rating: row.rating ?? undefined,
    priceLevel: row.price_level ?? undefined,
    photoReference: row.photo_reference ?? undefined,
    isStashed: row.is_stashed ?? false,
    stashedAt: row.stashed_at ?? undefined,
    isFavorite: row.is_priority ?? false,
    isVisited: row.is_visited,
    sortOrder: row.sort_order,
    hours,
  };
}

function hoursRowToModel(row: HoursRow): OperatingHours {
  return {
    id: row.id,
    placeId: row.place_id,
    dayOfWeek: row.day_of_week,
    openTime: row.open_time ? row.open_time.slice(0, 5) : null,
    closeTime: row.close_time ? row.close_time.slice(0, 5) : null,
    isClosed: row.is_closed,
    isOvernight: row.is_overnight,
  };
}

// ─── Internal: load places + hours for a trip ───

async function loadPlacesForTrip(tripId: string): Promise<Place[]> {
  const { data: placeRows, error: placesErr } = await supabase()
    .from('places')
    .select('*')
    .eq('trip_id', tripId)
    .order('sort_order');

  if (placesErr) throw placesErr;

  const placeIds = (placeRows as PlaceRow[]).map((p) => p.id);

  const hoursMap = new Map<string, OperatingHours[]>();
  if (placeIds.length > 0) {
    const { data: hoursRows, error: hoursErr } = await supabase()
      .from('operating_hours')
      .select('*')
      .in('place_id', placeIds);

    if (hoursErr) throw hoursErr;

    for (const row of hoursRows as HoursRow[]) {
      const list = hoursMap.get(row.place_id) ?? [];
      list.push(hoursRowToModel(row));
      hoursMap.set(row.place_id, list);
    }
  }

  return (placeRows as PlaceRow[]).map((r) =>
    placeRowToModel(r, hoursMap.get(r.id) ?? []),
  );
}

async function loadPublicPlacesForTrip(tripId: string): Promise<Place[]> {
  const { data: placeRows, error: placesErr } = await supabase()
    .from('places')
    .select('*')
    .eq('trip_id', tripId)
    .or('is_stashed.is.null,is_stashed.eq.false')
    .order('sort_order');

  if (placesErr) throw placesErr;

  const placeIds = (placeRows as PlaceRow[]).map((p) => p.id);
  const hoursMap = new Map<string, OperatingHours[]>();

  if (placeIds.length > 0) {
    const { data: hoursRows, error: hoursErr } = await supabase()
      .from('operating_hours')
      .select('*')
      .in('place_id', placeIds);

    if (hoursErr) throw hoursErr;

    for (const hoursRow of hoursRows as HoursRow[]) {
      const list = hoursMap.get(hoursRow.place_id) ?? [];
      list.push(hoursRowToModel(hoursRow));
      hoursMap.set(hoursRow.place_id, list);
    }
  }

  return (placeRows as PlaceRow[]).map((r) =>
    placeRowToModel(r, hoursMap.get(r.id) ?? []),
  );
}

function dedupePlaceKey(place: Place): string {
  if (place.googlePlaceId) return `g:${place.googlePlaceId.toLowerCase()}`;
  return `n:${place.name.trim().toLowerCase()}|a:${(place.address ?? '').trim().toLowerCase()}`;
}

function countDedupeKeyFromRow(
  row: { google_place_id: string | null; name: string; address: string | null },
): string {
  if (row.google_place_id) return `g:${row.google_place_id.toLowerCase()}`;
  return `n:${row.name.trim().toLowerCase()}|a:${(row.address ?? '').trim().toLowerCase()}`;
}

// ─── Cities (backed by the trips table) ───

export async function getOrCreateCity(
  userId: string,
  cityName: string,
  latitude?: number,
  longitude?: number,
  timezone?: string,
): Promise<City> {
  const { data: existing, error: findErr } = await supabase()
    .from('trips')
    .select('*')
    .eq('user_id', userId)
    .eq('city', cityName)
    .maybeSingle();

  if (findErr) throw findErr;

  let tripRow: TripRow;

  if (existing) {
    tripRow = existing as TripRow;
    const updates: Record<string, unknown> = {};
    if (!tripRow.is_active) updates.is_active = true;
    if (!tripRow.timezone && timezone) updates.timezone = timezone;
    if (Object.keys(updates).length > 0) {
      const { error: updErr } = await supabase().from('trips').update(updates).eq('id', tripRow.id);
      if (!updErr) {
        if (updates.is_active) tripRow.is_active = true;
        if (updates.timezone) tripRow.timezone = timezone ?? null;
      }
    }
  } else {
    const insertPayload: Record<string, unknown> = {
      user_id: userId,
      name: cityName,
      city: cityName,
      latitude: latitude ?? null,
      longitude: longitude ?? null,
      is_active: true,
    };
    if (timezone) insertPayload.timezone = timezone;

    let { data: newRow, error: createErr } = await supabase()
      .from('trips')
      .insert(insertPayload)
      .select()
      .single();

    // Retry without timezone if column doesn't exist yet
    if (createErr && timezone) {
      delete insertPayload.timezone;
      const retry = await supabase()
        .from('trips')
        .insert(insertPayload)
        .select()
        .single();
      newRow = retry.data;
      createErr = retry.error;
    }

    if (createErr) throw createErr;
    tripRow = newRow as TripRow;
  }

  const places = await loadPlacesForTrip(tripRow.id);
  return tripRowToCity(tripRow, places);
}

export async function getActiveCityForUser(userId: string): Promise<City | null> {
  const { data: tripRow, error } = await supabase()
    .from('trips')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .maybeSingle();

  if (error) throw error;
  if (!tripRow) return null;

  const row = tripRow as TripRow;
  const places = await loadPlacesForTrip(row.id);
  return tripRowToCity(row, places);
}

export async function getCityByIdForUser(
  userId: string,
  tripId: string,
): Promise<City | null> {
  const { data: tripRow, error } = await supabase()
    .from('trips')
    .select('*')
    .eq('user_id', userId)
    .eq('id', tripId)
    .maybeSingle();

  if (error) throw error;
  if (!tripRow) return null;

  const row = tripRow as TripRow;
  const places = await loadPlacesForTrip(row.id);
  return tripRowToCity(row, places);
}

export async function shareCity(tripId: string, slug: string): Promise<void> {
  const { error } = await supabase()
    .from('trips')
    .update({
      share_slug: slug,
      is_public: true,
    })
    .eq('id', tripId);

  if (error) throw error;
}

export async function unshareCity(tripId: string): Promise<void> {
  const { error } = await supabase()
    .from('trips')
    .update({
      share_slug: null,
      is_public: false,
    })
    .eq('id', tripId);

  if (error) throw error;
}

export async function getPublicCityBySlug(slug: string): Promise<City | null> {
  const { data: tripRow, error } = await supabase()
    .from('trips')
    .select('*')
    .eq('share_slug', slug)
    .eq('is_public', true)
    .maybeSingle();

  if (error) throw error;
  if (!tripRow) return null;

  const row = tripRow as TripRow;
  const places = await loadPublicPlacesForTrip(row.id);
  return tripRowToCity(row, places);
}

export async function getPublicCitySlugs(): Promise<PublicCitySlugEntry[]> {
  const { data: tripsData, error: tripsErr } = await supabase()
    .from('trips')
    .select('id, city')
    .eq('is_public', true)
    .not('city', 'is', null);

  if (tripsErr) throw tripsErr;
  if (!tripsData || tripsData.length === 0) return [];

  const tripRows = tripsData as Array<{ id: string; city: string }>;
  const cityGroups = new Map<
    string,
    { cityName: string; tripIds: string[] }
  >();
  const tripToCityKey = new Map<string, string>();

  for (const row of tripRows) {
    const cityName = row.city.trim();
    if (!cityName) continue;
    const groupKey = cityName.toLowerCase();
    const existing = cityGroups.get(groupKey);
    if (existing) {
      existing.tripIds.push(row.id);
    } else {
      cityGroups.set(groupKey, { cityName, tripIds: [row.id] });
    }
    tripToCityKey.set(row.id, groupKey);
  }

  const tripIds = tripRows.map((r) => r.id);
  const { data: placeRowsData, error: placesErr } = await supabase()
    .from('places')
    .select('trip_id, google_place_id, name, address, is_stashed')
    .in('trip_id', tripIds)
    .or('is_stashed.is.null,is_stashed.eq.false');

  if (placesErr) throw placesErr;

  const dedupeByCity = new Map<string, Set<string>>();
  for (const cityKey of cityGroups.keys()) {
    dedupeByCity.set(cityKey, new Set<string>());
  }

  for (const row of (placeRowsData ?? []) as Array<{
    trip_id: string;
    google_place_id: string | null;
    name: string;
    address: string | null;
    is_stashed: boolean | null;
  }>) {
    const cityKey = tripToCityKey.get(row.trip_id);
    if (!cityKey) continue;
    const placeKey = countDedupeKeyFromRow(row);
    dedupeByCity.get(cityKey)?.add(placeKey);
  }

  return Array.from(cityGroups.entries())
    .map(([cityKey, group]) => ({
      citySlug: cityToSlug(group.cityName),
      cityName: group.cityName,
      placeCount: dedupeByCity.get(cityKey)?.size ?? 0,
    }))
    .filter((entry) => entry.placeCount >= 3)
    .sort((a, b) => b.placeCount - a.placeCount || a.cityName.localeCompare(b.cityName));
}

export async function getPublicPlacesForCity(
  cityName: string,
): Promise<PublicCityPlacesResult | null> {
  const { data: tripRowsData, error: tripsErr } = await supabase()
    .from('trips')
    .select('*')
    .eq('is_public', true)
    .ilike('city', cityName)
    .order('created_at', { ascending: false });

  if (tripsErr) throw tripsErr;
  if (!tripRowsData || tripRowsData.length === 0) return null;

  const tripRows = tripRowsData as TripRow[];
  const deduped = new Map<string, Place>();

  for (const row of tripRows) {
    const places = await loadPublicPlacesForTrip(row.id);
    for (const place of places) {
      const key = dedupePlaceKey(place);
      const existing = deduped.get(key);
      if (!existing) {
        deduped.set(key, place);
        continue;
      }
      if (place.hours.length > existing.hours.length) {
        deduped.set(key, place);
      }
    }
  }

  const places = Array.from(deduped.values());
  if (places.length === 0) return null;

  const timezone =
    tripRows.find((row) => row.timezone)?.timezone ?? undefined;

  return {
    cityName: tripRows[0].city,
    timezone,
    places,
  };
}

export async function getPublicSharedListsForCity(
  cityName: string,
): Promise<PublicCitySharedListEntry[]> {
  const { data: rows, error } = await supabase()
    .from('trips')
    .select('share_slug, created_at')
    .eq('is_public', true)
    .ilike('city', cityName)
    .not('share_slug', 'is', null)
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (!rows) return [];

  return (rows as Array<{ share_slug: string | null; created_at: string }>)
    .flatMap((row) =>
      row.share_slug
        ? [{ shareSlug: row.share_slug, createdAt: row.created_at }]
        : [],
    );
}

export interface PublicCitySitemapEntry {
  shareSlug: string;
  createdAt: string;
}

export async function getPublicCitySitemapEntries(): Promise<
  PublicCitySitemapEntry[]
> {
  const { data: rows, error } = await supabase()
    .from('trips')
    .select('share_slug, created_at')
    .eq('is_public', true)
    .not('share_slug', 'is', null);

  if (error) throw error;
  if (!rows) return [];

  return (rows as Array<{ share_slug: string | null; created_at: string }>).flatMap(
    (row) =>
      row.share_slug
        ? [{ shareSlug: row.share_slug, createdAt: row.created_at }]
        : [],
  );
}

// ─── Places ───

export async function addPlaceToDB(place: Place): Promise<Place> {
  const tripId = place.tripId || place.cityId;
  if (!tripId) throw new Error('place must have cityId or tripId');

  const { data: row, error } = await supabase()
    .from('places')
    .insert({
      trip_id: tripId,
      google_place_id: place.googlePlaceId ?? null,
      name: place.name,
      address: place.address ?? null,
      latitude: place.latitude ?? null,
      longitude: place.longitude ?? null,
      category: place.category ?? null,
      cuisine: place.cuisine ?? null,
      rating: place.rating ?? null,
      price_level: place.priceLevel ?? null,
      photo_reference: place.photoReference ?? null,
      is_priority: place.isFavorite ?? false,
      is_stashed: place.isStashed ?? false,
      stashed_at: place.stashedAt ?? null,
      is_visited: place.isVisited,
      sort_order: place.sortOrder,
    })
    .select()
    .single();

  if (error) throw error;

  const placeRow = row as PlaceRow;
  let hours: OperatingHours[] = [];

  if (place.hours.length > 0) {
    const hoursInsert = place.hours.map((h) => ({
      place_id: placeRow.id,
      day_of_week: h.dayOfWeek,
      open_time: h.openTime,
      close_time: h.closeTime,
      is_closed: h.isClosed,
      is_overnight: h.isOvernight,
    }));

    const { data: hoursRows, error: hoursErr } = await supabase()
      .from('operating_hours')
      .insert(hoursInsert)
      .select();

    if (hoursErr) throw hoursErr;
    hours = (hoursRows as HoursRow[]).map(hoursRowToModel);
  }

  return placeRowToModel(placeRow, hours);
}

export async function updatePlace(
  placeId: string,
  data: Partial<{
    isPriority: boolean;
    isFavorite: boolean;
    isStashed: boolean;
    stashedAt: string | null;
    isVisited: boolean;
    sortOrder: number;
  }>,
): Promise<void> {
  const update: Record<string, unknown> = {};
  if (data.isPriority !== undefined) update.is_priority = data.isPriority;
  if (data.isFavorite !== undefined) update.is_priority = data.isFavorite;
  if (data.isStashed !== undefined) update.is_stashed = data.isStashed;
  if (data.stashedAt !== undefined) update.stashed_at = data.stashedAt;
  if (data.isVisited !== undefined) update.is_visited = data.isVisited;
  if (data.sortOrder !== undefined) update.sort_order = data.sortOrder;

  const { error } = await supabase()
    .from('places')
    .update(update)
    .eq('id', placeId);

  if (error) throw error;
}

export async function deletePlace(placeId: string): Promise<void> {
  const { error } = await supabase().from('places').delete().eq('id', placeId);
  if (error) throw error;
}

export async function restockStashedPlaces(tripId: string): Promise<void> {
  const { error } = await supabase()
    .from('places')
    .update({ is_stashed: false, stashed_at: null })
    .eq('trip_id', tripId)
    .eq('is_stashed', true);

  if (error) throw error;
}

// ─── City summaries (for recent-cities list) ───

export interface CitySummary {
  name: string;
  latitude: number;
  longitude: number;
  placeCount: number;
}

export async function getAllCitySummaries(
  userId: string,
): Promise<CitySummary[]> {
  const { data: rows, error } = await supabase()
    .from('trips')
    .select('city, latitude, longitude, places(count)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (!rows) return [];

  return (rows as Array<{
    city: string;
    latitude: number | null;
    longitude: number | null;
    places: Array<{ count: number }>;
  }>).map((r) => ({
    name: r.city,
    latitude: r.latitude ?? 0,
    longitude: r.longitude ?? 0,
    placeCount: r.places?.[0]?.count ?? 0,
  }));
}

// ─── Legacy trip functions (used by setup/seed) ───

export async function createTrip(
  userId: string,
  data: {
    name: string;
    city: string;
    latitude?: number;
    longitude?: number;
  },
) {
  const { data: row, error } = await supabase()
    .from('trips')
    .insert({
      user_id: userId,
      name: data.name,
      city: data.city,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      is_active: true,
    })
    .select()
    .single();

  if (error) throw error;
  return { id: (row as TripRow).id };
}

// ─── Health check ───

export async function isDBReady(): Promise<boolean> {
  const { error } = await supabase().from('trips').select('id').limit(1);
  return !error;
}
