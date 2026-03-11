import { create } from 'zustand';
import { Trip, Place } from '@/types';

interface AppState {
  activeTrip: Trip | null;
  theme: 'dark' | 'light';
  showClosedPlaces: boolean;
  currentTime: Date;
  isLoading: boolean;
  isGuest: boolean;

  setActiveTrip: (trip: Trip) => void;
  setLoading: (loading: boolean) => void;
  setGuest: (guest: boolean) => void;
  addPlace: (place: Place) => void;
  removePlace: (placeId: string) => void;
  toggleTheme: () => void;
  toggleClosedPlaces: () => void;
  tick: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTrip: null,
  theme: 'dark',
  showClosedPlaces: false,
  currentTime: new Date(),
  isLoading: true,
  isGuest: false,

  setActiveTrip: (trip) => set({ activeTrip: trip, isLoading: false }),
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

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

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
