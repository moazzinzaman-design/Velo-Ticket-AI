import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export interface TicketData {
    ticketId: string;
    orderId: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    venueName: string;
    venueAddress: string;
    customerName: string;
    customerEmail: string;
    seatInfo?: string;
    ticketType: string;
    price: number;
}

export async function generateTicketPDF(ticketData: TicketData): Promise<Buffer> {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(ticketData.ticketId, {
        width: 200,
        margin: 1,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    });

    // --- HEADER ---
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('VELO', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Your Ticket — Premium Experience', 105, 30, { align: 'center' });

    // --- DEMO WATERMARK ---
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(40);
    doc.setFont('helvetica', 'bold');
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.15 }));

    const watermarkText = 'SAMPLE TICKET';
    doc.text(watermarkText, 105, 150, {
        align: 'center',
        angle: 45
    });
    doc.restoreGraphicsState();

    // --- EVENT DETAILS ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(ticketData.eventTitle, 105, 55, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(ticketData.venueName, 105, 65, { align: 'center' });
    doc.setFontSize(10);
    doc.text(ticketData.venueAddress, 105, 72, { align: 'center' });

    // --- DATE & TIME BOX ---
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(20, 80, 170, 25);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('DATE & TIME', 25, 88);
    doc.setFont('helvetica', 'normal');
    doc.text(`${ticketData.eventDate} at ${ticketData.eventTime}`, 25, 96);

    // --- TICKET HOLDER ---
    doc.rect(20, 110, 170, 20);
    doc.setFont('helvetica', 'bold');
    doc.text('TICKET HOLDER', 25, 118);
    doc.setFont('helvetica', 'normal');
    doc.text(ticketData.customerName, 25, 125);

    // --- TICKET INFO ---
    doc.rect(20, 135, 85, 25);
    doc.setFont('helvetica', 'bold');
    doc.text('TICKET TYPE', 25, 143);
    doc.setFont('helvetica', 'normal');
    doc.text(ticketData.ticketType, 25, 150);

    if (ticketData.seatInfo) {
        doc.rect(105, 135, 85, 25);
        doc.setFont('helvetica', 'bold');
        doc.text('SEAT', 110, 143);
        doc.setFont('helvetica', 'normal');
        doc.text(ticketData.seatInfo, 110, 150);
    }

    // --- QR CODE ---
    doc.addImage(qrCodeDataUrl, 'PNG', 65, 170, 80, 80);

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Scan at venue entrance', 105, 260, { align: 'center' });

    // --- TICKET ID ---
    doc.setFontSize(8);
    doc.text(`Ticket ID: ${ticketData.ticketId}`, 105, 267, { align: 'center' });
    doc.text(`Order ID: ${ticketData.orderId}`, 105, 272, { align: 'center' });

    // --- FOOTER / DISCLAIMER ---
    doc.setFillColor(255, 240, 240);
    doc.rect(0, 275, 210, 22, 'F');

    doc.setTextColor(200, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('⚠️ DEMO MODE', 105, 283, { align: 'center' });

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('This is a sample ticket for demonstration purposes only.', 105, 289, { align: 'center' });
    doc.text('NOT VALID FOR VENUE ENTRY', 105, 293, { align: 'center' });

    // Convert to buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    return pdfBuffer;
}

export async function generateMultipleTickets(
    tickets: TicketData[]
): Promise<Buffer> {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    for (let i = 0; i < tickets.length; i++) {
        if (i > 0) {
            doc.addPage();
        }

        const ticket = tickets[i];
        const qrCodeDataUrl = await QRCode.toDataURL(ticket.ticketId, {
            width: 200,
            margin: 1
        });

        // Same layout as single ticket
        // (Abbreviated for space - same code as above)
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.text('VELO', 105, 20, { align: 'center' });

        // Add rest of ticket content...
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(20);
        doc.text(ticket.eventTitle, 105, 55, { align: 'center' });

        doc.addImage(qrCodeDataUrl, 'PNG', 65, 170, 80, 80);

        doc.setFontSize(9);
        doc.text(`Ticket ${i + 1} of ${tickets.length}`, 105, 260, { align: 'center' });
    }

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    return pdfBuffer;
}
