import crypto from 'crypto';

const SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'default-secret-key'; // In prod, use a separate signing key

export function generateSecureQRData(ticketId: string, eventId: string | number, userId: string): string {
    const timestamp = Date.now();
    const payload = `${ticketId}:${eventId}:${userId}:${timestamp}`;

    // Create HMAC signature
    const signature = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(payload)
        .digest('hex');

    // Return payload + signature
    return `${payload}|${signature}`;
}

export function verifySecureQRData(qrData: string): boolean {
    const [payload, signature] = qrData.split('|');
    if (!payload || !signature) return false;

    const expectedSignature = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(payload)
        .digest('hex');

    if (signature !== expectedSignature) return false;

    // Check expiration (e.g., QR valid for 24h? usually tickets are valid until event end)
    // For now, just verifying integrity
    return true;
}
