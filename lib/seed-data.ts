import { Place, Trip, OperatingHours } from '@/types';

function makeHours(
  placeId: string,
  schedule: Record<number, [string, string, boolean?] | null>
): OperatingHours[] {
  return Object.entries(schedule).map(([day, times]) => ({
    id: `${placeId}-${day}`,
    placeId,
    dayOfWeek: Number(day),
    openTime: times ? times[0] : null,
    closeTime: times ? times[1] : null,
    isClosed: times === null,
    isOvernight: times ? !!times[2] : false,
  }));
}

// Realistic Chicago restaurant hours (March 2026)
const auChevalHours = makeHours('au-cheval', {
  0: ['10:00', '22:00'],   // Sun
  1: null,                  // Mon — closed
  2: ['11:00', '23:00'],   // Tue
  3: ['11:00', '23:00'],   // Wed
  4: ['11:00', '23:00'],   // Thu
  5: ['11:00', '00:30', true], // Fri — overnight
  6: ['10:00', '00:30', true], // Sat — overnight
});

const girlAndTheGoatHours = makeHours('girl-goat', {
  0: ['10:00', '22:00'],
  1: ['16:30', '22:00'],
  2: ['16:30', '22:00'],
  3: ['16:30', '22:00'],
  4: ['16:30', '23:00'],
  5: ['16:30', '23:30'],
  6: ['10:00', '23:30'],
});

const portillosHours = makeHours('portillos', {
  0: ['10:00', '22:00'],
  1: ['10:00', '22:00'],
  2: ['10:00', '22:00'],
  3: ['10:00', '22:00'],
  4: ['10:00', '22:00'],
  5: ['10:00', '23:00'],
  6: ['10:00', '23:00'],
});

const louMalnatisHours = makeHours('lou-malnatis', {
  0: ['11:00', '22:00'],
  1: ['11:00', '23:00'],
  2: ['11:00', '23:00'],
  3: ['11:00', '23:00'],
  4: ['11:00', '23:00'],
  5: ['11:00', '00:00', true],
  6: ['11:00', '00:00', true],
});

const intelligentsiaHours = makeHours('intelligentsia', {
  0: ['07:00', '18:00'],
  1: ['06:00', '19:00'],
  2: ['06:00', '19:00'],
  3: ['06:00', '19:00'],
  4: ['06:00', '19:00'],
  5: ['06:00', '19:00'],
  6: ['07:00', '18:00'],
});

const violetHourHours = makeHours('violet-hour', {
  0: ['18:00', '01:00', true],
  1: null,
  2: null,
  3: ['18:00', '01:00', true],
  4: ['18:00', '02:00', true],
  5: ['18:00', '02:00', true],
  6: ['18:00', '02:00', true],
});

const alineaHours = makeHours('alinea', {
  0: null,
  1: null,
  2: ['17:00', '22:00'],
  3: ['17:00', '22:00'],
  4: ['17:00', '22:00'],
  5: ['17:00', '22:30'],
  6: ['17:00', '22:30'],
});

const bigStarHours = makeHours('big-star', {
  0: ['11:30', '22:00'],
  1: ['11:30', '23:00'],
  2: ['11:30', '23:00'],
  3: ['11:30', '23:00'],
  4: ['11:30', '00:00', true],
  5: ['11:30', '01:00', true],
  6: ['11:30', '00:00', true],
});

const doRiteDonutsHours = makeHours('do-rite', {
  0: ['07:00', '15:00'],
  1: ['06:30', '16:00'],
  2: ['06:30', '16:00'],
  3: ['06:30', '16:00'],
  4: ['06:30', '16:00'],
  5: ['06:30', '16:00'],
  6: ['07:00', '15:00'],
});

const revivalFoodHallHours = makeHours('revival', {
  0: null,
  1: ['07:00', '19:00'],
  2: ['07:00', '19:00'],
  3: ['07:00', '19:00'],
  4: ['07:00', '19:00'],
  5: ['07:00', '19:00'],
  6: null,
});

