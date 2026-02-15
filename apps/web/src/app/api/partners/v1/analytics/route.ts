import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
        return NextResponse.json(
            { error: 'eventId is required' },
            { status: 400 }
        );
    }

    // Mock data simulation - normally this would query a real database
    // using the eventId to get aggregate stats
    const analyticsData = {
        event_id: eventId,
        tickets_sold: 12500,
        capacity: 15000,
        revenue: 1875000, // $1.8M
        currency: 'USD',
        attendance_rate: 0.85, // 85% currently scanned in if event is live
        scans_last_hour: 342,
        demographics: {
            labels: ['18-24', '25-34', '35-44', '45+'],
            values: [40, 35, 15, 10]
        },
        updated_at: new Date().toISOString()
    };

    return NextResponse.json(analyticsData);
}
