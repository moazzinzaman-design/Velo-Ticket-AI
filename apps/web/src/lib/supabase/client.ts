import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create client only if credentials are provided
export const supabase: SupabaseClient | null =
    supabaseUrl && supabaseAnonKey
        ? createClient(supabaseUrl, supabaseAnonKey)
        : null;

if (!supabase) {
    console.warn('Supabase credentials not configured. Database features will be disabled.');
}

// Database types
export interface DbEvent {
    id: string;
    external_id: string;
    source: 'ticketmaster' | 'skiddle' | 'seatgeek' | 'mock';
    title: string;
    venue: string;
    city: string;
    address: string | null;
    lat: number | null;
    lng: number | null;
    date: string;
    time: string;
    price: number;
    category: string;
    image_url: string;
    tag: string;
    sold_percentage: number;
    description: string | null;
    last_updated: string;
}
