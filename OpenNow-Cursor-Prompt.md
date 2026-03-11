# Cursor Master Prompt: "OpenNow" — Travel Hours Dashboard

## What This App Is

A mobile-first Progressive Web App (PWA) that gives travelers an instant, glanceable view of which saved places are **open right now**, **closing soon**, or **closed** — for any city they're in. Think of it as a smart, beautiful version of a spreadsheet I built for a Philly trip (screenshot reference attached), but automated with real data.

The user is traveling to Chicago in 4 days. This needs to be a working, usable product — not a prototype.

---

## The Origin Story (Context for AI)

I built a Google Sheets spreadsheet for a Philly trip with ~24 restaurants/cafes. Columns were: Place name, Trip priority (star emoji), and then Mon–Sun hours, plus a "Time Left" column. I used conditional formatting:
- **Red cell** = Closed right now
- **Blue cell** = Opens within 1 hour  
- **Yellow cell** = Closing within 1 hour
- **Green cell (today's column highlighted)** = Currently open

This was incredibly useful during the trip for deciding where to go at any moment. This app automates and beautifies that entire experience.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth:** NextAuth.js with Google OAuth
- **APIs:** Google Places API (New), Google Maps JavaScript API
- **Database:** Supabase (PostgreSQL + Auth integration) — for storing user trips, saved places, and preferences
- **PWA:** next-pwa or @ducanh2912/next-pwa for service worker, manifest, offline support
- **Deployment:** Vercel
- **State Management:** Zustand (lightweight, simple)
- **Icons:** Lucide React
- **Animations:** Framer Motion (subtle, tasteful)

---

## Core Features (V1 — Must Ship)

### 1. Authentication
- Google OAuth sign-in via NextAuth.js
- On first login, prompt: "Want to import your Google Maps saved places?"
- Guest mode available (manual add only, stored in localStorage)
- JWT session management

### 2. Trip Management
- User can create "Trips" (e.g., "Chicago March 2026", "Philly Weekend")
- Each trip has: name, city, date range, list of places
- Active trip is determined by current date + geolocation
- Default view always shows the active/current trip

### 3. Place Management
- **Auto-import from Google Maps:** Pull user's saved/starred/flagged places filtered by the trip's city using Google Places API
- **Manual search & add:** Search bar powered by Google Places Autocomplete — user types a restaurant name, selects it, hours are auto-populated
- **Manual input fallback:** If API hours aren't available, user can manually enter hours
- **Remove places** from a trip (swipe-to-delete on mobile)
- **Reorder places** by drag (priority) or sort by: name, open status, closing time

### 4. The Dashboard — "The Grid" (Core Experience)

This is the main screen. It should feel like a premium, polished dashboard.

#### Layout Options (user toggleable):
**A) Weekly Grid View (like the spreadsheet)**
- Rows = places, Columns = days of the week
- Current day column is highlighted/emphasized
- Each cell shows hours or "Closed"
- Cell color coding:
  - 🔴 **Red/muted** = Closed today
  - 🟢 **Green/bright** = Open right now
  - 🟡 **Yellow/amber** = Closing within 1 hour
  - 🔵 **Blue/cool** = Opens within 1 hour
  - ⚪ **Neutral/gray** = Open today but not right now (and not opening/closing soon)
- "Time Left" column on the right showing countdown (e.g., "2h 31m left" or "Opens in 45m")
- Tap any place name → opens detail card with address, rating, photos, directions link

**B) Today View (default on mobile)**
- Shows ONLY today's places, sorted by status:
  1. 🟢 Open now (sorted by closing time — closing soonest at top)
  2. 🔵 Opening soon
  3. 🟡 Closing within 1 hour (urgent! at the very top with subtle pulse)
  4. ⚪ Opens later today
  5. 🔴 Closed all day (collapsed/hidden by default, expandable)
- Each card shows: Place name, category/cuisine tag, hours today, time left/until open, distance from current location
- Pull-to-refresh updates times and location

**C) Map View**
- All trip places plotted on a Google Map
- Pins color-coded by open/closed status (same color scheme)
- Tap pin → info card with hours, status, directions
- "Near me" filter to show only places within walking distance

### 5. Smart Status Engine (The Brain)

This is the core logic that makes the app useful. Build this as a utility module.

```typescript
// types
type PlaceStatus = 'open' | 'closed' | 'closing_soon' | 'opening_soon' | 'closed_today';

interface StatusInfo {
  status: PlaceStatus;
  timeLeft?: string;        // "2h 31m" 
  opensIn?: string;         // "Opens in 45m"
  closesAt?: string;        // "10:00 PM"
  opensAt?: string;         // "11:00 AM"
  urgency: number;          // 0-100, used for sorting. 100 = closing imminently
}
```

Rules:
- "Closing soon" = closes within 60 minutes
- "Opening soon" = opens within 60 minutes
- Time updates every 60 seconds (live countdown)
- Handle edge cases: places open past midnight (e.g., "12 PM–2 AM"), places with split hours (lunch + dinner), places with no hours data
- Use the device's local timezone (important for travel!)

