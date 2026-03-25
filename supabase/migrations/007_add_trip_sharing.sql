-- Add shareability controls for public list pages.
ALTER TABLE public.trips
ADD COLUMN IF NOT EXISTS share_slug TEXT,
ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT false;

-- Keep share slugs unique when present.
CREATE UNIQUE INDEX IF NOT EXISTS idx_trips_share_slug_unique
ON public.trips (share_slug)
WHERE share_slug IS NOT NULL;

-- Faster lookups for public list routes and sitemap generation.
CREATE INDEX IF NOT EXISTS idx_trips_public_share_slug
ON public.trips (is_public, share_slug);
