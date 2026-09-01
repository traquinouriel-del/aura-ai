/*
# Create aura_provider_logs table for AI key rotation diagnostics

1. New Tables
- `aura_provider_logs`
  - `id` (uuid, primary key)
  - `provider` (text, which API key was used, e.g. "groq-1")
  - `model` (text, which AI model was used)
  - `response_time_ms` (integer, how long the API call took)
  - `feature` (text, which app feature triggered the call, e.g. "analysis", "response")
  - `fallback_reason` (text, null if success; reason if this call triggered a rotation)
  - `error` (text, null if success; error message if failed)
  - `health_status` (text, the key's health at time of call: "healthy", "unstable", "unavailable")
  - `created_at` (timestamptz, default now())

2. Purpose
- Diagnostic-only logging for the AI key rotation system.
- Stores NO conversation content — only metadata about which key was used,
  how fast it responded, and why a fallback occurred (if any).
- Used by the admin panel to monitor key health and rotation patterns.

3. Security
- Enable RLS on `aura_provider_logs`.
- Only authenticated users can read (admin panel access).
- Only authenticated users can insert (the app writes logs from authenticated sessions).
- No update or delete policies — logs are append-only diagnostics.
*/

CREATE TABLE IF NOT EXISTS aura_provider_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  model text NOT NULL,
  response_time_ms integer,
  feature text,
  fallback_reason text,
  error text,
  health_status text DEFAULT 'unknown',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE aura_provider_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_provider_logs_authenticated" ON aura_provider_logs;
CREATE POLICY "select_provider_logs_authenticated"
ON aura_provider_logs FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_provider_logs_authenticated" ON aura_provider_logs;
CREATE POLICY "insert_provider_logs_authenticated"
ON aura_provider_logs FOR INSERT
TO authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_aura_provider_logs_created_at
ON aura_provider_logs (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_aura_provider_logs_provider
ON aura_provider_logs (provider);
