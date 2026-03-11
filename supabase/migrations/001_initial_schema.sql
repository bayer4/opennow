-- OpenNow initial schema

-- Trips
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Places within a trip
CREATE TABLE IF NOT EXISTS places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  google_place_id TEXT,
  name TEXT NOT NULL,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  category TEXT,
  cuisine TEXT,
  rating DOUBLE PRECISION,
  price_level INTEGER,
  photo_reference TEXT,
  is_priority BOOLEAN DEFAULT false,
  is_visited BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Operating hours for each place
CREATE TABLE IF NOT EXISTS operating_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID REFERENCES places(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  is_overnight BOOLEAN DEFAULT false
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON trips(user_id);
CREATE INDEX IF NOT EXISTS idx_places_trip_id ON places(trip_id);
CREATE INDEX IF NOT EXISTS idx_operating_hours_place_id ON operating_hours(place_id);

-- Row Level Security
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE operating_hours ENABLE ROW LEVEL SECURITY;

-- Policies: users can only see/modify their own trips
CREATE POLICY "Users can view own trips"
  ON trips FOR SELECT
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own trips"
  ON trips FOR INSERT
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own trips"
  ON trips FOR UPDATE
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can delete own trips"
  ON trips FOR DELETE
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Places: accessible if user owns the parent trip
CREATE POLICY "Users can view places in own trips"
  ON places FOR SELECT
  USING (trip_id IN (SELECT id FROM trips WHERE user_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can insert places in own trips"
  ON places FOR INSERT
  WITH CHECK (trip_id IN (SELECT id FROM trips WHERE user_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can update places in own trips"
  ON places FOR UPDATE
  USING (trip_id IN (SELECT id FROM trips WHERE user_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can delete places in own trips"
  ON places FOR DELETE
  USING (trip_id IN (SELECT id FROM trips WHERE user_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Operating hours: accessible if user owns the parent place's trip
CREATE POLICY "Users can view hours for own places"
  ON operating_hours FOR SELECT
  USING (place_id IN (
    SELECT p.id FROM places p
    JOIN trips t ON p.trip_id = t.id
    WHERE t.user_id = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

CREATE POLICY "Users can insert hours for own places"
  ON operating_hours FOR INSERT
  WITH CHECK (place_id IN (
    SELECT p.id FROM places p
    JOIN trips t ON p.trip_id = t.id
    WHERE t.user_id = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

CREATE POLICY "Users can delete hours for own places"
  ON operating_hours FOR DELETE
  USING (place_id IN (
    SELECT p.id FROM places p
    JOIN trips t ON p.trip_id = t.id
    WHERE t.user_id = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

-- Service role bypasses RLS, used by API routes
