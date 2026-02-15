-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_title TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE,
  venue_name TEXT,
  seat_info TEXT, -- e.g. "Section A, Row 1, Seat 5"
  qr_code TEXT UNIQUE NOT NULL,
  price_paid INTEGER NOT NULL, -- in cents/pence
  status TEXT DEFAULT 'valid', -- valid, used, refunded
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create orders table (optional, for grouping tickets)
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  total_amount INTEGER NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies: Users can view their own tickets
DROP POLICY IF EXISTS "Users can view own tickets" ON tickets;
CREATE POLICY "Users can view own tickets" ON tickets
  FOR SELECT USING (auth.uid() = user_id);

-- Policies: Service role can insert/update (for webhooks)
DROP POLICY IF EXISTS "Service role can insert tickets" ON tickets;
CREATE POLICY "Service role can insert tickets" ON tickets
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);
