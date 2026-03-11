import { create } from 'zustand';
import { Trip } from '@/types';

interface AppState {
  activeTrip: Trip | null;
  theme: 'dark' | 'light';
  showClosedPlaces: boolean;
  currentTime: Date;
  setActiveTrip: (trip: Trip) => void;
  toggleTheme: () => void;
  toggleClosedPlaces: () => void;
  tick: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTrip: null,
  theme: 'dark',
  showClosedPlaces: false,
  currentTime: new Date(),
  setActiveTrip: (trip) => set({ activeTrip: trip }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  toggleClosedPlaces: () =>
    set((state) => ({ showClosedPlaces: !state.showClosedPlaces })),
  tick: () => {
    const now = new Date();
    const prev = get().currentTime;
    // Only update if the minute changed — avoids unnecessary re-renders
    if (
      now.getMinutes() !== prev.getMinutes() ||
      now.getHours() !== prev.getHours()
    ) {
      set({ currentTime: now });
    }
  },
}));
