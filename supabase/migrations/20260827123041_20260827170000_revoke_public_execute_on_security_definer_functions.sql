-- PostgreSQL grants EXECUTE on functions to PUBLIC by default.
-- anon and authenticated inherit from PUBLIC, so revoking from them
-- individually is not sufficient. Must revoke from PUBLIC.

REVOKE EXECUTE ON FUNCTION public.increment_key_usage(text, integer, bigint) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.reset_exhausted_keys(bigint) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.increment_referral_count() FROM PUBLIC;
