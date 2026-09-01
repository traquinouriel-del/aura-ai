/*
# Drop Legacy AI Engine Infrastructure

## Purpose
Remove all database objects that belonged exclusively to the old Aura AI engine.
This is part of the SEDUX architectural reset (Phase 0B.2) — the old AI engine
has been fully removed from the frontend and edge functions; this migration
cleans up the remaining database artifacts.

## Objects Removed

### Tables (5)
1. `aura_api_keys` — stored API keys for AI providers (Groq, OpenAI, etc.)
2. `aura_provider_logs` — logged AI provider call metadata
3. `message_events` — tracked user message generation events
4. `error_logs` — logged AI engine errors
5. `admin_changes` — tracked AI assistant code edits

### RPCs (2)
1. `increment_key_usage` — incremented token usage on aura_api_keys
2. `reset_exhausted_keys` — reset daily token quotas on aura_api_keys

### Columns (1)
1. `profiles.ai_settings` — stored per-user AI config (temperature, longMemory, systemPrompt)

### Policies (all policies on the 5 legacy tables above)
- 4 policies on admin_changes (select/insert/update/delete)
- 4 policies on aura_api_keys (select/insert/update/delete)
- 2 policies on aura_provider_logs (select/insert)
- 4 policies on error_logs (select/insert/update/delete)
- 3 policies on message_events (select/insert/delete)

### Indexes (all indexes on the 5 legacy tables — dropped automatically with tables)

## Dependencies Verified
- No frontend code references any of these tables or RPCs
- No views reference these tables
- No remaining functions/RPCs reference these tables
- No triggers (other than FK constraint triggers) reference these tables
- profiles.ai_settings is not referenced by any function, trigger, or view

## Preserved (NOT touched)
- profiles (except ai_settings column)
- suitors
- pretendente_reports
- aura_otps
- aura_invite_shares
- site_visits
- support_tickets
- device_registrations
- All auth infrastructure
- All legitimate admin functionality (users, visits, metrics, support)
*/

-- Drop legacy RPCs first (they reference aura_api_keys)
DROP FUNCTION IF EXISTS public.increment_key_usage(text, integer, integer);
DROP FUNCTION IF EXISTS public.reset_exhausted_keys(integer);

-- Drop legacy tables (CASCADE handles indexes, policies, constraints, and FK triggers)
DROP TABLE IF EXISTS public.aura_api_keys CASCADE;
DROP TABLE IF EXISTS public.aura_provider_logs CASCADE;
DROP TABLE IF EXISTS public.message_events CASCADE;
DROP TABLE IF EXISTS public.error_logs CASCADE;
DROP TABLE IF EXISTS public.admin_changes CASCADE;

-- Drop legacy column from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS ai_settings;
