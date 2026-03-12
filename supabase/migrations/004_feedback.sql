CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT,
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature', 'comment')),
  message TEXT NOT NULL,
  city_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
