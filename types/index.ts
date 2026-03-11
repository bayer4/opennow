export type PlaceStatus = 'open' | 'closed' | 'closing_soon' | 'opening_soon' | 'closed_today';

export interface StatusInfo {
  status: PlaceStatus;
  timeLeft?: string;
  opensIn?: string;
  closesAt?: string;
  opensAt?: string;
  urgency: number;
}

export interface OperatingHours {
  id: string;
  placeId: string;
  dayOfWeek: number; // 0=Sunday, 1=Monday, ... 6=Saturday
  openTime: string | null; // "HH:MM" format, null if closed
  closeTime: string | null;
  isClosed: boolean;
  isOvernight: boolean;
}

export interface Place {
  id: string;
  cityId: string;
  googlePlaceId?: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  category?: string;
  cuisine?: string;
  rating?: number;
  priceLevel?: number;
  photoReference?: string;
  isStashed: boolean;
  stashedAt?: string; // ISO timestamp of when it was stashed
  isVisited: boolean;
  sortOrder: number;
  hours: OperatingHours[];

  /** @deprecated kept for backward compat during migration */
  tripId?: string;
  isPriority?: boolean;
}

export interface City {
  id: string;
  userId: string;
  name: string;
  latitude: number;
  longitude: number;
  places: Place[];
}

/** @deprecated — use City instead. Kept for seed data compat. */
export interface Trip {
  id: string;
  userId: string;
  name: string;
  city: string;
  latitude?: number;
  longitude?: number;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  places: Place[];
}

export interface PlaceWithStatus extends Place {
  statusInfo: StatusInfo;
  todayHours: OperatingHours | null;
}

export interface PlaceSearchResult {
  placeId: string;
  name: string;
  address: string;
  types: string[];
}

export interface PlaceDetails {
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  cuisine: string;
  rating: number | null;
  priceLevel: number | null;
  photoReference: string | null;
  hours: OperatingHours[];
}
