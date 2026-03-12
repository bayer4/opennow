CREATE TABLE IF NOT EXISTS user_settings (
  user_id TEXT PRIMARY KEY,
  home_base TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);
