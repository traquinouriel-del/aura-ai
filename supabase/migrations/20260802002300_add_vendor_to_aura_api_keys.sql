/*
# Add vendor column to aura_api_keys — multi-provider support

1. Purpose
- The Aura AI system currently only supports Groq API keys. We are extending
  it to support multiple AI providers (Groq, Google Gemini, OpenRouter,
  DeepSeek, OpenAI). This migration adds a `vendor` column to identify which
  provider a given key belongs to, so the frontend can route API calls
  to the correct endpoint format.

2. Changes
- Added `vendor` column to `aura_api_keys`:
  - Type: text, nullable (existing keys default to 'groq')
  - Default: 'groq' so all pre-existing keys are treated as Groq
  - Values: 'groq', 'gemini', 'openrouter', 'deepseek', 'openai'

3. Security
- No RLS policy changes — existing policies remain in place.
- The anon + authenticated CRUD policies on aura_api_keys are unchanged.

4. Important Notes
- Existing keys automatically get vendor='groq' via the DEFAULT clause.
- The frontend reads this column to determine which API format to use.
- No data is lost — the column is additive only.
*/

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'aura_api_keys' AND column_name = 'vendor'
  ) THEN
    ALTER TABLE aura_api_keys ADD COLUMN vendor text NOT NULL DEFAULT 'groq';
  END IF;
END $$;