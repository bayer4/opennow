import { create } from 'zustand';
import { City, Place } from '@/types';

// ─── Guest multi-city localStorage ───

const GUEST_CITIES_KEY = 'opennow-guest-cities';
const OLD_GUEST_CITY_KEY = 'opennow-guest-city';

function saveGuestCity(city: City | null) {
  if (!city) return;
  try {
    const raw = localStorage.getItem(GUEST_CITIES_KEY);
    const cities: Record<string, City> = raw ? JSON.parse(raw) : {};
    cities[city.id] = city;
    localStorage.setItem(GUEST_CITIES_KEY, JSON.stringify(cities));
  } catch {}
}

export function loadGuestCity(cityId?: string): City | null {
  try {
    const raw = localStorage.getItem(GUEST_CITIES_KEY);
    if (raw) {
      const cities: Record<string, City> = JSON.parse(raw);
      if (cityId) return cities[cityId] ?? null;
      const values = Object.values(cities);
      return values.length > 0 ? values[0] : null;
    }
    // Migrate from old single-city format
    const oldRaw = localStorage.getItem(OLD_GUEST_CITY_KEY);
    if (oldRaw) {
      const city: City = JSON.parse(oldRaw);
      saveGuestCity(city);
      localStorage.removeItem(OLD_GUEST_CITY_KEY);
      return city;
    }
  } catch {}
  return null;
}

export function loadAllGuestCities(): City[] {
  try {
    const raw = localStorage.getItem(GUEST_CITIES_KEY);
    if (raw) {
      return Object.values(JSON.parse(raw) as Record<string, City>);
    }
  } catch {}
  return [];
}

export function loadGuestCityByName(name: string): City | null {
  try {
    const raw = localStorage.getItem(GUEST_CITIES_KEY);
    if (raw) {
      const cities: Record<string, City> = JSON.parse(raw);
      const id = name.toLowerCase().replace(/\s+/g, '-');
      return (
        cities[id] ??
        Object.values(cities).find((c) => c.name === name) ??
        null
      );
    }
  } catch {}
  return null;
}

function persistAfterMutation(state: {
  activeCity: City | null;
  isGuest: boolean;
}) {
  if (state.isGuest && state.activeCity) {
    saveGuestCity(state.activeCity);
  }
}

