/*
# Admin changes log — tracks all file modifications proposed/applied by the AI assistant

1. Purpose
- When the admin assistant proposes code changes, they are stored here as a structured log.
- Each row represents one file modification (replace, create, or delete).
- The frontend can mark changes as "applied" after the admin reviews them.

2. Security
- RLS enabled. Both anon and authenticated can read/write (admin panel is behind PIN gate).
*/

CREATE TABLE IF NOT EXISTS admin_changes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id text NOT NULL,
  file_path text NOT NULL,
  action text NOT NULL CHECK (action IN ('replace', 'create', 'delete')),
  find_text text,
  replace_text text,
  reason text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'applied', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  applied_at timestamptz
);

ALTER TABLE admin_changes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read_admin_changes" ON admin_changes FOR SELECT
  TO anon, authenticated USING (true);
CREATE POLICY "insert_admin_changes" ON admin_changes FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_admin_changes" ON admin_changes FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_admin_changes" ON admin_changes FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_admin_changes_conversation
  ON admin_changes (conversation_id);
CREATE INDEX IF NOT EXISTS idx_admin_changes_status
  ON admin_changes (status);
