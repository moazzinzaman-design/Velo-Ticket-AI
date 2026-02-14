import type { Venue, Section, Seat } from '../types/venue';

// Helper to generate seats in a grid pattern
function generateSeatsInGrid(
    startX: number,
    startY: number,
    rows: number,
    seatsPerRow: number,
    rowSpacing: number,
    seatSpacing: number,
    startRow: string,
    status: 'available' | 'taken' = 'available'
): Seat[] {
    const seats: Seat[] = [];
    const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let r = 0; r < rows; r++) {
        const rowLabel = startRow === 'A'
            ? rowLetters[r]
            : `${startRow}${r + 1}`;

        for (let s = 0; s < seatsPerRow; s++) {
            seats.push({
                id: `${rowLabel}-${s + 1}`,
                row: rowLabel,
                number: s + 1,
                x: startX + (s * seatSpacing),
                y: startY + (r * rowSpacing),
                status: Math.random() > 0.7 ? 'taken' : status,
            });
        }
    }

    return seats;
}

// The Sphere, London - Arena Layout
const theSphereLayout: Venue = {
    id: 1,
    name: 'The Sphere, London',
    layout: {
        width: 800,
        height: 600,
        stage: [
            { x: 350, y: 50 },
            { x: 450, y: 50 },
            { x: 470, y: 80 },
            { x: 330, y: 80 },
        ],
        sections: [
            // VIP Front Section (Red)
            {
                id: 'vip-front',
                name: 'VIP Front',
                color: '#dc2626',
                priceMultiplier: 2.0,
                polygon: [
                    { x: 300, y: 120 },
                    { x: 500, y: 120 },
                    { x: 480, y: 200 },
                    { x: 320, y: 200 },
                ],
                seats: generateSeatsInGrid(330, 135, 4, 12, 15, 12, 'A'),
            },
            // Floor Section (Orange)
            {
                id: 'floor',
                name: 'Floor',
                color: '#ea580c',
                priceMultiplier: 1.5,
                polygon: [
                    { x: 280, y: 210 },
                    { x: 520, y: 210 },
                    { x: 530, y: 320 },
                    { x: 270, y: 320 },
                ],
                seats: generateSeatsInGrid(295, 225, 6, 16, 15, 12, 'E'),
            },
            // Lower Bowl Left (Purple)
            {
                id: 'lower-left',
                name: 'Lower Bowl',
                color: '#7c3aed',
                priceMultiplier: 1.2,
                polygon: [
                    { x: 100, y: 150 },
                    { x: 250, y: 150 },
                    { x: 260, y: 400 },
                    { x: 90, y: 400 },
                ],
                seats: generateSeatsInGrid(115, 165, 12, 10, 18, 12, 'L'),
            },
            // Lower Bowl Right (Purple)
            {
                id: 'lower-right',
                name: 'Lower Bowl',
                color: '#7c3aed',
                priceMultiplier: 1.2,
                polygon: [
                    { x: 550, y: 150 },
                    { x: 700, y: 150 },
                    { x: 710, y: 400 },
                    { x: 540, y: 400 },
                ],
                seats: generateSeatsInGrid(560, 165, 12, 10, 18, 12, 'R'),
            },
            // Upper Bowl (Blue)
            {
                id: 'upper-bowl',
                name: 'Upper Bowl',
                color: '#2563eb',
                priceMultiplier: 1.0,
                polygon: [
                    { x: 150, y: 420 },
                    { x: 650, y: 420 },
                    { x: 680, y: 550 },
                    { x: 120, y: 550 },
                ],
                seats: generateSeatsInGrid(170, 435, 6, 28, 18, 15, 'U'),
            },
        ],
    },
};

// Wembley Stadium - Large Stadium Layout
const wembleyLayout: Venue = {
    id: 2,
    name: 'Wembley Stadium',
    layout: {
        width: 900,
        height: 700,
        stage: [
            { x: 400, y: 50 },
            { x: 500, y: 50 },
            { x: 520, y: 100 },
            { x: 380, y: 100 },
        ],
        sections: [
            // Pitch (Green)
            {
                id: 'pitch',
                name: 'Pitch Standing',
                color: '#16a34a',
                priceMultiplier: 1.8,
                polygon: [
                    { x: 300, y: 130 },
                    { x: 600, y: 130 },
                    { x: 620, y: 300 },
                    { x: 280, y: 300 },
                ],
                seats: generateSeatsInGrid(320, 150, 8, 20, 18, 12, 'P'),
            },
            // Club Level Left (Gold)
            {
                id: 'club-left',
                name: 'Club Level',
                color: '#ca8a04',
                priceMultiplier: 2.5,
                polygon: [
                    { x: 80, y: 200 },
                    { x: 240, y: 200 },
                    { x: 250, y: 400 },
                    { x: 70, y: 400 },
                ],
                seats: generateSeatsInGrid(95, 220, 8, 10, 20, 13, 'CL'),
            },
            // Club Level Right (Gold)
            {
                id: 'club-right',
                name: 'Club Level',
                color: '#ca8a04',
                priceMultiplier: 2.5,
                polygon: [
                    { x: 660, y: 200 },
                    { x: 820, y: 200 },
                    { x: 830, y: 400 },
                    { x: 650, y: 400 },
                ],
                seats: generateSeatsInGrid(675, 220, 8, 10, 20, 13, 'CR'),
            },
            // Lower Tier (Cyan)
            {
                id: 'lower-tier',
                name: 'Lower Tier',
                color: '#0891b2',
                priceMultiplier: 1.3,
                polygon: [
                    { x: 200, y: 420 },
                    { x: 700, y: 420 },
                    { x: 720, y: 550 },
                    { x: 180, y: 550 },
                ],
                seats: generateSeatsInGrid(220, 435, 6, 30, 18, 14, 'LT'),
            },
            // Upper Tier (Blue)
            {
                id: 'upper-tier',
                name: 'Upper Tier',
                color: '#1d4ed8',
                priceMultiplier: 1.0,
                polygon: [
                    { x: 150, y: 570 },
                    { x: 750, y: 570 },
                    { x: 770, y: 660 },
                    { x: 130, y: 660 },
                ],
                seats: generateSeatsInGrid(170, 585, 4, 36, 18, 15, 'UT'),
            },
        ],
    },
};

export const venues: Venue[] = [theSphereLayout, wembleyLayout];

export function getVenueById(id: number): Venue | undefined {
    return venues.find(v => v.id === id);
}

export function getVenueByName(name: string): Venue | undefined {
    return venues.find(v => v.name === name);
}
