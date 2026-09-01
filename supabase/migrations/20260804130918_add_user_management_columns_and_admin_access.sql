/*
# Add user management columns and admin access to profiles

1. Changes to existing tables
- `profiles`: add `first_name` (text, nullable), `last_name` (text, nullable),
  `banned` (boolean, default false), `restricted` (boolean, default false).
  These columns support the admin panel's dynamic user listing and moderation actions.
2. Security changes
- Add a new SELECT policy `select_all_profiles_admin` allowing the admin email
  (traquinouriel@gmail.com) to read ALL profiles. The existing `select_own_profile`
  policy remains for non-admin users.
- Add an UPDATE policy `update_profile_admin` allowing the admin to update
  any profile's `banned` and `restricted` columns (for moderation).
3. Notes
- No data is lost: all new columns are nullable or have safe defaults.
- The admin check uses the profiles table (same pattern as message_events).
*/

-- Add new columns to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS banned boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS restricted boolean NOT NULL DEFAULT false;

-- Admin can read all profiles
DROP POLICY IF EXISTS "select_all_profiles_admin" ON profiles;
CREATE POLICY "select_all_profiles_admin"
ON profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
      AND lower(p.email) = 'traquinouriel@gmail.com'
  )
);

-- Admin can update any profile (for moderation: ban/restrict)
DROP POLICY IF EXISTS "update_profile_admin" ON profiles;
CREATE POLICY "update_profile_admin"
ON profiles FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
      AND lower(p.email) = 'traquinouriel@gmail.com'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
      AND lower(p.email) = 'traquinouriel@gmail.com'
  )
);
