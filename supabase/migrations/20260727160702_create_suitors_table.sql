/*
# Create suitors (pretendentes) table for Aura AI

1. New Tables
- `suitors`
  - `id` (uuid, primary key) — unique suitor record
  - `user_id` (uuid, not null, defaults to auth.uid(), references auth.users) — owner
  - `name` (text, not null) — name of the person the user is talking to
  - `notes` (text, nullable) — free-form notes about the connection
  - `status` (text, default 'a_falar') — progress state of the connection
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())
2. Security
- Enable RLS on `suitors`.
- Owner-scoped CRUD: each authenticated user can only access their own suitor rows.
- `user_id` defaults to `auth.uid()` so inserts that omit it still satisfy the WITH CHECK.
3. Notes
- Used by the "Gerir Pretendentes / Vínculos" panel inside the Profile tab.
- Email confirmation stays OFF (default).
*/

CREATE TABLE IF NOT EXISTS suitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'a_falar',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE suitors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_suitors" ON suitors;
CREATE POLICY "select_own_suitors"
ON suitors FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_suitors" ON suitors;
CREATE POLICY "insert_own_suitors"
ON suitors FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_suitors" ON suitors;
CREATE POLICY "update_own_suitors"
ON suitors FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_suitors" ON suitors;
CREATE POLICY "delete_own_suitors"
ON suitors FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS suitors_user_id_idx ON suitors(user_id);
