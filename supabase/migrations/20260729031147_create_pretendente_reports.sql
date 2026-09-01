/*
# Create pretendente_reports table for persistent per-user reports

1. New Tables
- `pretendente_reports`
  - `id` (uuid, primary key)
  - `user_id` (uuid, not null, references auth.users) — owner of the report
  - `name` (text, not null) — the name of the person being analyzed
  - `vinculo` (text, nullable) — the relationship/context
  - `perfil_psicologico` (text, nullable) — AI-generated psychological profile
  - `dicas_abordagem` (text, nullable) — AI-generated approach tips
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now()) — last update timestamp

2. Security
- RLS enabled.
- Owner-scoped CRUD: each authenticated user can only access their own reports.
- `user_id` defaults to `auth.uid()` so inserts that omit it still work.

3. Notes
- This table ensures pretendente reports are:
  a) Persisted permanently (never lost on page reload)
  b) Isolated per user (RLS prevents cross-account data leakage)
  c) Recoverable when switching sessions
*/

CREATE TABLE IF NOT EXISTS pretendente_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  vinculo text,
  perfil_psicologico text,
  dicas_abordagem text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pretendente_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_pretendente_reports" ON pretendente_reports;
CREATE POLICY "select_own_pretendente_reports"
ON pretendente_reports FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_pretendente_reports" ON pretendente_reports;
CREATE POLICY "insert_own_pretendente_reports"
ON pretendente_reports FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_pretendente_reports" ON pretendente_reports;
CREATE POLICY "update_own_pretendente_reports"
ON pretendente_reports FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_pretendente_reports" ON pretendente_reports;
CREATE POLICY "delete_own_pretendente_reports"
ON pretendente_reports FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS pretendente_reports_user_id_idx ON pretendente_reports (user_id, created_at DESC);
