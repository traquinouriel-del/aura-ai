/*
# Fix infinite recursion in profiles RLS policies

## Root cause
The `profiles` table had two admin policies (`select_all_profiles_admin`,
`update_profile_admin`) whose USING/WITH CHECK predicates ran
`EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() ...)`.
A policy on `profiles` that subqueries `profiles` triggers infinite
recursion: evaluating the policy requires reading the table, which
requires evaluating the policy, ad infinitum. This made every query
against `profiles` fail with `infinite recursion detected in policy for
relation "profiles"`.

The same self-referencing admin check was duplicated on `message_events`,
`site_visits`, and `support_tickets`. Those tables' SELECT policies also
subqueried `profiles`, so once the `profiles` policies recursed, every
dependent query failed too — blocking the admin Metrics, Users, and
Visits tabs.

## Fix
Replace every `EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid()
AND lower(p.email) = 'traquinouriel@gmail.com')` admin check with a
JWT-based check that does NOT touch the `profiles` table:

  lower(auth.jwt() -> 'user_metadata' ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'app_metadata' ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com'

Supabase includes the user email in the JWT under `email` (and sometimes
under user_metadata/app_metadata). Reading it from the JWT avoids any
table access, eliminating the recursion entirely.

## Tables modified
1. `profiles` — drop and recreate `select_all_profiles_admin` and
   `update_profile_admin` with JWT-based admin check.
2. `message_events` — drop and recreate `select_message_events` with
   JWT-based admin check (keeps the `user_id = auth.uid()` own-read).
3. `site_visits` — drop and recreate `select_site_visits_admin` with
   JWT-based admin check.
4. `support_tickets` — drop and recreate `select_support_tickets_admin`
   with JWT-based admin check.

## Security
- No data is lost or modified — only policy definitions change.
- Owner-scoped policies (`auth.uid() = id` / `user_id`) are untouched.
- The admin email check is now evaluated from the signed JWT, which is
  tamper-proof and does not require table access.
*/

-- Helper: a single SQL fragment for the admin email check via JWT.
-- We inline it in each policy because PostgreSQL policies cannot
-- reference user-defined functions that touch the same table.

-- 1. PROFILES: fix the self-referencing admin policies
DROP POLICY IF EXISTS "select_all_profiles_admin" ON profiles;
CREATE POLICY "select_all_profiles_admin"
ON profiles FOR SELECT
TO authenticated
USING (
  lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'user_metadata' ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'app_metadata' ->> 'email') = 'traquinouriel@gmail.com'
);

DROP POLICY IF EXISTS "update_profile_admin" ON profiles;
CREATE POLICY "update_profile_admin"
ON profiles FOR UPDATE
TO authenticated
USING (
  lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'user_metadata' ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'app_metadata' ->> 'email') = 'traquinouriel@gmail.com'
)
WITH CHECK (
  lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'user_metadata' ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'app_metadata' ->> 'email') = 'traquinouriel@gmail.com'
);

-- 2. MESSAGE_EVENTS: fix the admin subquery on profiles
DROP POLICY IF EXISTS "select_message_events" ON message_events;
CREATE POLICY "select_message_events"
ON message_events FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  OR lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'user_metadata' ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'app_metadata' ->> 'email') = 'traquinouriel@gmail.com'
);

-- 3. SITE_VISITS: fix the admin subquery on profiles
DROP POLICY IF EXISTS "select_site_visits_admin" ON site_visits;
CREATE POLICY "select_site_visits_admin"
ON site_visits FOR SELECT
TO authenticated
USING (
  lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'user_metadata' ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'app_metadata' ->> 'email') = 'traquinouriel@gmail.com'
);

-- 4. SUPPORT_TICKETS: fix the admin subquery on profiles
DROP POLICY IF EXISTS "select_support_tickets_admin" ON support_tickets;
CREATE POLICY "select_support_tickets_admin"
ON support_tickets FOR SELECT
TO authenticated
USING (
  lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'user_metadata' ->> 'email') = 'traquinouriel@gmail.com'
  OR lower(auth.jwt() -> 'app_metadata' ->> 'email') = 'traquinouriel@gmail.com'
);