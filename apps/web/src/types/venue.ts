export interface Point {
    x: number;
    y: number;
}

export interface Seat {
    id: string;
    row: string;
    number: number;
    x: number;
    y: number;
    status: 'available' | 'selected' | 'taken' | 'reserved';
}

export interface Section {
    id: string;
    name: string;
    color: string;
    priceMultiplier: number; // 1.0 = base price
    seats: Seat[];
    polygon: Point[];
}

export interface VenueLayout {
    width: number;
    height: number;
    sections: Section[];
    stage?: Point[];
}

export interface Venue {
    id: number;
    name: string;
    layout: VenueLayout;
}
