export interface Ticket {
    id: string;
    event_id: string;
    event_title: string;
    venue_name: string;
    event_date: string;
    event_time: string;
    seat_info: string; // e.g., "Sec A, Row 5, Seat 12"
    section: string;
    row: string;
    seat_number: string;
    price: number;
    qr_code: string; // The data encoded in the QR
    status: 'active' | 'used' | 'transferred' | 'listed';
    owner_name: string;
    purchase_date: string;
    gate?: string;
    is_resalable?: boolean;
    resale_price?: number;
    max_resale_price?: number;
    is_verified?: boolean;
    authenticity_hash?: string;
    original_issuer?: string;
    is_price_protected?: boolean;
    purchase_price?: number;
    tier?: 'standard' | 'early-access' | 'vip' | 'platinum'; // For dynamic art
    event_image?: string;
}

export interface TicketGroup {
    event_id: string;
    event_title: string;
    event_date: string;
    event_time: string;
    venue_name: string;
    tickets: Ticket[];
}
