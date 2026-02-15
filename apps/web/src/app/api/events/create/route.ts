import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.venue || !body.date || !body.price) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // In a real app, this would save to the database
        // For now, we'll return a success response with the mock created event

        const newEvent = {
            id: Math.floor(Math.random() * 10000), // Mock ID
            ...body,
            createdAt: new Date().toISOString(),
            status: 'draft', // Default to draft
        };

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            event: newEvent,
            message: 'Event created successfully'
        });

    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
