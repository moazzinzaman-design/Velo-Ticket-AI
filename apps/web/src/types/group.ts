export interface GroupMember {
    id: string; // unique link suffix
    name: string;
    email?: string;
    shareAmount: number;
    status: 'pending' | 'paid';
    seatId?: string;
    joinedAt?: string;
    paidAt?: string;
}

export interface GroupBooking {
    id: string; // unique invite code (e.g., "VELO-XYZ")
    captainName: string;
    captainEmail: string;
    eventName: string;
    eventDate: string;
    eventTime: string;
    venueName: string;
    totalAmount: number;
    expiresAt: string; // ISO timestamp
    members: GroupMember[];
    seats: string[]; // List of seat IDs reserved
}

export interface CreateGroupParams {
    captainName: string;
    captainEmail: string;
    eventName: string;
    eventDate: string;
    eventTime: string;
    venueName: string;
    totalAmount: number;
    seats: string[];
}
