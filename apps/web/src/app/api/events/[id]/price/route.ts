import { NextRequest, NextResponse } from 'next/server';
import { calculateDynamicPrice } from '../../../../../lib/pricing/engine';
import { realEvents } from '../../../../../data/realEvents';
import { createClient } from '../../../../../lib/supabase/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    const supabase = await createClient();

    // 1. Try fetch from DB
    let event = null;
    const { data: dbEvent } = await supabase.from('events').select('*').eq('id', id).single();

    if (dbEvent) {
        event = {
            price: dbEvent.price,
            soldPercentage: dbEvent.sold_percentage || 50,
            date: dbEvent.date,
            views: 42
        };
    } else {
        // Fallback to static data
        const staticEvent = realEvents.find(e => e.id === id);
        if (staticEvent) {
            event = {
                price: staticEvent.price,
                soldPercentage: staticEvent.soldPercentage,
                date: staticEvent.date + ' ' + staticEvent.time,
                views: Math.floor(Math.random() * 100)
            };
        }
    }

    if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // 2. Calculate Price
    const pricing = calculateDynamicPrice(
        event.price,
        event.soldPercentage,
        event.views,
        event.date
    );

    return NextResponse.json(pricing);
}
