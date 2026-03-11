import { getServiceClient } from './supabase';
import { Trip, Place, OperatingHours } from '@/types';

const supabase = () => getServiceClient();

// ─── Row types matching Supabase snake_case columns ───

interface TripRow {
  id: string;
  user_id: string;
  name: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
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

// ─── Converters ───

function tripRowToModel(row: TripRow, places: Place[] = []): Trip {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    city: row.city,
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,
    startDate: row.start_date ?? undefined,
    endDate: row.end_date ?? undefined,
    isActive: row.is_active,
    places,
  };
}

function placeRowToModel(row: PlaceRow, hours: OperatingHours[] = []): Place {
  return {
    id: row.id,
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
    isPriority: row.is_priority,
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

// ─── Trips ───

export async function getTrips(userId: string): Promise<Trip[]> {
  const { data: rows, error } = await supabase()
    .from('trips')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (rows as TripRow[]).map((r) => tripRowToModel(r));
}

export async function getTripWithPlaces(tripId: string): Promise<Trip | null> {
  const { data: tripRow, error: tripErr } = await supabase()
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .maybeSingle();

  if (tripErr) throw tripErr;
  if (!tripRow) return null;

  const { data: placeRows, error: placesErr } = await supabase()
    .from('places')
    .select('*')
    .eq('trip_id', tripId)
    .order('sort_order');

  if (placesErr) throw placesErr;

  const placeIds = (placeRows as PlaceRow[]).map((p) => p.id);

  let hoursMap = new Map<string, OperatingHours[]>();
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

  const places = (placeRows as PlaceRow[]).map((r) =>
    placeRowToModel(r, hoursMap.get(r.id) ?? [])
  );

  return tripRowToModel(tripRow as TripRow, places);
}

export async function getActiveTrip(userId: string): Promise<Trip | null> {
  const { data: tripRow, error } = await supabase()
    .from('trips')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .maybeSingle();

  if (error) throw error;
  if (!tripRow) return null;

  return getTripWithPlaces((tripRow as TripRow).id);
}

export async function createTrip(
  userId: string,
  data: { name: string; city: string; latitude?: number; longitude?: number; startDate?: string; endDate?: string }
): Promise<Trip> {
  // Deactivate other trips first
  await supabase()
    .from('trips')
    .update({ is_active: false })
    .eq('user_id', userId);

  const { data: row, error } = await supabase()
    .from('trips')
    .insert({
      user_id: userId,
      name: data.name,
      city: data.city,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      start_date: data.startDate ?? null,
      end_date: data.endDate ?? null,
      is_active: true,
    })
    .select()
    .single();

  if (error) throw error;
  return tripRowToModel(row as TripRow, []);
}

export async function updateTrip(
  tripId: string,
  data: Partial<{ name: string; city: string; isActive: boolean }>
): Promise<Trip> {
  const update: Record<string, unknown> = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.city !== undefined) update.city = data.city;
  if (data.isActive !== undefined) update.is_active = data.isActive;

  const { data: row, error } = await supabase()
    .from('trips')
    .update(update)
    .eq('id', tripId)
    .select()
    .single();

  if (error) throw error;
  return tripRowToModel(row as TripRow);
}

export async function deleteTrip(tripId: string): Promise<void> {
  const { error } = await supabase().from('trips').delete().eq('id', tripId);
  if (error) throw error;
}

// ─── Places ───

export async function addPlaceToDB(
  place: Place
): Promise<Place> {
  const { data: row, error } = await supabase()
    .from('places')
    .insert({
      trip_id: place.tripId,
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
      is_priority: place.isPriority,
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
  data: Partial<{ isPriority: boolean; isVisited: boolean; sortOrder: number }>
): Promise<void> {
  const update: Record<string, unknown> = {};
  if (data.isPriority !== undefined) update.is_priority = data.isPriority;
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

// ─── Health check ───

export async function isDBReady(): Promise<boolean> {
  const { error } = await supabase().from('trips').select('id').limit(1);
  return !error;
}
