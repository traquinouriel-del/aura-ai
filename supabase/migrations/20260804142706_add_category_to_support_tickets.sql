-- Add category column to support_tickets table
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS category text;
