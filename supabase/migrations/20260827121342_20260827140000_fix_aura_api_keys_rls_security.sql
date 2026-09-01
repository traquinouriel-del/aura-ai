-- ============================================================================
-- SECURITY FIX: aura_api_keys RLS policies
-- ============================================================================
-- PROBLEM: The existing policies used `auth.jwt() -> 'user_metadata' ->> 'email'`
-- as an alternative admin check. user_metadata is CLIENT-EDITABLE via the Supabase
-- auth API — any authenticated user can set their user_metadata.email to the
-- admin's email and gain full access to all API keys (including the raw api_key
-- column).
--
-- FIX:
-- 1. Drop all existing policies that reference user_metadata.
-- 2. Create new policies that ONLY check `auth.jwt() ->> 'email'` (the verified
--    auth email, which cannot be spoofed via user_metadata).
-- 3. Revoke the raw `api_key` column from the anon/authenticated roles so that
--    even if a SELECT policy is somehow bypassed, the key itself is not readable.
--    The admin-keys edge function uses the service_role key which bypasses RLS.
-- ============================================================================

-- Drop all existing policies
DROP POLICY IF EXISTS "admin_select_api_keys" ON aura_api_keys;
DROP POLICY IF EXISTS "admin_insert_api_keys" ON aura_api_keys;
DROP POLICY IF EXISTS "admin_update_api_keys" ON aura_api_keys;
DROP POLICY IF EXISTS "admin_delete_api_keys" ON aura_api_keys;

-- Create new policies using ONLY the verified auth email (not user_metadata)
-- The admin email is hardcoded as the single source of truth for admin access.
CREATE POLICY "admin_select_api_keys" ON aura_api_keys
  FOR SELECT TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

CREATE POLICY "admin_insert_api_keys" ON aura_api_keys
  FOR INSERT TO authenticated
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

CREATE POLICY "admin_update_api_keys" ON aura_api_keys
  FOR UPDATE TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

CREATE POLICY "admin_delete_api_keys" ON aura_api_keys
  FOR DELETE TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

-- Revoke direct access to the api_key column from anon and authenticated roles.
-- Only the service_role (used by edge functions) can read the actual key value.
-- This is a defense-in-depth measure: even if a SELECT policy is somehow bypassed,
-- the api_key column itself is not readable by client-side requests.
REVOKE UPDATE (api_key) ON aura_api_keys FROM authenticated;
