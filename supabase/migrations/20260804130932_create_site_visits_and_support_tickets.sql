/*
# Create site_visits and support_tickets tables

1. New Tables
- `site_visits`
  - `id` (uuid, primary key)
  - `visitor_id` (text, not null) — anonymous visitor fingerprint (localStorage-generated UUID)
  - `user_id` (uuid, nullable, references auth.users) — set if the visitor is logged in
  - `is_anonymous` (boolean, default true) — true when visitor has no account
  - `user_agent` (text, nullable) — browser user agent
  - `referrer` (text, nullable) — referrer URL
  - `created_at` (timestamptz, default now())
- `support_tickets`
  - `id` (uuid, primary key)
  - `user_id` (uuid, nullable, references auth.users) — set if logged in
  - `visitor_id` (text, nullable) — anonymous visitor fingerprint
  - `email` (text, nullable) — contact email (optional for anonymous)
  - `subject` (text, not null)
  - `message` (text, not null)
  - `status` (text, default 'open') — open/closed
  - `created_at` (timestamptz, default now())

2. Indexes
- `idx_site_visits_created_at` on created_at
- `idx_site_visits_visitor_id` on visitor_id
- `idx_support_tickets_created_at` on created_at

3. Security (RLS)
- `site_visits`: anyone (anon + authenticated) can INSERT (to record visits);
  only admin can SELECT (for analytics).
- `support_tickets`: anyone (anon + authenticated) can INSERT (to submit feedback);
  only admin can SELECT (to read tickets).

4. Notes
- These tables track all visits including anonymous (no-account) users,
  enabling the admin analytics dashboard to show traffic by day/week/month
  and active anonymous user counts.
- Support tickets are forwarded to the admin email via an edge function.
*/

CREATE TABLE IF NOT EXISTS site_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  is_anonymous boolean NOT NULL DEFAULT true,
  user_agent text,
  referrer text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_site_visits_created_at ON site_visits(created_at);
CREATE INDEX IF NOT EXISTS idx_site_visits_visitor_id ON site_visits(visitor_id);

ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a visit record (anon + authenticated)
DROP POLICY IF EXISTS "insert_site_visits" ON site_visits;
CREATE POLICY "insert_site_visits"
ON site_visits FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admin can read visit data
DROP POLICY IF EXISTS "select_site_visits_admin" ON site_visits;
CREATE POLICY "select_site_visits_admin"
ON site_visits FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
      AND lower(p.email) = 'traquinouriel@gmail.com'
  )
);

CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  visitor_id text,
  email text,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a support ticket
DROP POLICY IF EXISTS "insert_support_tickets" ON support_tickets;
CREATE POLICY "insert_support_tickets"
ON support_tickets FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admin can read support tickets
DROP POLICY IF EXISTS "select_support_tickets_admin" ON support_tickets;
CREATE POLICY "select_support_tickets_admin"
ON support_tickets FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
      AND lower(p.email) = 'traquinouriel@gmail.com'
  )
);
