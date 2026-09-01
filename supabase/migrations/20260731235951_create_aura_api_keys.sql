/*
# Create aura_api_keys table — dynamic API key management

1. Purpose
- Allows the admin to add, enable, and disable Groq API keys from the admin panel
- Keys are stored in the database and loaded at runtime by the frontend, merging with
  any keys present in the .env file. New keys become active immediately without restart.

2. New Tables
- `aura_api_keys`
  - `id` (uuid, primary key)
  - `provider` (text, not null) — provider name e.g. "groq-7"
  - `api_key` (text, not null) — the actual API key
  - `model` (text) — model name (defaults to auraConfig model)
  - `endpoint` (text) — API endpoint URL
  - `vision_model` (text, nullable) — vision model name
  - `is_active` (boolean, default true) — whether the key is in the active pool
  - `label` (text, nullable) — optional human-readable label
  - `created_at` (timestamptz, default now())
  - `created_by` (text, nullable) — admin email/phone who added the key

3. Security
- Enable RLS on `aura_api_keys`.
- This is a single-admin app (no sign-in screen for the panel itself; admin is identified
  by email/phone in the frontend). The anon-key client must be able to read and write keys
  so the admin panel can manage them. Policies allow anon + authenticated full CRUD.
- NOTE: API keys are sensitive. In this app, keys are already bundled in the frontend
  (auraConfig.ts), so storing them in a DB readable by the anon client is consistent with
  the existing security model. A future improvement would be to proxy all AI calls
  through edge functions and keep keys server-side only.

4. Important Notes
- The frontend reads this table at startup and whenever the admin panel refreshes,
  merging DB keys with the hardcoded/env keys. DB keys get higher priority (sorted first).
- Deleting a key or setting is_active=false removes it from the pool immediately.
*/

CREATE TABLE IF NOT EXISTS aura_api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  api_key text NOT NULL,
  model text,
  endpoint text,
  vision_model text,
  is_active boolean NOT NULL DEFAULT true,
  label text,
  created_at timestamptz DEFAULT now(),
  created_by text
);

ALTER TABLE aura_api_keys ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_api_keys" ON aura_api_keys;
CREATE POLICY "anon_select_api_keys" ON aura_api_keys FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_api_keys" ON aura_api_keys;
CREATE POLICY "anon_insert_api_keys" ON aura_api_keys FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_api_keys" ON aura_api_keys;
CREATE POLICY "anon_update_api_keys" ON aura_api_keys FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_api_keys" ON aura_api_keys;
CREATE POLICY "anon_delete_api_keys" ON aura_api_keys FOR DELETE
  TO anon, authenticated USING (true);
