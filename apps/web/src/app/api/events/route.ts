import { NextRequest, NextResponse } from 'next/server';
import { eventAggregator } from '../../../lib/eventProviders';
import { createClient } from '../../../lib/supabase/server';
import { scanContent } from '../../../lib/moderation/scanner';
import type { RealEvent } from '../../../data/realEvents';

const CACHE_DURATION_MINUTES = 15;

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    try {
        const body = await req.json();
        const { title, description, date, venue, city } = body;

        // 1. Content Moderation
        const { flagged, reason } = await scanContent(`${title} ${description}`);
        if (flagged) {
            return NextResponse.json({
                error: 'Content violation detected.',
                reason
            }, { status: 400 });
        }

        // 2. Save to Supabase
        const { data, error } = await supabase.from('events').insert({
            title,
            description,
            date,
            venue,
            city,
            source: 'user_generated',
        }).select().single();

        if (error) throw error;

        return NextResponse.json({ event: data });

    } catch (error: any) {
        console.error('Create Event Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const supabase = await createClient();
    try {
        const { searchParams } = new URL(req.url);
        const city = searchParams.get('city') || 'London';
        const category = searchParams.get('category') || undefined;
        const lat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : undefined;
        const lng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : undefined;
        const radius = searchParams.get('radius') ? parseFloat(searchParams.get('radius')!) : 50;
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;

        // Check cache first
        const cachedEvents = await getCachedEvents(supabase, city, category);
        if (cachedEvents) {
            console.log(`Cache hit for ${city}/${category || 'all'}`);
            return NextResponse.json({
                events: cachedEvents,
                source: 'cache',
                providers: eventAggregator.getConfiguredProviders(),
            });
        }

        // Fetch fresh data from providers
        console.log(`Fetching fresh events for ${city}/${category || 'all'}`);
        const events = await eventAggregator.searchEvents({
            city,
            category,
            lat,
            lng,
            radius,
            limit,
        });

        // Store in cache
        await cacheEvents(supabase, city, category, events);

        return NextResponse.json({
            events,
            source: 'live',
            providers: eventAggregator.getConfiguredProviders(),
            cached_at: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Events API error:', error);

        // Fallback to mock data
        const { realEvents } = await import('../../../data/realEvents');
        return NextResponse.json({
            events: realEvents.slice(0, 20),
            source: 'fallback',
            error: 'Failed to fetch live events',
        }, { status: 500 });
    }
}

async function getCachedEvents(
    supabase: any,
    city: string,
    category: string | undefined
): Promise<RealEvent[] | null> {
    if (!supabase) return null;

    try {
        const { data: metadata } = await supabase
            .from('event_cache_metadata')
            .select('last_synced, event_count')
            .eq('city', city)
            .eq('category', category || '')
            .single();

        if (!metadata) return null;

        const cacheAge = Date.now() - new Date(metadata.last_synced).getTime();
        const isStale = cacheAge > CACHE_DURATION_MINUTES * 60 * 1000;

        if (isStale) return null;

        const query = supabase
            .from('events')
            .select('*')
            .eq('city', city);

        if (category) {
            query.eq('category', category);
        }

        const { data: events } = await query.limit(50);

        if (!events || events.length === 0) return null;

        return events.map(mapDbEventToRealEvent);
    } catch (error) {
        console.error('Cache read error:', error);
        return null;
    }
}

async function cacheEvents(
    supabase: any,
    city: string,
    category: string | undefined,
    events: RealEvent[]
): Promise<void> {
    if (!supabase) return;

    try {
        const dbEvents = events.map(e => ({
            external_id: `${e.id}`,
            source: 'aggregated' as const,
            title: e.title,
            venue: e.venue,
            city: e.location.city,
            address: e.location.address,
            lat: e.location.coordinates.lat,
            lng: e.location.coordinates.lng,
            date: e.date,
            time: e.time,
            price: e.price,
            category: e.category,
            image_url: e.image,
            tag: e.tag,
            sold_percentage: e.soldPercentage,
            description: e.description || null,
            last_updated: new Date().toISOString(),
        }));

        await supabase.from('events').upsert(dbEvents, {
            onConflict: 'external_id,source',
        });

        await supabase.from('event_cache_metadata').upsert({
            city,
            category: category || '',
            last_synced: new Date().toISOString(),
            event_count: events.length,
            sources_used: eventAggregator.getConfiguredProviders(),
        }, {
            onConflict: 'city,category',
        });
    } catch (error) {
        console.error('Cache write error:', error);
    }
}

function mapDbEventToRealEvent(dbEvent: any): RealEvent {
    return {
        id: parseInt(dbEvent.id),
        title: dbEvent.title,
        venue: dbEvent.venue,
        location: {
            city: dbEvent.city,
            address: dbEvent.address || '',
            coordinates: {
                lat: dbEvent.lat || 0,
                lng: dbEvent.lng || 0,
            },
        },
        date: dbEvent.date,
        time: dbEvent.time,
        price: dbEvent.price,
        category: dbEvent.category,
        image: dbEvent.image_url,
        tag: dbEvent.tag,
        soldPercentage: dbEvent.sold_percentage,
        description: dbEvent.description,
    };
}
