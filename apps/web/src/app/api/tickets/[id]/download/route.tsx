import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { TicketPDF } from '../../../../../lib/tickets/pdf-generator';
import { generateSecureQRData } from '../../../../../lib/tickets/qr';
import QRCode from 'qrcode';
import { createClient } from '../../../../../lib/supabase/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const ticketId = id;
    const supabase = await createClient();

    try {
        // For prototype, we mock the DB fetch
        const mockTicket = {
            id: ticketId,
            eventId: '1',
            userId: 'user_123',
            seat: 'Section A, Row 5, Seat 12',
            event: {
                title: 'Coldplay: Music of the Spheres',
                date: 'Fri, Oct 12 • 8:00 PM',
                venue: 'Wembley Stadium'
            },
            user: {
                name: 'Alex Rivera'
            }
        };

        // 2. Generate QR Code
        const secureData = generateSecureQRData(mockTicket.id, mockTicket.eventId, mockTicket.userId);
        const qrDataURL = await QRCode.toDataURL(secureData);

        // 3. Render PDF Stream
        const stream = await renderToStream(
            <TicketPDF
                eventTitle={mockTicket.event.title}
                eventDate={mockTicket.event.date}
                eventVenue={mockTicket.event.venue}
                seat={mockTicket.seat}
                ticketId={mockTicket.id}
                qrDataURL={qrDataURL}
                userName={mockTicket.user.name}
            />
        );

        // 4. Return as PDF download
        return new NextResponse(stream as any, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="ticket-${ticketId}.pdf"`,
            },
        });

    } catch (error) {
        console.error('PDF Generation Error:', error);
        return NextResponse.json({ error: 'Failed to generate ticket' }, { status: 500 });
    }
}
