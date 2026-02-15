import { resend } from './client';
import { BookingConfirmation } from '../../emails/BookingConfirmation';

export const EmailService = {
    async sendBookingConfirmation(to: string, eventName: string, ticketId: string) {
        if (!process.env.RESEND_API_KEY) {
            console.log(`[Mock Email] To: ${to}, Event: ${eventName}, Ticket: ${ticketId}`);
            return;
        }

        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev', // Use default testing domain
                to,
                subject: `Your mobile ticket for ${eventName}`,
                react: BookingConfirmation({
                    userName: 'Velo User',
                    eventName,
                    ticketId,
                    date: 'Date TBD',
                    ticketLink: `https://velo.app/tickets/${ticketId}`
                }),
            });
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    },
};
