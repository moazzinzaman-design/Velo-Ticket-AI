export interface Event {
    id: number;
    title: string;
    venue: string;
    date: string;
    time: string;
    price: number;
    category: string;
    image: string;
    tag: string;
    soldPercentage: number;
    description?: string;
    capacity?: number;
}

export interface Partner {
    id: string;
    name: string;
    apiKey: string;
    active: boolean;
}

export interface Booking {
    id: string;
    eventId: number;
    partnerId: string;
    quantity: number;
    totalPrice: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    timestamp: Date;
}

export interface APIError {
    error: string;
    message: string;
    statusCode: number;
}
