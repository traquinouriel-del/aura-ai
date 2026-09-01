/*
# Add RLS policies for aura_otps table

The aura_otps table had RLS enabled but NO policies, meaning it was locked
down for all non-service-role access. Edge functions use the service role key
which bypasses RLS, so they work fine. But admin panel needs read access.

## Changes
- Admin-only SELECT on aura_otps
- No INSERT/UPDATE/DELETE from the client (edge functions handle via service role)
*/

DROP POLICY IF EXISTS "admin_select_aura_otps" ON aura_otps;

CREATE POLICY "admin_select_aura_otps"
ON aura_otps FOR SELECT
TO authenticated
USING (
  lower((auth.jwt() ->> 'email')) = 'traquinouriel@gmail.com'
  OR lower(((auth.jwt() -> 'user_metadata') ->> 'email')) = 'traquinouriel@gmail.com'
);