### 6. Geolocation
- On app open, detect user's city via browser geolocation + reverse geocoding
- Auto-suggest switching to a trip for that city if one exists
- Show distance to each place from current location

### 7. PWA Setup
- `manifest.json` with app name "OpenNow", theme color, icons
- Service worker for offline access to cached trip data
- "Add to Home Screen" prompt on first mobile visit
- Splash screen
- Full-screen display (no browser chrome)

---

## UI/UX Design Requirements

### Design Philosophy
- **Dark mode by default** (with light mode toggle). Dark mode looks premium and is easier on the eyes when you're out at night.
- **Glass morphism / translucent cards** with subtle backdrop blur
- **Minimal chrome** — the data IS the UI. No unnecessary navigation or clutter.
- **Bold typography** — place names should be large and scannable
- **Color is functional** — every color means something (open/closed/soon). Don't use color for decoration.
- **Micro-interactions** — subtle scale on tap, smooth transitions between views, gentle pulse on "closing soon" items

### Mobile-First Layout
- Bottom tab bar: Today | Week | Map | Settings
- Sticky header with trip name, city, current time
- Cards should be full-width with generous padding
- Touch targets minimum 44px
- Swipe gestures: left to remove, right to mark as "visited"
- Pull-to-refresh on Today view

### Typography
- Use Inter or SF Pro-inspired system font stack
- Place names: 18px semibold
- Hours/status: 14px medium
- Time left: 16px bold (monospace for countdown feel)
- Category tags: 12px, pill-shaped badges

### Color Palette (Dark Mode)
```
Background:     #0A0A0F (near black)
Card surface:   #1A1A2E (dark navy)
Card hover:     #252540
Open green:     #22C55E (text) / #22C55E15 (cell bg)
Closed red:     #EF4444 (text) / #EF444415 (cell bg)  
Closing yellow: #EAB308 (text) / #EAB30815 (cell bg)
Opening blue:   #3B82F6 (text) / #3B82F615 (cell bg)
Primary text:   #F8FAFC
Secondary text: #94A3B8
Accent:         #8B5CF6 (purple, for interactive elements)
```

### Color Palette (Light Mode)
```
Background:     #F8FAFC
Card surface:   #FFFFFF
Open green:     #16A34A (text) / #DCFCE7 (cell bg)
Closed red:     #DC2626 (text) / #FEE2E2 (cell bg)
Closing yellow: #CA8A04 (text) / #FEF9C3 (cell bg)
Opening blue:   #2563EB (text) / #DBEAFE (cell bg)
Primary text:   #0F172A
Secondary text: #64748B
Accent:         #7C3AED
```

---

## Data Model (Supabase)

```sql
-- Users (handled by NextAuth + Supabase adapter)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  google_access_token TEXT, -- for Maps API calls on behalf of user
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trips
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Places (within a trip)
CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  google_place_id TEXT,
  name TEXT NOT NULL,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  category TEXT, -- "restaurant", "cafe", "bar", etc.
  cuisine TEXT, -- "Italian", "Mexican", etc.
  rating DOUBLE PRECISION,
  price_level INTEGER, -- 1-4
  photo_reference TEXT,
  is_priority BOOLEAN DEFAULT false, -- star/flag
  is_visited BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Operating Hours
CREATE TABLE operating_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID REFERENCES places(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, ... 6=Saturday
  open_time TIME, -- NULL if closed that day
  close_time TIME, -- NULL if closed that day
  is_closed BOOLEAN DEFAULT false,
  is_overnight BOOLEAN DEFAULT false -- for places closing after midnight
);
```

---

## API Routes

```
POST   /api/auth/[...nextauth]    — Google OAuth
GET    /api/trips                  — List user's trips
POST   /api/trips                  — Create trip
PUT    /api/trips/:id              — Update trip
DELETE /api/trips/:id              — Delete trip
GET    /api/trips/:id/places       — List places in trip
POST   /api/trips/:id/places       — Add place to trip
DELETE /api/trips/:id/places/:pid  — Remove place
PUT    /api/places/:id             — Update place (priority, visited, etc.)
POST   /api/places/import-google   — Import starred places from Google Maps
GET    /api/places/search          — Proxy to Google Places Autocomplete
GET    /api/places/:id/details     — Proxy to Google Places Details (hours, photos)
GET    /api/geo/reverse            — Reverse geocode current location to city
```

---

## Key Implementation Notes