function persistPlace(
  placeId: string,
  data: Record<string, unknown>,
  isGuest: boolean,
) {
  if (isGuest) return;
  fetch(`/api/places/${placeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(() => {});
}

function deletePersistedPlace(placeId: string, isGuest: boolean) {
  if (isGuest) return;
  fetch(`/api/places/${placeId}`, { method: 'DELETE' }).catch(() => {});
}

// ─── Planning mode snapshot (module-level, not persisted) ───

let gpsCitySnapshot: City | null = null;

// ─── Store ───

interface AppState {
  activeCity: City | null;
  theme: 'dark' | 'light';
  showClosedPlaces: boolean;
  showStashedPlaces: boolean;
  currentTime: Date;
  isLoading: boolean;
  isGuest: boolean;
  detectedCityName: string | null;
  homeBase: string | null;
  isPlanningMode: boolean;

  setActiveCity: (city: City) => void;
  setDetectedCityName: (name: string) => void;
  setLoading: (loading: boolean) => void;
  setGuest: (guest: boolean) => void;
  setHomeBase: (city: string) => void;
  browseCity: (city: City) => void;
  exitPlanningMode: () => void;
  addPlace: (place: Place) => void;
  removePlace: (placeId: string) => void;
  stashPlace: (placeId: string) => void;
  unstashPlace: (placeId: string) => void;
  toggleFavorite: (placeId: string) => void;
  restockAllStashed: () => void;
  clearAllData: () => void;
  toggleTheme: () => void;
  toggleClosedPlaces: () => void;
  toggleStashedPlaces: () => void;
  tick: () => void;
}

function deduplicatePlaces(places: Place[]): Place[] {
  const seen = new Set<string>();
  return places.filter((p) => {
    const key = p.googlePlaceId || p.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const useAppStore = create<AppState>((set, get) => ({
  activeCity: null,
  theme:
    typeof window !== 'undefined' &&
    localStorage.getItem('opennow-theme') === 'light'
      ? 'light'
      : 'dark',
  showClosedPlaces: false,
  showStashedPlaces: false,
  currentTime: new Date(),
  isLoading: true,
  isGuest: false,
  detectedCityName: null,
  homeBase:
    typeof window !== 'undefined'
      ? localStorage.getItem('opennow-home-base')
      : null,
  isPlanningMode: false,

  setActiveCity: (city) => {
    const deduped = deduplicatePlaces(city.places);
    const cleaned =
      deduped.length < city.places.length ? { ...city, places: deduped } : city;
    set({ activeCity: cleaned, isLoading: false });
    if (get().isGuest) saveGuestCity(cleaned);
  },

  setDetectedCityName: (name) => set({ detectedCityName: name }),
  setLoading: (loading) => set({ isLoading: loading }),
  setGuest: (guest) => set({ isGuest: guest }),

  setHomeBase: (city) => {
    try {
      localStorage.setItem('opennow-home-base', city);
    } catch {}
    set({ homeBase: city });
    if (!get().isGuest) {
      fetch('/api/user/home-base', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ homeBase: city }),
      }).catch(() => {});
    }
  },

  browseCity: (city) => {
    const state = get();
    if (state.isGuest && state.activeCity) {
      saveGuestCity(state.activeCity);
    }
    if (!state.isPlanningMode && state.activeCity) {
      gpsCitySnapshot = state.activeCity;
    }
    const deduped = deduplicatePlaces(city.places);
    const cleaned =
      deduped.length < city.places.length ? { ...city, places: deduped } : city;
    set({ activeCity: cleaned, isPlanningMode: true, isLoading: false });
    if (state.isGuest) saveGuestCity(cleaned);
  },

  exitPlanningMode: () => {
    const state = get();
    if (state.isGuest && state.activeCity) {
      saveGuestCity(state.activeCity);
    }
    if (gpsCitySnapshot) {
      const fresh = state.isGuest
        ? loadGuestCity(gpsCitySnapshot.id) ?? gpsCitySnapshot
        : gpsCitySnapshot;
      set({ activeCity: fresh, isPlanningMode: false });
      gpsCitySnapshot = null;
    } else {
      set({ isPlanningMode: false });
    }
  },

  addPlace: (place) => {
    const city = get().activeCity;
    if (!city) return;
    const gpid = place.googlePlaceId || place.id;
    const exists = city.places.some(
      (p) =>
        p.id === place.id ||
        (p.googlePlaceId && p.googlePlaceId === gpid),
    );
    if (exists) return;
    const updated = {
      ...city,
      places: [...city.places, { ...place, sortOrder: city.places.length }],
    };
    set({ activeCity: updated });
    persistAfterMutation({ activeCity: updated, isGuest: get().isGuest });
    try { localStorage.setItem('opennow-has-added-before', '1'); } catch {}
  },

  removePlace: (placeId) => {
    const city = get().activeCity;
    if (!city) return;
    deletePersistedPlace(placeId, get().isGuest);
    const updated = {
      ...city,
      places: city.places.filter((p) => p.id !== placeId),
    };
    set({ activeCity: updated });
    persistAfterMutation({ activeCity: updated, isGuest: get().isGuest });
  },

  stashPlace: (placeId) => {
    const city = get().activeCity;
    if (!city) return;
    const stashedAt = new Date().toISOString();
    persistPlace(placeId, { isStashed: true, stashedAt }, get().isGuest);
    const updated = {
      ...city,
      places: city.places.map((p) =>
        p.id === placeId ? { ...p, isStashed: true, stashedAt } : p,
      ),
    };
    set({ activeCity: updated });
    persistAfterMutation({ activeCity: updated, isGuest: get().isGuest });
  },

  unstashPlace: (placeId) => {
    const city = get().activeCity;
    if (!city) return;
    persistPlace(placeId, { isStashed: false, stashedAt: null }, get().isGuest);
    const updated = {
      ...city,
      places: city.places.map((p) =>
        p.id === placeId
          ? { ...p, isStashed: false, stashedAt: undefined }
          : p,
      ),
    };
    set({ activeCity: updated });
    persistAfterMutation({ activeCity: updated, isGuest: get().isGuest });
  },

  toggleFavorite: (placeId) => {
    const city = get().activeCity;
    if (!city) return;
    const place = city.places.find((p) => p.id === placeId);
    if (!place) return;
    const next = !place.isFavorite;
    persistPlace(placeId, { isFavorite: next }, get().isGuest);
    const updated = {
      ...city,
      places: city.places.map((p) =>
        p.id === placeId ? { ...p, isFavorite: next } : p,
      ),
    };
    set({ activeCity: updated });
    persistAfterMutation({ activeCity: updated, isGuest: get().isGuest });
  },

  restockAllStashed: () => {
    const city = get().activeCity;
    if (!city) return;
    const hasStashed = city.places.some((p) => p.isStashed);
    if (!hasStashed) return;
    const updated = {
      ...city,
      places: city.places.map((p) =>
        p.isStashed ? { ...p, isStashed: false, stashedAt: undefined } : p,
      ),
    };
    set({ activeCity: updated });
    persistAfterMutation({ activeCity: updated, isGuest: get().isGuest });
  },

  clearAllData: () => {
    try {
      localStorage.removeItem(GUEST_CITIES_KEY);
      localStorage.removeItem(OLD_GUEST_CITY_KEY);
      localStorage.removeItem('opennow-city');
      localStorage.removeItem('opennow-home-base');
      localStorage.removeItem('opennow-has-added-before');
      localStorage.removeItem('opennow-guest-chosen');
      localStorage.removeItem('opennow-geo-mappings');
    } catch {}
    gpsCitySnapshot = null;
    set({
      activeCity: null,
      homeBase: null,
      isPlanningMode: false,
      isLoading: false,
      detectedCityName: null,
    });
  },

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('opennow-theme', next);
      } catch {}
      return { theme: next };
    }),

  toggleClosedPlaces: () =>
    set((state) => ({ showClosedPlaces: !state.showClosedPlaces })),

  toggleStashedPlaces: () =>
    set((state) => ({ showStashedPlaces: !state.showStashedPlaces })),

  tick: () => {
    const now = new Date();
    const prev = get().currentTime;
    if (
      now.getMinutes() !== prev.getMinutes() ||
      now.getHours() !== prev.getHours()
    ) {
      set({ currentTime: now });
    }
  },
}));
