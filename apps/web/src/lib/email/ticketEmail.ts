import { Resend } from 'resend';
import { TicketData } from '../tickets/pdfGenerator';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface TicketEmailData {
    to: string;
    customerName: string;
    orderId: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    venueName: string;
    venueAddress: string;
    ticketCount: number;
    totalPrice: number;
    tickets: TicketData[];
}

export async function sendTicketEmail(
    emailData: TicketEmailData,
    ticketPDF: Buffer
): Promise<{ success: boolean; error?: string }> {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Velo Tickets <tickets@velo-demo.com>',
            to: emailData.to,
            subject: `Your Tickets for ${emailData.eventTitle} (Demo)`,
            html: generateEmailHTML(emailData),
            attachments: [
                {
                    filename: `velo-tickets-${emailData.orderId}.pdf`,
                    content: ticketPDF,
                }
            ]
        });

        if (error) {
            console.error('Email send error:', error);
            return { success: false, error: error.message };
        }

        console.log('Ticket email sent successfully:', data);
        return { success: true };
    } catch (error) {
        console.error('Failed to send ticket email:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

function generateEmailHTML(data: TicketEmailData): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Velo Tickets</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
    <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <h1 style="margin: 0; font-size: 36px; font-weight: 700; letter-spacing: 2px; color: #ffffff;">VELO</h1>
            <p style="margin: 10px 0 0; color: #888888; font-size: 14px;">Premium Event Ticketing</p>
        </div>

        <!-- Demo Warning -->
        <div style="background: rgba(255, 59, 48, 0.1); border: 1px solid #ff3b30; border-left: 4px solid #ff3b30; padding: 16px 20px; margin: 20px;">
            <p style="margin: 0; color: #ff3b30; font-weight: 600; font-size: 14px;">⚠️ DEMO MODE</p>
            <p style="margin: 8px 0 0; color: #ff9f95; font-size: 13px; line-height: 1.5;">
                This is a sample ticket for demonstration purposes only. These tickets are NOT valid for venue entry.
            </p>
        </div>

        <!-- Order Confirmation -->
        <div style="padding: 30px 20px;">
            <h2 style="margin: 0 0 10px; font-size: 24px; color: #ffffff;">Order Confirmed!</h2>
            <p style="margin: 0; color: #888888; font-size: 15px;">
                Hi ${data.customerName}, your tickets are ready! 🎉
            </p>
        </div>

        <!-- Event Details Card -->
        <div style="margin: 0 20px 30px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 24px; backdrop-filter: blur(10px);">
            <h3 style="margin: 0 0 16px; font-size: 20px; color: #ffffff; font-weight: 600;">${data.eventTitle}</h3>
            
            <div style="margin-bottom: 12px;">
                <p style="margin: 0; color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Date & Time</p>
                <p style="margin: 4px 0 0; color: #ffffff; font-size: 16px; font-weight: 500;">${data.eventDate} at ${data.eventTime}</p>
            </div>

            <div style="margin-bottom: 12px;">
                <p style="margin: 0; color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Venue</p>
                <p style="margin: 4px 0 0; color: #ffffff; font-size: 16px; font-weight: 500;">${data.venueName}</p>
                <p style="margin: 4px 0 0; color: #888888; font-size: 14px;">${data.venueAddress}</p>
            </div>

            <div style="display: flex; justify-content: space-between; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <div>
                    <p style="margin: 0; color: #888888; font-size: 13px;">Tickets</p>
                    <p style="margin: 4px 0 0; color: #ffffff; font-size: 16px; font-weight: 600;">${data.ticketCount}x</p>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; color: #888888; font-size: 13px;">Total</p>
                    <p style="margin: 4px 0 0; color: #ffffff; font-size: 16px; font-weight: 600;">£${data.totalPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>

        <!-- Tickets Attached -->
        <div style="margin: 0 20px 30px; text-align: center; padding: 24px; background: rgba(0, 122, 255, 0.1); border: 1px solid rgba(0, 122, 255, 0.3); border-radius: 12px;">
            <p style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #ffffff;">📎 Your Tickets Are Attached</p>
            <p style="margin: 0; font-size: 14px; color: #888888; line-height: 1.5;">
                Download the PDF attachment to access your ${data.ticketCount} ticket${data.ticketCount > 1 ? 's' : ''}.<br>
                Each ticket includes a unique QR code.
            </p>
        </div>

        <!-- Order Reference -->
        <div style="margin: 0 20px 30px; padding: 16px; background: rgba(255, 255, 255, 0.03); border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order Reference</p>
            <p style="margin: 8px 0 0; color: #ffffff; font-size: 16px; font-family: 'Courier New', monospace; font-weight: 600;">${data.orderId}</p>
        </div>

        <!-- Footer -->
        <div style="padding: 30px 20px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <p style="margin: 0 0 8px; color: #888888; font-size: 13px;">Questions? Contact us at support@velo-demo.com</p>
            <p style="margin: 0; color: #555555; font-size: 12px;">© 2026 Velo. All rights reserved.</p>
        </div>

    </div>
</body>
</html>
    `.trim();
}
