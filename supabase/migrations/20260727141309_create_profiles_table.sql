/*
# Create profiles table for Aura AI accounts

1. New Tables
- `profiles`
  - `id` (uuid, primary key, references auth.users) — one row per user
  - `email` (text, not null) — denormalized for quick display
  - `display_name` (text, nullable) — optional friendly name
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `profiles`.
- Owner-scoped CRUD: each authenticated user can only read/insert/update their own row.
- INSERT policy uses `WITH CHECK (auth.uid() = id)` so a user can only create their own profile.
3. Notes
- The profile row is created on signup from the frontend via an insert that omits
  `id` is NOT used; the frontend passes `id` explicitly equal to auth.uid() because
  the auth user id is known client-side at signup time.
- Email confirmation stays OFF (default).
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  display_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile"
ON profiles FOR DELETE
TO authenticated
USING (auth.uid() = id);
