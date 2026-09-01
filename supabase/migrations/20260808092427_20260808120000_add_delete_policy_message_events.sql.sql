/*
# Add DELETE policy to message_events

1. Purpose
   The "Delete All Data" factory reset in the Profile tab needs to wipe a user's
   message_events rows. Currently message_events has INSERT and SELECT policies
   but no DELETE policy, so users cannot delete their own message history even
   though the table grants DELETE to authenticated.

2. Security changes
   - Adds `delete_own_message_events` DELETE policy on `message_events`,
     scoped to `TO authenticated` with `USING (auth.uid() = user_id)`.
   - No other policies or tables are touched.
*/

DROP POLICY IF EXISTS "delete_own_message_events" ON message_events;

CREATE POLICY "delete_own_message_events"
ON message_events FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
