/*
# Aura custom OTP codes

1. Purpose
- Stores short-lived 6-digit verification codes for the Aura-branded
  email authentication flow.  This replaces Supabase's built-in
  `signInWithOtp` so we can send a fully customised, on-brand email
  through our own SMTP provider (Resend) instead of the generic
  Supabase noreply template.

2. New Tables
- `aura_otps`
  - `id`           uuid primary key
  - `email`         text, not null — the address being verified
  - `code_hash`     text, not null — SHA-256 hash of the 6-digit code
    (we never store the plaintext code)
  - `expires_at`    timestamptz, not null — 10-minute validity
  - `consumed_at`   timestamptz, nullable — set when the code is used
  - `attempt_count` int, default 0 — tracks failed verification tries
  - `created_at`    timestamptz, default now()

3. Indexes
- `idx_aura_otps_email` on `email` for lookup by email
- `idx_aura_otps_expires_at` on `expires_at` for cleanup of expired codes

4. Security
- RLS enabled.
- The table is written and read ONLY by the service role (edge
  functions).  No anon/authenticated policies are created, so the
  anon-key frontend cannot read or write codes directly — all access
  goes through the edge functions which use the service role key.
*/

CREATE TABLE IF NOT EXISTS public.aura_otps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  attempt_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.aura_otps ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_aura_otps_email ON public.aura_otps (email);
CREATE INDEX IF NOT EXISTS idx_aura_otps_expires_at ON public.aura_otps (expires_at);
