import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
    console.warn('RESEND_API_KEY is not set. Emails will not be sent.');
}

export const resend = new Resend(resendApiKey || 're_mock_key');
