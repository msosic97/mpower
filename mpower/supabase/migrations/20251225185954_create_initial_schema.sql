/*
  # Mugen Power Initial Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `created_at` (timestamptz)
    
    - `services`
      - `id` (uuid, primary key)
      - `name` (text) - Service name like "STAGE 1", "EGR/AGR", etc.
      - `description` (text)
      - `icon` (text) - Icon identifier
      - `order` (integer) - Display order
      - `active` (boolean)
      - `created_at` (timestamptz)
    
    - `news_updates`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `published` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `service_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `service_id` (uuid, references services)
      - `status` (text) - pending, processing, completed
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Profiles: Users can read their own profile, admins can read all
    - Services: Public read access, admin write access
    - News: Public read for published, admin write access
    - Service requests: Users can read their own, admins can read all
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT 'zap',
  "order" integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  TO public
  USING (active = true);

-- News updates table
CREATE TABLE IF NOT EXISTS news_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE news_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published news"
  ON news_updates FOR SELECT
  TO public
  USING (published = true);

-- Service requests table
CREATE TABLE IF NOT EXISTS service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own service requests"
  ON service_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create service requests"
  ON service_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert initial services
INSERT INTO services (name, description, icon, "order", active) VALUES
  ('STAGE 1', 'Performance optimization for maximum power and torque', 'gauge', 1, true),
  ('STAGE 2', 'Advanced tuning with hardware modifications', 'rocket', 2, true),
  ('EGR/AGR', 'Exhaust Gas Recirculation removal or optimization', 'wind', 3, true),
  ('DPF/FAP', 'Diesel Particulate Filter solutions', 'filter', 4, true),
  ('DTC', 'Diagnostic Trouble Code removal', 'alert-circle', 5, true),
  ('ADBLUE', 'AdBlue system optimization', 'droplet', 6, true),
  ('SWIRL/FLAPS', 'Swirl flaps removal and tuning', 'settings', 7, true),
  ('TVA', 'Torque limiter adjustments', 'trending-up', 8, true),
  ('LAMBDA/O2', 'Lambda sensor optimization', 'activity', 9, true)
ON CONFLICT DO NOTHING;