### Google Places API (New)
- Use the **Places API (New)** not the legacy one
- Endpoints needed: Place Search (Text), Place Details, Place Photos, Autocomplete
- For importing saved places: use the Google Maps "My Maps" / saved places API (note: this requires the user's OAuth token with the right scopes — `https://www.googleapis.com/auth/userinfo.profile` and access to their saved places)
- Cache place details in Supabase to avoid re-fetching (hours don't change often)
- Refresh hours data once per day or on manual refresh

### Handling "Saved Places" Import
Google doesn't have a clean public API for saved/starred places. Options:
1. **Google Maps Platform — Places API with user search**: Have the user search for their saved places by name (most reliable)
2. **Google Takeout integration**: User can export their saved places as GeoJSON from Google Takeout, then upload to the app
3. **Manual search + add**: The most reliable v1 approach — beautiful search bar with autocomplete, user adds places one by one

**Recommendation for v1:** Go with option 3 (search + add) as the primary flow, with option 2 (Takeout upload) as a bonus. Don't block on trying to auto-sync saved places — it's an API limitation that will slow you down. The search experience should be so fast and smooth that adding 20 places takes under 2 minutes.

### Offline Support
- Cache current trip data in IndexedDB via service worker
- Hours data should work offline (it's static for the week)
- Only geolocation and distance calculations need connectivity

### Performance
- Virtualize the weekly grid if >30 places (react-virtual or similar)
- Lazy load place photos
- Debounce search autocomplete (300ms)

---

## File Structure

```
opennow/
├── app/
│   ├── layout.tsx              # Root layout, providers, PWA meta
│   ├── page.tsx                # Landing/auth page
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard shell (tabs, header)
│   │   ├── page.tsx            # Today view (default)
│   │   ├── week/page.tsx       # Weekly grid view
│   │   ├── map/page.tsx        # Map view
│   │   └── settings/page.tsx   # Settings, theme toggle, manage trips
│   ├── trip/
│   │   ├── new/page.tsx        # Create new trip
│   │   └── [id]/
│   │       ├── page.tsx        # Trip detail / place management
│   │       └── add/page.tsx    # Search & add places
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── trips/route.ts
│       ├── places/route.ts
│       └── geo/route.ts
├── components/
│   ├── ui/                     # Reusable primitives (Button, Card, Badge, etc.)
│   ├── PlaceCard.tsx           # Place card for Today view
│   ├── WeeklyGrid.tsx          # The spreadsheet-style grid
│   ├── StatusBadge.tsx         # Open/Closed/Soon badge component
│   ├── TimeLeft.tsx            # Countdown component
│   ├── PlaceSearch.tsx         # Google Places autocomplete search
│   ├── MapView.tsx             # Google Maps with colored pins
│   ├── BottomNav.tsx           # Mobile bottom tab bar
│   └── TripHeader.tsx          # Sticky header with trip info
├── lib/
│   ├── status-engine.ts        # Core open/closed/soon logic
│   ├── google-places.ts        # Google API wrapper
│   ├── supabase.ts             # Supabase client
│   ├── time-utils.ts           # Time parsing, formatting, countdown
│   └── geo.ts                  # Geolocation utilities
├── store/
│   └── app-store.ts            # Zustand store
├── types/
│   └── index.ts                # TypeScript types
├── public/
│   ├── manifest.json
│   └── icons/                  # PWA icons (192x192, 512x512)
├── next.config.js
├── tailwind.config.ts
├── package.json
└── .env.local                  # API keys (GOOGLE_PLACES_API_KEY, etc.)
```

---

## Environment Variables Needed

```env
# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Google Places API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
GOOGLE_PLACES_API_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=  # generate with: openssl rand -base64 32
```

---

## Priority Build Order

1. **Project scaffolding** — Next.js + Tailwind + TypeScript + PWA config
2. **Status engine** (`lib/status-engine.ts`) — the brain of the app. Write comprehensive tests.
3. **Data model** — Supabase tables + seed with sample Chicago data for testing
4. **Today View** — the primary mobile screen, with hardcoded test data first
5. **Weekly Grid View** — the spreadsheet recreation
6. **Google Places search + add** — autocomplete search, fetch hours, save to DB
7. **Authentication** — Google OAuth via NextAuth
8. **Trip management** — create/switch/delete trips
9. **Map View** — Google Maps integration with status-colored pins
10. **Polish** — animations, transitions, offline support, PWA icons

---

## Testing Seed Data

For development, seed the DB with these Chicago places (or similar):
- Au Cheval (burger spot)
- Girl & The Goat
- Portillo's
- Lou Malnati's
- Intelligentsia Coffee
- The Violet Hour
- Alinea
- Big Star
- Do-Rite Donuts
- Revival Food Hall

---

## What "Done" Looks Like

I should be able to:
1. Open the app on my phone (added to home screen)
2. See my Chicago trip as the active trip
3. Instantly see which places are open right now, sorted smartly
4. See a yellow/amber alert if something I want to go to is closing soon
5. Tap a place to see details, get directions
6. Switch to weekly view and see the full grid like my spreadsheet
7. Search for a new restaurant and add it in under 10 seconds
8. Remove a place I've already visited
9. Toggle dark/light mode
10. It should look like something a design team at a startup built — not a hackathon project
