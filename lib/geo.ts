export interface GeoPosition {
  latitude: number;
  longitude: number;
}

export interface CityInfo {
  city: string;
  latitude: number;
  longitude: number;
}

const MILES_THRESHOLD = 50;
const EARTH_RADIUS_MILES = 3959;

export function distanceMiles(a: GeoPosition, b: GeoPosition): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(h));
}

export function isAwayFromCity(
  userPos: GeoPosition,
  cityPos: GeoPosition,
): boolean {
  return distanceMiles(userPos, cityPos) > MILES_THRESHOLD;
}

export function getCurrentPosition(): Promise<GeoPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      (err) => reject(err),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  });
}

export async function reverseGeocode(pos: GeoPosition): Promise<string> {
  try {
    const res = await fetch(
      `/api/geo/reverse?lat=${pos.latitude}&lng=${pos.longitude}`,
    );
    if (res.ok) {
      const data = await res.json();
      return data.city || 'Unknown';
    }
  } catch {}
  return 'Unknown';
}

export function loadLastCity(): CityInfo | null {
  try {
    const raw = localStorage.getItem('opennow-city');
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function saveLastCity(city: CityInfo): void {
  try {
    localStorage.setItem('opennow-city', JSON.stringify(city));
  } catch {}
}
