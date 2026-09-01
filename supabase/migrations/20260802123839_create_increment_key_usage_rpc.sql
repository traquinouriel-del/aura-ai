/*
# Create increment_key_usage RPC function

1. Purpose
- Atomically increments tokens_used and decrements tokens_remaining for a
  given API key, so both the admin edge function and the frontend can update
  usage without race conditions.
- Also updates last_reset_at if the quota has been reset (when tokens_used
  wraps around or a new day starts).

2. Security
- SECURITY DEFINER so the edge function can call it with the service role key.
- Executable by authenticated and anon (the frontend anon client needs access).
*/

CREATE OR REPLACE FUNCTION increment_key_usage(
  p_api_key text,
  p_tokens integer,
  p_quota bigint DEFAULT 500000
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE aura_api_keys
  SET
    tokens_used = tokens_used + p_tokens,
    tokens_remaining = GREATEST(0, tokens_remaining - p_tokens),
    last_reset_at = CASE
      WHEN last_reset_at < date_trunc('day', now()) THEN now()
      ELSE last_reset_at
    END
  WHERE api_key = p_api_key;

  -- Auto-reset if a new day has started since last_reset_at
  UPDATE aura_api_keys
  SET
    tokens_used = p_tokens,
    tokens_remaining = GREATEST(0, p_quota - p_tokens),
    last_reset_at = now()
  WHERE api_key = p_api_key
    AND last_reset_at < date_trunc('day', now());
END;
$$;

GRANT EXECUTE ON FUNCTION increment_key_usage(text, integer, bigint) TO anon, authenticated;
