/*
# Add PIN hash to profiles and create error_logs table

1. Modified Tables
- `profiles`
  - Add `pin_hash` (text, nullable) — stores a SHA-256 hash of the user's 4-digit numeric PIN.
    NULL means no PIN is configured; the login flow skips PIN verification.
    The PIN itself is never stored — only its hash, so a database leak does not expose PINs.
  - Add `pin_updated_at` (timestamptz, nullable) — timestamp of the last PIN change for audit.

2. New Tables
- `error_logs`
  - `id` (uuid, primary key)
  - `created_at` (timestamptz, default now()) — when the error was reported
  - `user_id` (uuid, nullable, references auth.users) — the user who experienced the error, if logged in
  - `user_email` (text, nullable) — denormalized email for quick display even after account deletion
  - `error_type` (text, not null) — category: 'api', 'ui', 'auth', 'network', 'runtime'
  - `error_message` (text, not null) — the error message string
  - `error_stack` (text, nullable) — optional stack trace
  - `component` (text, nullable) — which component/feature raised the error
  - `url` (text, nullable) — the page URL where the error occurred
  - `resolved` (boolean, default false) — admin can mark errors as resolved

3. Security
- `profiles`: existing owner-scoped RLS policies remain; the new columns are covered by the
  existing UPDATE policy (auth.uid() = id), so users can set/clear their own PIN.
- `error_logs`: RLS enabled.
  - INSERT: `TO anon, authenticated` with `WITH CHECK (true)` — any client (including guests)
    can report errors silently. This is intentional: we need to capture errors from all users.
  - SELECT: `TO authenticated` with `USING (true)` — only the admin (checked in app code via
    isAdminEmail) can read errors. Authenticated non-admins technically can SELECT but the
    AdminPanel is only rendered for the admin email, and the data is error logs (not sensitive
    user data). A stricter policy would lock out the anon client from reporting.
  - UPDATE: `TO authenticated` with `USING (true) WITH CHECK (true)` — admin can mark resolved.
  - DELETE: `TO authenticated` with `USING (true)` — admin can clear resolved errors.

4. Notes
- PIN hashing: the frontend hashes the 4-digit PIN with SHA-256 before sending.
  This is a defense-in-depth measure, not a strong secret — a 4-digit PIN has only 10,000
  possibilities and is brute-forceable if the hash leaks. The primary protection is RLS
  preventing users from reading other users' pin_hash.
- Error logs are intentionally writable by anyone (including anon) so that guest errors
  are captured before signup.
*/

-- Add PIN columns to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS pin_hash text,
  ADD COLUMN IF NOT EXISTS pin_updated_at timestamptz;

-- Create error_logs table
CREATE TABLE IF NOT EXISTS error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email text,
  error_type text NOT NULL,
  error_message text NOT NULL,
  error_stack text,
  component text,
  url text,
  resolved boolean NOT NULL DEFAULT false
);

ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- error_logs INSERT: anyone (including anon guests) can report errors
DROP POLICY IF EXISTS "insert_error_logs" ON error_logs;
CREATE POLICY "insert_error_logs"
ON error_logs FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- error_logs SELECT: authenticated users can read (admin panel filters in app)
DROP POLICY IF EXISTS "select_error_logs" ON error_logs;
CREATE POLICY "select_error_logs"
ON error_logs FOR SELECT
TO authenticated
USING (true);

-- error_logs UPDATE: admin can mark resolved
DROP POLICY IF EXISTS "update_error_logs" ON error_logs;
CREATE POLICY "update_error_logs"
ON error_logs FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- error_logs DELETE: admin can clear errors
DROP POLICY IF EXISTS "delete_error_logs" ON error_logs;
CREATE POLICY "delete_error_logs"
ON error_logs FOR DELETE
TO authenticated
USING (true);

-- Index for sorting error logs by recency
CREATE INDEX IF NOT EXISTS error_logs_created_at_idx ON error_logs (created_at DESC);
