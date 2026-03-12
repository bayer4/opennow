import { create } from 'zustand';
import { City, Place } from '@/types';

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

  setActiveCity: (city) => set({ activeCity: city, isLoading: false }),
  setDetectedCityName: (name) => set({ detectedCityName: name }),
  setLoading: (loading) => set({ isLoading: loading }),
  setGuest: (guest) => set({ isGuest: guest }),

  addPlace: (place) => {
    const city = get().activeCity;
    if (!city) return;
    if (city.places.some((p) => p.id === place.id)) return;
    set({
      activeCity: {
        ...city,
        places: [...city.places, { ...place, sortOrder: city.places.length }],
      },
    });
  },

  removePlace: (placeId) => {
    const city = get().activeCity;
    if (!city) return;
    deletePersistedPlace(placeId, get().isGuest);
    set({
      activeCity: {
        ...city,
        places: city.places.filter((p) => p.id !== placeId),
      },
    });
  },

  stashPlace: (placeId) => {
    const city = get().activeCity;
    if (!city) return;
    const stashedAt = new Date().toISOString();
    persistPlace(placeId, { isStashed: true, stashedAt }, get().isGuest);
    set({
      activeCity: {
        ...city,
        places: city.places.map((p) =>
          p.id === placeId ? { ...p, isStashed: true, stashedAt } : p,
        ),
      },
    });
  },

  unstashPlace: (placeId) => {
    const city = get().activeCity;
    if (!city) return;
    persistPlace(
      placeId,
      { isStashed: false, stashedAt: null },
      get().isGuest,
    );
    set({
      activeCity: {
        ...city,
        places: city.places.map((p) =>
          p.id === placeId
            ? { ...p, isStashed: false, stashedAt: undefined }
            : p,
        ),
      },
    });
  },

  restockAllStashed: () => {
    const city = get().activeCity;
    if (!city) return;
    const hasStashed = city.places.some((p) => p.isStashed);
    if (!hasStashed) return;
    set({
      activeCity: {
        ...city,
        places: city.places.map((p) =>
          p.isStashed ? { ...p, isStashed: false, stashedAt: undefined } : p,
        ),
      },
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
