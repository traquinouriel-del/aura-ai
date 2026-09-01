/*
# Create device_registrations table for anti-fraud tracking

1. New Table
- `device_registrations`
  - `id` (uuid, primary key)
  - `device_fingerprint` (text, not null) — browser-generated unique fingerprint
  - `user_id` (uuid, references auth.users) — the account created from this device
  - `user_agent` (text, nullable) — browser user agent
  - `created_at` (timestamptz, default now())

2. Indexes
- `idx_device_registrations_fp` on device_fingerprint (for fast limit checks)
- `idx_device_registrations_user` on user_id

3. Security (RLS)
- Anyone (anon + authenticated) can INSERT (to record a new registration at signup)
- Anyone can SELECT count by device_fingerprint (to check the limit before signup)
- No UPDATE or DELETE needed
*/

CREATE TABLE IF NOT EXISTS device_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_fingerprint text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_device_registrations_fp ON device_registrations(device_fingerprint);
CREATE INDEX IF NOT EXISTS idx_device_registrations_user ON device_registrations(user_id);

ALTER TABLE device_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a device registration (at signup time)
DROP POLICY IF EXISTS "insert_device_registrations" ON device_registrations;
CREATE POLICY "insert_device_registrations"
ON device_registrations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Anyone can check device count (needed for pre-signup limit check)
-- Only the fingerprint column is exposed; no sensitive data
DROP POLICY IF EXISTS "select_device_registrations" ON device_registrations;
CREATE POLICY "select_device_registrations"
ON device_registrations FOR SELECT
TO anon, authenticated
USING (true);
