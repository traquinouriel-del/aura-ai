/*
# Drop Legacy RPCs — Corrected Signatures

The previous migration used incorrect parameter types (integer instead of bigint).
This drops the two legacy AI engine RPCs with their actual signatures.

## RPCs Removed
1. `increment_key_usage(p_api_key text, p_tokens integer, p_quota bigint)`
2. `reset_exhausted_keys(p_quota bigint)`

Both referenced the now-dropped `aura_api_keys` table and have no remaining dependencies.
*/

DROP FUNCTION IF EXISTS public.increment_key_usage(text, integer, bigint);
DROP FUNCTION IF EXISTS public.reset_exhausted_keys(bigint);
