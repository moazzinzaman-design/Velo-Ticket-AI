import { NextResponse } from 'next/server';
import { Ticket } from '@/types/ticket';

// Mock database of tickets for validation
const MOCK_TICKETS: Ticket[] = [
    {
        id: 't-123',
        event_id: 'e-1',
        event_title: 'Neon Dreams Festival',
        venue_name: 'Cyber Arena',
        event_date: '2024-11-15',
        event_time: '20:00',
        seat_info: 'General Admission',
        section: 'GA',
        row: '',
        seat_number: '',
        price: 150,
        qr_code: 'valid-qr-payload-123',
        status: 'active',
        owner_name: 'Alice Johnson',
        purchase_date: '2024-10-01',
        authenticity_hash: '0xabc123...',
    },
    {
        id: 't-456',
        event_id: 'e-1',
        event_title: 'Neon Dreams Festival',
        venue_name: 'Cyber Arena',
        event_date: '2024-11-15',
        event_time: '20:00',
        seat_info: 'VIP',
        section: 'VIP',
        row: 'A',
        seat_number: '1',
        price: 300,
        qr_code: 'valid-qr-payload-456',
        status: 'used',
        owner_name: 'Bob Smith',
        purchase_date: '2024-10-02',
        authenticity_hash: '0xdef456...',
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
                event_title: ticket.event_title,
                seat_info: ticket.seat_info,
                owner_name: ticket.owner_name,
                status: ticket.status
            },
            passenger: {
                id: 'u-789', // Mock user id
                name: ticket.owner_name,
                is_verified: true
            },
            scan_time: new Date().toISOString(),
            gate_id: gateId || 'GATE-A'
        });

    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
