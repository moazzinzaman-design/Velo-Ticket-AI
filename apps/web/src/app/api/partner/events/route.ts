import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDatabase';

export async function GET() {
    try {
        const events = db.getAllEvents();
        return NextResponse.json({
            data: events,
            meta: {
                count: events.length,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error', message: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}
