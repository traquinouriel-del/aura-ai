/*
# Add scope column to aura_api_keys — isolate admin keys from user keys

1. Purpose
- The admin panel and its AI assistant need a dedicated API key pool that is
  completely isolated from the public user chat pool. This ensures the admin
  tools remain operational even if user-facing tokens are exhausted.
- The `scope` column distinguishes between 'user' keys (consumed by the public
  chat) and 'admin' keys (consumed exclusively by the admin assistant and
  admin panel operations).

2. Changes
- Add column `scope` (text, NOT NULL, DEFAULT 'user') to `aura_api_keys`.
  - 'user' = keys in the public provider pool (user chat, analysis, etc.)
  - 'admin' = keys in the isolated admin pool (assistant, maintenance)
- Add an index on (scope, is_active) for fast filtering.

3. Security
- No RLS policy changes — existing policies already allow anon + authenticated
  full CRUD on this table.

4. Important Notes
- Existing rows default to scope='user', preserving current behavior.
- The frontend loads admin keys separately via refreshAdminPool() and never
  mixes them into the user-facing provider pool.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'aura_api_keys' AND column_name = 'scope'
  ) THEN
    ALTER TABLE aura_api_keys ADD COLUMN scope text NOT NULL DEFAULT 'user';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_aura_api_keys_scope_active
  ON aura_api_keys (scope, is_active);
