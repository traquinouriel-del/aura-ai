/*
# Fix RLS Policies for Account Isolation and Data Security

## Problem
Multiple tables have overly permissive RLS policies using `USING (true)` or
`WITH CHECK (true)`, allowing any authenticated (or even anon) user to read,
modify, or delete ALL rows — including other users' data and admin-only
resources like API keys.

## Changes

### 1. aura_api_keys — Admin-only access (CRITICAL)
Previously: any user could SELECT/INSERT/UPDATE/DELETE all API keys.
Now: only the admin user (identified by email in JWT) can access this table.

### 2. admin_changes — Admin-only access
Previously: any user could read/modify the admin audit log.
Now: only admin can access.

### 3. aura_provider_logs — Admin-only SELECT, authenticated INSERT
Previously: any authenticated user could read all provider logs.
Now: INSERT remains open to authenticated (app logs from frontend),
SELECT restricted to admin only.

### 4. error_logs — Admin-only SELECT/UPDATE/DELETE, open INSERT
Previously: any authenticated user could read/delete all error logs.
Now: INSERT remains open (app logs errors), management restricted to admin.

### 5. device_registrations — User-scoped SELECT, open INSERT
Previously: any user could see all device registrations.
Now: SELECT scoped to auth.uid() = user_id, INSERT stays open for signup.

### 6. aura_invite_shares — Ownership-scoped UPDATE
Previously: any user could UPDATE any invite share row.
Now: UPDATE scoped to inviter_id = auth.uid()::text (inviter_id is text type).

## Security
All policies use auth.uid() for ownership checks or the admin email
pattern for admin-only access. No USING(true) remains on sensitive tables.
*/

-- ============================================================================
-- 1. aura_api_keys — Admin-only
-- ============================================================================
DROP POLICY IF EXISTS "anon_select_api_keys" ON aura_api_keys;
DROP POLICY IF EXISTS "anon_insert_api_keys" ON aura_api_keys;
DROP POLICY IF EXISTS "anon_update_api_keys" ON aura_api_keys;
DROP POLICY IF EXISTS "anon_delete_api_keys" ON aura_api_keys;

CREATE POLICY "admin_select_api_keys"
ON aura_api_keys FOR SELECT
TO authenticated
USING (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

CREATE POLICY "admin_insert_api_keys"
ON aura_api_keys FOR INSERT
TO authenticated
WITH CHECK (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

CREATE POLICY "admin_update_api_keys"
ON aura_api_keys FOR UPDATE
TO authenticated
USING (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
)
WITH CHECK (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

CREATE POLICY "admin_delete_api_keys"
ON aura_api_keys FOR DELETE
TO authenticated
USING (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

-- ============================================================================
-- 2. admin_changes — Admin-only
-- ============================================================================
DROP POLICY IF EXISTS "read_admin_changes" ON admin_changes;
DROP POLICY IF EXISTS "insert_admin_changes" ON admin_changes;
DROP POLICY IF EXISTS "update_admin_changes" ON admin_changes;
DROP POLICY IF EXISTS "delete_admin_changes" ON admin_changes;

CREATE POLICY "admin_select_admin_changes"
ON admin_changes FOR SELECT
TO authenticated
USING (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

CREATE POLICY "admin_insert_admin_changes"
ON admin_changes FOR INSERT
TO authenticated
WITH CHECK (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

CREATE POLICY "admin_update_admin_changes"
ON admin_changes FOR UPDATE
TO authenticated
USING (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
)
WITH CHECK (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

CREATE POLICY "admin_delete_admin_changes"
ON admin_changes FOR DELETE
TO authenticated
USING (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

-- ============================================================================
-- 3. aura_provider_logs — Admin-only SELECT, authenticated INSERT
-- ============================================================================
DROP POLICY IF EXISTS "select_provider_logs_authenticated" ON aura_provider_logs;
DROP POLICY IF EXISTS "insert_provider_logs_authenticated" ON aura_provider_logs;

CREATE POLICY "admin_select_provider_logs"
ON aura_provider_logs FOR SELECT
TO authenticated
USING (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

CREATE POLICY "auth_insert_provider_logs"
ON aura_provider_logs FOR INSERT
TO authenticated
WITH CHECK (true);

-- ============================================================================
-- 4. error_logs — Admin-only SELECT/UPDATE/DELETE, open INSERT
-- ============================================================================
DROP POLICY IF EXISTS "select_error_logs" ON error_logs;
DROP POLICY IF EXISTS "update_error_logs" ON error_logs;
DROP POLICY IF EXISTS "delete_error_logs" ON error_logs;
DROP POLICY IF EXISTS "insert_error_logs" ON error_logs;

CREATE POLICY "admin_select_error_logs"
ON error_logs FOR SELECT
TO authenticated
USING (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

CREATE POLICY "auth_insert_error_logs"
ON error_logs FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "admin_update_error_logs"
ON error_logs FOR UPDATE
TO authenticated
USING (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
)
WITH CHECK (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

CREATE POLICY "admin_delete_error_logs"
ON error_logs FOR DELETE
TO authenticated
USING (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);

-- ============================================================================
-- 5. device_registrations — User-scoped SELECT, open INSERT
-- ============================================================================
DROP POLICY IF EXISTS "select_device_registrations" ON device_registrations;
DROP POLICY IF EXISTS "insert_device_registrations" ON device_registrations;

CREATE POLICY "select_own_device_registrations"
ON device_registrations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "insert_device_registrations"
ON device_registrations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- ============================================================================
-- 6. aura_invite_shares — Ownership-scoped UPDATE (inviter_id is text)
-- ============================================================================
DROP POLICY IF EXISTS "anon_update_invitee" ON aura_invite_shares;

CREATE POLICY "update_own_invite_shares"
ON aura_invite_shares FOR UPDATE
TO authenticated
USING (inviter_id = auth.uid()::text)
WITH CHECK (inviter_id = auth.uid()::text);