-- =====================================================
-- FIX 1: Remove user_metadata references from all RLS policies
-- user_metadata is user-editable and must never be used for auth checks.
-- Replace with auth.jwt() ->> 'email' (the verified email from Supabase Auth).
-- =====================================================

-- profiles: select_all_profiles_admin
DROP POLICY IF EXISTS "select_all_profiles_admin" ON public.profiles;
CREATE POLICY "select_all_profiles_admin" ON public.profiles
  FOR SELECT TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

-- profiles: update_profile_admin
DROP POLICY IF EXISTS "update_profile_admin" ON public.profiles;
CREATE POLICY "update_profile_admin" ON public.profiles
  FOR UPDATE TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

-- message_events: select_message_events
DROP POLICY IF EXISTS "select_message_events" ON public.message_events;
CREATE POLICY "select_message_events" ON public.message_events
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com'
  );

-- site_visits: select_site_visits_admin
DROP POLICY IF EXISTS "select_site_visits_admin" ON public.site_visits;
CREATE POLICY "select_site_visits_admin" ON public.site_visits
  FOR SELECT TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

-- support_tickets: select_support_tickets_admin
DROP POLICY IF EXISTS "select_support_tickets_admin" ON public.support_tickets;
CREATE POLICY "select_support_tickets_admin" ON public.support_tickets
  FOR SELECT TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

-- admin_changes: all 4 CRUD policies
DROP POLICY IF EXISTS "admin_select_admin_changes" ON public.admin_changes;
CREATE POLICY "admin_select_admin_changes" ON public.admin_changes
  FOR SELECT TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

DROP POLICY IF EXISTS "admin_insert_admin_changes" ON public.admin_changes;
CREATE POLICY "admin_insert_admin_changes" ON public.admin_changes
  FOR INSERT TO authenticated
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

DROP POLICY IF EXISTS "admin_update_admin_changes" ON public.admin_changes;
CREATE POLICY "admin_update_admin_changes" ON public.admin_changes
  FOR UPDATE TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

DROP POLICY IF EXISTS "admin_delete_admin_changes" ON public.admin_changes;
CREATE POLICY "admin_delete_admin_changes" ON public.admin_changes
  FOR DELETE TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

-- aura_provider_logs: admin_select_provider_logs
DROP POLICY IF EXISTS "admin_select_provider_logs" ON public.aura_provider_logs;
CREATE POLICY "admin_select_provider_logs" ON public.aura_provider_logs
  FOR SELECT TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

-- error_logs: 3 admin policies
DROP POLICY IF EXISTS "admin_select_error_logs" ON public.error_logs;
CREATE POLICY "admin_select_error_logs" ON public.error_logs
  FOR SELECT TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

DROP POLICY IF EXISTS "admin_update_error_logs" ON public.error_logs;
CREATE POLICY "admin_update_error_logs" ON public.error_logs
  FOR UPDATE TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

DROP POLICY IF EXISTS "admin_delete_error_logs" ON public.error_logs;
CREATE POLICY "admin_delete_error_logs" ON public.error_logs
  FOR DELETE TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

-- aura_otps: admin_select_aura_otps
DROP POLICY IF EXISTS "admin_select_aura_otps" ON public.aura_otps;
CREATE POLICY "admin_select_aura_otps" ON public.aura_otps
  FOR SELECT TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'traquinouriel@gmail.com');

-- =====================================================
-- FIX 2: Revoke EXECUTE on SECURITY DEFINER functions from anon and authenticated.
-- These functions are only called by the service role from edge functions,
-- never directly from the browser. Public EXECUTE allows any user to call them
-- via the REST API.
-- =====================================================

REVOKE EXECUTE ON FUNCTION public.increment_key_usage(text, integer, bigint) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.reset_exhausted_keys(bigint) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.increment_referral_count() FROM anon, authenticated;

-- =====================================================
-- FIX 3: Fix mutable search_path on increment_referral_count
-- =====================================================

CREATE OR REPLACE FUNCTION public.increment_referral_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.invitee_id IS NOT NULL AND (OLD.invitee_id IS NULL OR OLD.invitee_id <> NEW.invitee_id) THEN
    UPDATE profiles
    SET referral_count = referral_count + 1
    WHERE id::text = NEW.inviter_id;
  END IF;
  RETURN NEW;
END;
$function$;
