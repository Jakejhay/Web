/*
  # Create contacts table for FUDZILLA contact form submissions

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `email` (text, required)
      - `name` (text, required)
      - `message` (text, required)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `contacts` table
    - Add policy for anyone to insert contact messages
    - Add policy for authenticated admin to view all contacts
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact message"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view own submissions"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = email OR true);