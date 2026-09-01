/*
# Create aura_invite_shares table for invite tracking

1. New Tables
- `aura_invite_shares`
  - `id` (uuid, primary key)
  - `inviter_id` (text, not null — stores user id or guest fallback id)
  - `platform` (text, not null — whatsapp, telegram, instagram, copy)
  - `invite_code` (text, not null — short invite code)
  - `invitee_id` (uuid, nullable — filled when a friend joins via this link)
  - `joined_at` (timestamptz, nullable — when the invitee signed up)
  - `created_at` (timestamptz, default now)

2. Security
- Enable RLS on `aura_invite_shares`.
- Allow anon + authenticated to insert share records (guests can share too).
- Allow authenticated users to read their own invite records.
- Allow anon to update invitee_id/joined_at when someone joins via a link.

3. Indexes
- Index on `invite_code` for fast lookups when someone visits via a ref link.
- Index on `inviter_id` for counting total shares per user.
*/

CREATE TABLE IF NOT EXISTS aura_invite_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_id text NOT NULL,
  platform text NOT NULL,
  invite_code text NOT NULL,
  invitee_id uuid,
  joined_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE aura_invite_shares ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_shares" ON aura_invite_shares;
CREATE POLICY "anon_insert_shares" ON aura_invite_shares FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_own_shares" ON aura_invite_shares;
CREATE POLICY "auth_read_own_shares" ON aura_invite_shares FOR SELECT
  TO authenticated USING (auth.uid()::text = inviter_id);

DROP POLICY IF EXISTS "anon_update_invitee" ON aura_invite_shares;
CREATE POLICY "anon_update_invitee" ON aura_invite_shares FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_aura_invite_shares_code ON aura_invite_shares(invite_code);
CREATE INDEX IF NOT EXISTS idx_aura_invite_shares_inviter ON aura_invite_shares(inviter_id);
