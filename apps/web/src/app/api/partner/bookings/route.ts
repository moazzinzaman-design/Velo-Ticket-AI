import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDatabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { eventId, quantity } = body;

        // Basic validation
        if (!eventId || !quantity || quantity <= 0) {
            return NextResponse.json(
                { error: 'Bad Request', message: 'Missing eventId or invalid quantity' },
                { status: 400 }
            );
        }

        const event = db.getEventById(eventId);
        if (!event) {
            return NextResponse.json(
                { error: 'Not Found', message: 'Event not found' },
                { status: 404 }
            );
        }

        if (event.tag === 'SOLD OUT') {
            return NextResponse.json(
                { error: 'Conflict', message: 'Event is sold out' },
                { status: 409 }
            );
        }

        // Mock getting partner ID from context (in real app, from api key)
        const partnerId = 'partner_01';

        // Update mock db
        const success = db.updateEventStock(eventId, quantity);

        if (!success) {
            return NextResponse.json(
                { error: 'Internal Server Error', message: 'Failed to update stock' },
                { status: 500 }
            );
        }

        const booking = db.createBooking({
            eventId,
            partnerId,
            quantity,
            totalPrice: event.price * quantity,
            status: 'confirmed'
        });

        return NextResponse.json({
            message: 'Booking successful',
            data: booking
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error', message: 'Invalid request body' },
            { status: 500 }
        );
    }
}
