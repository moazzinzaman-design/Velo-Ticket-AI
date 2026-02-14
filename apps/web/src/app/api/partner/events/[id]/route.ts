import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDatabase';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return NextResponse.json(
            { error: 'Bad Request', message: 'Invalid Event ID' },
            { status: 400 }
        );
    }

    const event = db.getEventById(id);

    if (!event) {
        return NextResponse.json(
            { error: 'Not Found', message: `Event with ID ${id} not found` },
            { status: 404 }
        );
    }

    return NextResponse.json({ data: event });
}
