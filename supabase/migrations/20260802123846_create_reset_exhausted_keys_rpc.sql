/*
# Create reset_exhausted_keys RPC function

1. Purpose
- Resets tokens_used to 0 and tokens_remaining to the quota for all keys
  whose last_reset_at is before today (daily reset).
- Called by the frontend on startup to ensure keys are fresh each day.

2. Security
- SECURITY DEFINER. Executable by anon and authenticated.
*/

CREATE OR REPLACE FUNCTION reset_exhausted_keys(
  p_quota bigint DEFAULT 500000
) RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  UPDATE aura_api_keys
  SET
    tokens_used = 0,
    tokens_remaining = p_quota,
    last_reset_at = now()
  WHERE last_reset_at < date_trunc('day', now());

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

GRANT EXECUTE ON FUNCTION reset_exhausted_keys(bigint) TO anon, authenticated;
