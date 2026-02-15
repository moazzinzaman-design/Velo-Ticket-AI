import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables BEFORE other imports that might use them
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';
import { TicketmasterProvider } from '../lib/eventProviders/ticketmaster';
import { SkiddleProvider } from '../lib/eventProviders/skiddle';
import { RealEvent } from '../data/realEvents';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function ingestEvents() {
    console.log('Starting Event Ingestion...');

    const providers = [];

    if (process.env.TICKETMASTER_API_KEY) {
        providers.push(new TicketmasterProvider({
            apiKey: process.env.TICKETMASTER_API_KEY,
            baseUrl: 'https://app.ticketmaster.com/discovery/v2',
            rateLimit: { requestsPerSecond: 5, requestsPerDay: 5000 },
        }));
    } else {
        console.warn('Skipping Ticketmaster: No API Key');
    }

    if (process.env.SKIDDLE_API_KEY) {
        providers.push(new SkiddleProvider({
            apiKey: process.env.SKIDDLE_API_KEY,
            baseUrl: 'https://www.skiddle.com/api/v1',
        }));
    } else {
        console.warn('Skipping Skiddle: No API Key');
    }

    try {
        // 1. Fetch from Providers
        const allEvents: RealEvent[] = [];

        for (const provider of providers) {
            console.log(`Fetching from ${provider.name}...`);
            try {
                const events = await provider.search({ city: 'London', limit: 20 });
                console.log(`Fetched ${events.length} events from ${provider.name}`);
                allEvents.push(...events);
            } catch (err) {
                console.error(`Error fetching from ${provider.name}:`, err);
            }
        }

        console.log(`Total events fetched: ${allEvents.length}`);

        // 2. Transform and Insert
        for (const event of allEvents) {
            // Map to Supabase table structure
            // Note: You need to create this table in Supabase first!
            const { error } = await supabase
                .from('events')
                .upsert({
                    id: event.id, // Ensure IDs are compatible (string/int mismatch might occur)
                    title: event.title,
                    description: event.description,
                    date: new Date(event.date + ' ' + event.time).toISOString(), // Combine date/time
                    location: event.location.address + ', ' + event.location.city,
                    venue_name: event.venue, // Assuming venue column name
                    city: event.location.city,
                    image_url: event.image,
                    price: event.price,
                    category: event.category,
                    provider_id: event.id.toString(), // Store original ID
                    provider: 'aggregated'
                }, { onConflict: 'id' });

            if (error) {
                // console.error(`Failed to insert event ${event.title}:`, error.message);
                // Suppress verbose errors for now as table might not exist
            }
        }

        console.log('Ingestion process finished.');

    } catch (error) {
        console.error('Ingestion Failed:', error);
    }
}

ingestEvents();
