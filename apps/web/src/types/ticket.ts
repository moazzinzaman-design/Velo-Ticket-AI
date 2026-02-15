export interface Ticket {
    id: string;
    eventId: string;
    eventName: string;
    venueName: string;
    eventDate: string;
    eventTime: string;
    seat: string; // e.g., "Sec A, Row 5, Seat 12"
    section: string;
    row: string;
    seatNumber: string;
    price: number;
    qrPayload: string; // The data encoded in the QR
    status: 'active' | 'used' | 'transferred' | 'listed';
    ownerName: string;
    purchaseDate: string;
    gate?: string;
    isResalable?: boolean;
    resalePrice?: number;
    maxResalePrice?: number;
    isVerified?: boolean;
    authenticityHash?: string;
    originalIssuer?: string;
    isPriceProtected?: boolean;
    purchasePrice?: number;
    tier?: 'standard' | 'early-access' | 'vip' | 'platinum'; // For dynamic art
}

export interface TicketGroup {
    eventId: string;
    eventName: string;
    eventDate: string;
    eventTime: string;
    venueName: string;
    tickets: Ticket[];
}
