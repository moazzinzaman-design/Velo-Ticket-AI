import { NextResponse } from 'next/server';
import { Ticket } from '@/types/ticket';

// Mock database of tickets for validation
const MOCK_TICKETS: Ticket[] = [
    {
        id: 't-123',
        eventId: 'e-1',
        eventName: 'Neon Dreams Festival',
        venueName: 'Cyber Arena',
        eventDate: '2024-11-15',
        eventTime: '20:00',
        seat: 'General Admission',
        section: 'GA',
        row: '',
        seatNumber: '',
        price: 150,
        qrPayload: 'valid-qr-payload-123',
        status: 'active',
        ownerName: 'Alice Johnson',
        purchaseDate: '2024-10-01',
        authenticityHash: '0xabc123...',
    },
    {
        id: 't-456',
        eventId: 'e-1',
        eventName: 'Neon Dreams Festival',
        venueName: 'Cyber Arena',
        eventDate: '2024-11-15',
        eventTime: '20:00',
        seat: 'VIP',
        section: 'VIP',
        row: 'A',
        seatNumber: '1',
        price: 300,
        qrPayload: 'valid-qr-payload-456',
        status: 'used',
        ownerName: 'Bob Smith',
        purchaseDate: '2024-10-02',
        authenticityHash: '0xdef456...',
    }
];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { ticketId, gateId, securityHash } = body;

        // Simulate database lookup
        const ticket = MOCK_TICKETS.find(t => t.id === ticketId);

        if (!ticket) {
            return NextResponse.json(
                { valid: false, message: 'Ticket not found' },
                { status: 404 }
            );
        }

        if (ticket.status === 'used') {
            return NextResponse.json(
                { valid: false, message: 'Ticket already used' },
                { status: 409 }
            );
        }

        // In a real app, we would verify the securityHash here

        return NextResponse.json({
            valid: true,
            ticket: {
                id: ticket.id,
                eventName: ticket.eventName,
                seat: ticket.seat,
                ownerName: ticket.ownerName,
                status: ticket.status
            },
            passenger: {
                id: 'u-789', // Mock user id
                name: ticket.ownerName,
                isVerified: true
            },
            scanTime: new Date().toISOString(),
            gateId: gateId || 'GATE-A'
        });

    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