export const chicagoPlaces: Place[] = [
  {
    id: 'au-cheval',
    tripId: 'chicago-trip',
    googlePlaceId: 'ChIJ_____au_cheval',
    name: 'Au Cheval',
    address: '800 W Randolph St, Chicago, IL 60607',
    latitude: 41.8844,
    longitude: -87.6474,
    category: 'restaurant',
    cuisine: 'American',
    rating: 4.6,
    priceLevel: 3,
    isPriority: true,
    isVisited: false,
    sortOrder: 0,
    hours: auChevalHours,
  },
  {
    id: 'girl-goat',
    tripId: 'chicago-trip',
    googlePlaceId: 'ChIJ_____girl_goat',
    name: 'Girl & The Goat',
    address: '809 W Randolph St, Chicago, IL 60607',
    latitude: 41.8843,
    longitude: -87.6477,
    category: 'restaurant',
    cuisine: 'New American',
    rating: 4.5,
    priceLevel: 3,
    isPriority: true,
    isVisited: false,
    sortOrder: 1,
    hours: girlAndTheGoatHours,
  },
  {
    id: 'portillos',
    tripId: 'chicago-trip',
    name: "Portillo's",
    address: '100 W Ontario St, Chicago, IL 60654',
    latitude: 41.8932,
    longitude: -87.6316,
    category: 'restaurant',
    cuisine: 'American',
    rating: 4.4,
    priceLevel: 1,
    isPriority: false,
    isVisited: false,
    sortOrder: 2,
    hours: portillosHours,
  },
  {
    id: 'lou-malnatis',
    tripId: 'chicago-trip',
    name: "Lou Malnati's",
    address: '439 N Wells St, Chicago, IL 60654',
    latitude: 41.8905,
    longitude: -87.6340,
    category: 'restaurant',
    cuisine: 'Pizza',
    rating: 4.5,
    priceLevel: 2,
    isPriority: true,
    isVisited: false,
    sortOrder: 3,
    hours: louMalnatisHours,
  },
  {
    id: 'intelligentsia',
    tripId: 'chicago-trip',
    name: 'Intelligentsia Coffee',
    address: '53 E Randolph St, Chicago, IL 60601',
    latitude: 41.8845,
    longitude: -87.6253,
    category: 'cafe',
    cuisine: 'Coffee',
    rating: 4.3,
    priceLevel: 2,
    isPriority: false,
    isVisited: false,
    sortOrder: 4,
    hours: intelligentsiaHours,
  },
  {
    id: 'violet-hour',
    tripId: 'chicago-trip',
    name: 'The Violet Hour',
    address: '1520 N Damen Ave, Chicago, IL 60622',
    latitude: 41.9091,
    longitude: -87.6775,
    category: 'bar',
    cuisine: 'Cocktails',
    rating: 4.5,
    priceLevel: 3,
    isPriority: true,
    isVisited: false,
    sortOrder: 5,
    hours: violetHourHours,
  },
  {
    id: 'alinea',
    tripId: 'chicago-trip',
    name: 'Alinea',
    address: '1723 N Halsted St, Chicago, IL 60614',
    latitude: 41.9138,
    longitude: -87.6483,
    category: 'restaurant',
    cuisine: 'Fine Dining',
    rating: 4.7,
    priceLevel: 4,
    isPriority: true,
    isVisited: false,
    sortOrder: 6,
    hours: alineaHours,
  },
  {
    id: 'big-star',
    tripId: 'chicago-trip',
    name: 'Big Star',
    address: '1531 N Damen Ave, Chicago, IL 60622',
    latitude: 41.9094,
    longitude: -87.6774,
    category: 'restaurant',
    cuisine: 'Mexican',
    rating: 4.3,
    priceLevel: 2,
    isPriority: false,
    isVisited: false,
    sortOrder: 7,
    hours: bigStarHours,
  },
  {
    id: 'do-rite',
    tripId: 'chicago-trip',
    name: 'Do-Rite Donuts',
    address: '233 E Erie St, Chicago, IL 60611',
    latitude: 41.8940,
    longitude: -87.6213,
    category: 'cafe',
    cuisine: 'Bakery',
    rating: 4.5,
    priceLevel: 1,
    isPriority: false,
    isVisited: false,
    sortOrder: 8,
    hours: doRiteDonutsHours,
  },
  {
    id: 'revival',
    tripId: 'chicago-trip',
    name: 'Revival Food Hall',
    address: '125 S Clark St, Chicago, IL 60603',
    latitude: 41.8797,
    longitude: -87.6310,
    category: 'food hall',
    cuisine: 'Various',
    rating: 4.2,
    priceLevel: 2,
    isPriority: false,
    isVisited: false,
    sortOrder: 9,
    hours: revivalFoodHallHours,
  },
];

export const chicagoTrip: Trip = {
  id: 'chicago-trip',
  userId: 'test-user',
  name: 'Chicago March 2026',
  city: 'Chicago',
  latitude: 41.8781,
  longitude: -87.6298,
  startDate: '2026-03-14',
  endDate: '2026-03-18',
  isActive: true,
  places: chicagoPlaces,
};
