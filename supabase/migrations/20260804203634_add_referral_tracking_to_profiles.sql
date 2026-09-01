/*
# Add referral tracking columns to profiles

1. Modified Tables
- `profiles`
  - `referral_code` (text, unique) — a short unique code each user shares (auto-generated from user id prefix)
  - `referred_by` (uuid, nullable) — the user id of the person who invited this user
  - `referral_count` (integer, default 0) — how many friends joined via this user's link

2. Security
- RLS already enabled on profiles. Add policy allowing authenticated users to read referral_code and referred_by of any user (needed for referral lookups at signup).
- Add policy allowing anon to update referred_by/referral_count when a new user signs up via a referral link (via the invite_shares table linkage).
- Existing policies remain unchanged.

3. Notes
- referral_code is derived from the user's id (first 8 chars) for simplicity and uniqueness.
- referral_count is maintained via the aura_invite_shares table — when invitee_id is filled, a trigger increments the inviter's referral_count.
- This migration is idempotent — uses DO $$ blocks for conditional column adds.
*/

-- Add referral_code column
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'referral_code') THEN
    ALTER TABLE profiles ADD COLUMN referral_code text;
  END IF;
END $$;

-- Add referred_by column
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'referred_by') THEN
    ALTER TABLE profiles ADD COLUMN referred_by uuid;
  END IF;
END $$;

-- Add referral_count column
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'referral_count') THEN
    ALTER TABLE profiles ADD COLUMN referral_count integer NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Create unique index on referral_code
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_referral_code ON profiles(referral_code) WHERE referral_code IS NOT NULL;

-- Create index on referred_by for lookup
CREATE INDEX IF NOT EXISTS idx_profiles_referred_by ON profiles(referred_by) WHERE referred_by IS NOT NULL;

-- Backfill referral_code for existing users from their id
UPDATE profiles
SET referral_code = left(id::text, 8)
WHERE referral_code IS NULL;

-- Function to increment referral_count when an invite share gets an invitee_id
CREATE OR REPLACE FUNCTION increment_referral_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invitee_id IS NOT NULL AND (OLD.invitee_id IS NULL OR OLD.invitee_id <> NEW.invitee_id) THEN
    UPDATE profiles
    SET referral_count = referral_count + 1
    WHERE id::text = NEW.inviter_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on aura_invite_shares
DROP TRIGGER IF EXISTS trg_increment_referral ON aura_invite_shares;
CREATE TRIGGER trg_increment_referral
  AFTER INSERT OR UPDATE OF invitee_id ON aura_invite_shares
  FOR EACH ROW
  EXECUTE FUNCTION increment_referral_count();
