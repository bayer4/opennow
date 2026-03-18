-- Security hardening for tables exposed in the public schema.
-- With RLS enabled and no public policies, anon/authenticated API clients
-- cannot read or mutate these tables directly.
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
