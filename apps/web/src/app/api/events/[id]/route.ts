import { NextRequest, NextResponse } from 'next/server';
import { eventAggregator } from '../../../../lib/eventProviders';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
        }

        console.log('Fetching event by ID:', id);
        const event = await eventAggregator.getEventById(id);
        console.log('Event lookup result:', event ? 'Found' : 'Not found', event?.id, event?.title);

        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({ event });
    } catch (error) {
        console.error('Get Event Error:', error);
        return NextResponse.json({ error: 'Failed to fetch event details' }, { status: 500 });
    }
}
