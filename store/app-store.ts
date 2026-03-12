import { create } from 'zustand';
import { City, Place } from '@/types';

const GUEST_STORAGE_KEY = 'opennow-guest-city';

function saveGuestCity(city: City | null) {
  try {
    if (city) localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(city));
    else localStorage.removeItem(GUEST_STORAGE_KEY);
  } catch {}
}

export function loadGuestCity(): City | null {
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function persistAfterMutation(state: { activeCity: City | null; isGuest: boolean }) {
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

interface AppState {
  activeCity: City | null;
  theme: 'dark' | 'light';
  showClosedPlaces: boolean;
  showStashedPlaces: boolean;
  currentTime: Date;
  isLoading: boolean;
  isGuest: boolean;
  detectedCityName: string | null;

  setActiveCity: (city: City) => void;
  setDetectedCityName: (name: string) => void;
  setLoading: (loading: boolean) => void;
  setGuest: (guest: boolean) => void;
  addPlace: (place: Place) => void;
  removePlace: (placeId: string) => void;
  stashPlace: (placeId: string) => void;
  unstashPlace: (placeId: string) => void;
  restockAllStashed: () => void;
  toggleTheme: () => void;
  toggleClosedPlaces: () => void;
  toggleStashedPlaces: () => void;
  tick: () => void;
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

  setActiveCity: (city) => {
    set({ activeCity: city, isLoading: false });
    if (get().isGuest) saveGuestCity(city);
  },
  setDetectedCityName: (name) => set({ detectedCityName: name }),
  setLoading: (loading) => set({ isLoading: loading }),
  setGuest: (guest) => set({ isGuest: guest }),

  addPlace: (place) => {
    const city = get().activeCity;
    if (!city) return;
    if (city.places.some((p) => p.id === place.id)) return;
    const updated = {
      ...city,
      places: [...city.places, { ...place, sortOrder: city.places.length }],
    };
    set({ activeCity: updated });
    persistAfterMutation({ activeCity: updated, isGuest: get().isGuest });
  },

  removePlace: (placeId) => {
    const city = get().activeCity;
    if (!city) return;
    deletePersistedPlace(placeId, get().isGuest);
    const updated = { ...city, places: city.places.filter((p) => p.id !== placeId) };
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
        p.id === placeId ? { ...p, isStashed: false, stashedAt: undefined } : p,
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
