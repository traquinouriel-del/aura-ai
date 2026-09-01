-- Revoke SELECT on the api_key column from authenticated role.
-- This is defense-in-depth: even though RLS policies only allow the admin
-- to SELECT rows, this prevents the raw api_key value from ever reaching
-- the browser. The admin-keys edge function uses the service_role key
-- which bypasses all column-level privileges.
REVOKE SELECT (api_key) ON aura_api_keys FROM authenticated;
