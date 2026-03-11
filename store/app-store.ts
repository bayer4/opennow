import { create } from 'zustand';
import { Trip, Place } from '@/types';

interface AppState {
  activeTrip: Trip | null;
  trips: Trip[];
  theme: 'dark' | 'light';
  showClosedPlaces: boolean;
  currentTime: Date;
  isLoading: boolean;
  isGuest: boolean;

  setActiveTrip: (trip: Trip) => void;
  setTrips: (trips: Trip[]) => void;
  setLoading: (loading: boolean) => void;
  setGuest: (guest: boolean) => void;
  addPlace: (place: Place) => void;
  removePlace: (placeId: string) => void;
  updatePlace: (placeId: string, updates: Partial<Pick<Place, 'isPriority' | 'isVisited' | 'sortOrder'>>) => void;
  addTrip: (trip: Trip) => void;
  removeTripFromList: (tripId: string) => void;
  toggleTheme: () => void;
  toggleClosedPlaces: () => void;
  tick: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTrip: null,
  trips: [],
  theme: (typeof window !== 'undefined' && localStorage.getItem('opennow-theme') === 'light') ? 'light' : 'dark',
  showClosedPlaces: false,
  currentTime: new Date(),
  isLoading: true,
  isGuest: false,

  setActiveTrip: (trip) => set({ activeTrip: trip, isLoading: false }),
  setTrips: (trips) => set({ trips }),
  setLoading: (loading) => set({ isLoading: loading }),
  setGuest: (guest) => set({ isGuest: guest }),

  addPlace: (place) => {
    const trip = get().activeTrip;
    if (!trip) return;
    if (trip.places.some((p) => p.id === place.id)) return;
    set({
      activeTrip: {
        ...trip,
        places: [...trip.places, { ...place, sortOrder: trip.places.length }],
      },
    });
  },

  removePlace: (placeId) => {
    const trip = get().activeTrip;
    if (!trip) return;
    set({
      activeTrip: {
        ...trip,
        places: trip.places.filter((p) => p.id !== placeId),
      },
    });
  },

  updatePlace: (placeId, updates) => {
    const trip = get().activeTrip;
    if (!trip) return;
    set({
      activeTrip: {
        ...trip,
        places: trip.places.map((p) =>
          p.id === placeId ? { ...p, ...updates } : p
        ),
      },
    });
  },

  addTrip: (trip) => {
    set((state) => ({
      trips: [trip, ...state.trips],
    }));
  },

  removeTripFromList: (tripId) => {
    set((state) => ({
      trips: state.trips.filter((t) => t.id !== tripId),
      activeTrip:
        state.activeTrip?.id === tripId ? null : state.activeTrip,
    }));
  },

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('opennow-theme', next); } catch {}
      return { theme: next };
    }),

  toggleClosedPlaces: () =>
    set((state) => ({ showClosedPlaces: !state.showClosedPlaces })),

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
