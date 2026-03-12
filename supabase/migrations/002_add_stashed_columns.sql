-- Add stash columns to places (replaces the priority system)
ALTER TABLE places ADD COLUMN IF NOT EXISTS is_stashed BOOLEAN DEFAULT false;
ALTER TABLE places ADD COLUMN IF NOT EXISTS stashed_at TIMESTAMPTZ;
