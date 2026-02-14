-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id TEXT NOT NULL,
    source TEXT NOT NULL CHECK (source IN ('ticketmaster', 'skiddle', 'seatgeek', 'mock')),
    title TEXT NOT NULL,
    venue TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT,
    lat FLOAT,
    lng FLOAT,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    price FLOAT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    tag TEXT,
    sold_percentage INT DEFAULT 0 CHECK (sold_percentage >= 0 AND sold_percentage <= 100),
    description TEXT,
    last_updated TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(external_id, source)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_city ON events(city);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_location ON events(lat, lng);
CREATE INDEX IF NOT EXISTS idx_events_last_updated ON events(last_updated);
CREATE INDEX IF NOT EXISTS idx_events_source ON events(source);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- Cache metadata table
CREATE TABLE IF NOT EXISTS event_cache_metadata (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city TEXT NOT NULL,
    category TEXT,
    last_synced TIMESTAMP DEFAULT NOW(),
    event_count INT DEFAULT 0,
    sources_used TEXT[], -- array of sources that contributed
    UNIQUE(city, category)
);

CREATE INDEX IF NOT EXISTS idx_cache_city_category ON event_cache_metadata(city, category);
