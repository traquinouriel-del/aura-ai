/*
# Add user preferences columns to profiles table

1. Modified Tables
- `profiles`
  - `theme` (text, nullable) — 'dark' or 'light', the user's chosen theme
  - `language` (text, nullable) — 'pt', 'en', 'es', 'fr', 'de', the user's chosen language
  - `ai_settings` (jsonb, nullable) — AI configuration (temperature, longMemory, systemPrompt)
2. Security
- No new tables. Existing RLS policies on `profiles` already scope CRUD to `auth.uid() = id`,
  so these columns inherit the same owner-only access automatically.
3. Notes
- Preferences are stored per-user in the database so they persist across devices and sessions.
- The frontend reads these on login and writes them on change.
- All columns are nullable — existing rows and new signups work without preferences until the user sets them.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'theme'
  ) THEN
    ALTER TABLE profiles ADD COLUMN theme text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'language'
  ) THEN
    ALTER TABLE profiles ADD COLUMN language text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'ai_settings'
  ) THEN
    ALTER TABLE profiles ADD COLUMN ai_settings jsonb;
  END IF;
END
$$;
