'use client';

/**
 * Service for handling transactional emails. 
 * Currently mocked for demonstration, but ready for integration with Resend, SendGrid, or Postmark.
 */
export class EmailService {
    /**
     * Sends a booking confirmation email to the user.
     */
    static async sendBookingConfirmation(email: string, eventTitle: string, bookingRef: string) {
        console.log(`[EmailService] Sending confirmation to: ${email}`);
        console.log(`[EmailService] Event: ${eventTitle}`);
        console.log(`[EmailService] Ref: ${bookingRef}`);

        // Simulate network latency
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`[EmailService] Email sent successfully to ${email}`);
                resolve(true);
            }, 800);
        });
    }

    /**
     * Sends a waitlist notification.
     */
    static async sendWaitlistJoinConfirmation(email: string, eventTitle: string) {
        console.log(`[EmailService] Waitlist confirmation for ${eventTitle} sent to ${email}`);
        return Promise.resolve(true);
    }
}
