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
  isOvernight: boolean; // for places closing after midnight
}

export interface Place {
  id: string;
  tripId: string;
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
  isPriority: boolean;
  isVisited: boolean;
  sortOrder: number;
  hours: OperatingHours[];
}

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
