-- Add phone column to profiles table for phone-based auth
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS phone text;

-- Update the display_name to be more prominent for phone users
COMMENT ON COLUMN profiles.phone IS 'User phone number in E.164 format (e.g. +244912345678)';
