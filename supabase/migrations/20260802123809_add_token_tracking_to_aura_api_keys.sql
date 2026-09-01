/*
# Add token tracking columns to aura_api_keys

1. Purpose
- Persist cumulative token usage per key so the admin panel shows accurate
  counts even after a page reload, and so the admin edge function can update
  usage after each LLM call.
- `tokens_used` accumulates tokens consumed.
- `tokens_remaining` is decremented as tokens are used.
- `last_reset_at` tracks when the daily quota was last reset, enabling
  automatic daily resets without manual intervention.

2. Security
- No policy changes needed; existing CRUD policies cover the new columns.
*/

ALTER TABLE aura_api_keys
  ADD COLUMN IF NOT EXISTS tokens_used bigint NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tokens_remaining bigint NOT NULL DEFAULT 500000,
  ADD COLUMN IF NOT EXISTS last_reset_at timestamptz NOT NULL DEFAULT now();

-- Backfill existing rows to default quota
UPDATE aura_api_keys
  SET tokens_remaining = 500000
  WHERE tokens_remaining IS NULL OR tokens_remaining = 0 AND tokens_used = 0;
