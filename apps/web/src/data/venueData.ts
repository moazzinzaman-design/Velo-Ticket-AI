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
    address: 'Olympic Park, London E20 2ST',
    coordinates: { lat: 51.543, lng: -0.005 },
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
    address: 'Wembley, London HA9 0WS',
    coordinates: { lat: 51.556, lng: -0.280 },
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

// The O2 Arena, London
const o2ArenaLayout: Venue = {
    id: 3,
    name: 'The O2 Arena',
    address: 'Peninsula Square, London SE10 0DX',
    coordinates: { lat: 51.503, lng: 0.003 },
    layout: {
        width: 800,
        height: 600,
        stage: [
            { x: 350, y: 40 },
            { x: 450, y: 40 },
            { x: 460, y: 70 },
            { x: 340, y: 70 },
        ],
        sections: [
            {
                id: 'floor-a',
                name: 'Floor Standing',
                color: '#dc2626',
                priceMultiplier: 2.0,
                polygon: [
                    { x: 280, y: 100 },
                    { x: 520, y: 100 },
                    { x: 540, y: 250 },
                    { x: 260, y: 250 },
                ],
                seats: generateSeatsInGrid(300, 115, 7, 16, 18, 12, 'A'),
            },
            {
                id: 'lower-tier',
                name: 'Lower Tier',
                color: '#7c3aed',
                priceMultiplier: 1.5,
                polygon: [
                    { x: 120, y: 170 },
                    { x: 240, y: 130 },
                    { x: 250, y: 400 },
                    { x: 110, y: 400 },
                ],
                seats: generateSeatsInGrid(135, 180, 10, 8, 20, 12, 'L'),
            },
            {
                id: 'lower-tier-r',
                name: 'Lower Tier',
                color: '#7c3aed',
                priceMultiplier: 1.5,
                polygon: [
                    { x: 560, y: 130 },
                    { x: 680, y: 170 },
                    { x: 690, y: 400 },
                    { x: 550, y: 400 },
                ],
                seats: generateSeatsInGrid(565, 180, 10, 8, 20, 12, 'R'),
            },
            {
                id: 'upper-tier',
                name: 'Upper Tier',
                color: '#2563eb',
                priceMultiplier: 1.0,
                polygon: [
                    { x: 140, y: 420 },
                    { x: 660, y: 420 },
                    { x: 690, y: 550 },
                    { x: 110, y: 550 },
                ],
                seats: generateSeatsInGrid(160, 435, 6, 30, 18, 14, 'U'),
            },
        ],
    },
};

// AO Arena, Manchester
const aoArenaLayout: Venue = {
    id: 4,
    name: 'AO Arena',
    address: 'Victoria Station Approach, Manchester M3 1AR',
    coordinates: { lat: 53.488, lng: -2.244 },
    layout: {
        width: 800,
        height: 600,
        stage: [
            { x: 340, y: 40 },
            { x: 460, y: 40 },
            { x: 470, y: 75 },
            { x: 330, y: 75 },
        ],
        sections: [
            {
                id: 'floor',
                name: 'Floor',
                color: '#dc2626',
                priceMultiplier: 2.0,
                polygon: [
                    { x: 280, y: 100 },
                    { x: 520, y: 100 },
                    { x: 540, y: 260 },
                    { x: 260, y: 260 },
                ],
                seats: generateSeatsInGrid(300, 115, 8, 16, 17, 12, 'A'),
            },
            {
                id: 'tier-1',
                name: 'Tier 1',
                color: '#ea580c',
                priceMultiplier: 1.4,
                polygon: [
                    { x: 100, y: 160 },
                    { x: 250, y: 160 },
                    { x: 250, y: 420 },
                    { x: 100, y: 420 },
                ],
                seats: generateSeatsInGrid(115, 175, 12, 9, 18, 12, 'TL'),
            },
            {
                id: 'tier-1-r',
                name: 'Tier 1',
                color: '#ea580c',
                priceMultiplier: 1.4,
                polygon: [
                    { x: 550, y: 160 },
                    { x: 700, y: 160 },
                    { x: 700, y: 420 },
                    { x: 550, y: 420 },
                ],
                seats: generateSeatsInGrid(565, 175, 12, 9, 18, 12, 'TR'),
            },
            {
                id: 'tier-2',
                name: 'Tier 2',
                color: '#2563eb',
                priceMultiplier: 1.0,
                polygon: [
                    { x: 130, y: 440 },
                    { x: 670, y: 440 },
                    { x: 700, y: 560 },
                    { x: 100, y: 560 },
                ],
                seats: generateSeatsInGrid(150, 455, 5, 30, 18, 14, 'U'),
            },
        ],
    },
};

// Tottenham Hotspur Stadium
const tottenhamLayout: Venue = {
    id: 5,
    name: 'Tottenham Hotspur Stadium',
    address: '782 High Road, London N17 0BX',
    coordinates: { lat: 51.604, lng: -0.066 },
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
            {
                id: 'pitch',
                name: 'Pitch Standing',
                color: '#16a34a',
                priceMultiplier: 2.0,
                polygon: [
                    { x: 300, y: 120 },
                    { x: 600, y: 120 },
                    { x: 620, y: 300 },
                    { x: 280, y: 300 },
                ],
                seats: generateSeatsInGrid(320, 140, 8, 20, 18, 12, 'P'),
            },
            {
                id: 'lower-south',
                name: 'Lower South',
                color: '#7c3aed',
                priceMultiplier: 1.5,
                polygon: [
                    { x: 80, y: 200 },
                    { x: 260, y: 200 },
                    { x: 260, y: 450 },
                    { x: 80, y: 450 },
                ],
                seats: generateSeatsInGrid(100, 215, 10, 10, 22, 14, 'LS'),
            },
            {
                id: 'lower-north',
                name: 'Lower North',
                color: '#7c3aed',
                priceMultiplier: 1.5,
                polygon: [
                    { x: 640, y: 200 },
                    { x: 820, y: 200 },
                    { x: 820, y: 450 },
                    { x: 640, y: 450 },
                ],
                seats: generateSeatsInGrid(660, 215, 10, 10, 22, 14, 'LN'),
            },
            {
                id: 'upper-tier',
                name: 'Upper Tier',
                color: '#2563eb',
                priceMultiplier: 1.0,
                polygon: [
                    { x: 150, y: 480 },
                    { x: 750, y: 480 },
                    { x: 780, y: 650 },
                    { x: 120, y: 650 },
                ],
                seats: generateSeatsInGrid(170, 495, 6, 36, 20, 14, 'UT'),
            },
        ],
    },
};

// OVO Hydro, Glasgow
const ovoHydroLayout: Venue = {
    id: 6,
    name: 'OVO Hydro',
    address: 'Exhibition Way, Glasgow G3 8YW',
    coordinates: { lat: 55.860, lng: -4.286 },
    layout: {
        width: 800,
        height: 600,
        stage: [
            { x: 350, y: 40 },
            { x: 450, y: 40 },
            { x: 460, y: 70 },
            { x: 340, y: 70 },
        ],
        sections: [
            {
                id: 'floor',
                name: 'Floor',
                color: '#dc2626',
                priceMultiplier: 1.8,
                polygon: [
                    { x: 290, y: 100 },
                    { x: 510, y: 100 },
                    { x: 530, y: 250 },
                    { x: 270, y: 250 },
                ],
                seats: generateSeatsInGrid(310, 115, 7, 14, 18, 12, 'A'),
            },
            {
                id: 'lower-bowl',
                name: 'Lower Bowl',
                color: '#7c3aed',
                priceMultiplier: 1.3,
                polygon: [
                    { x: 110, y: 160 },
                    { x: 690, y: 160 },
                    { x: 710, y: 400 },
                    { x: 90, y: 400 },
                ],
                seats: generateSeatsInGrid(130, 265, 6, 32, 18, 14, 'LB'),
            },
            {
                id: 'upper-bowl',
                name: 'Upper Bowl',
                color: '#2563eb',
                priceMultiplier: 1.0,
                polygon: [
                    { x: 130, y: 420 },
                    { x: 670, y: 420 },
                    { x: 700, y: 560 },
                    { x: 100, y: 560 },
                ],
                seats: generateSeatsInGrid(150, 435, 6, 30, 18, 14, 'UB'),
            },
        ],
    },
};

// Principality Stadium, Cardiff
const principalityLayout: Venue = {
    id: 7,
    name: 'Principality Stadium',
    address: 'Westgate Street, Cardiff CF10 1NS',
    coordinates: { lat: 51.478, lng: -3.183 },
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
            {
                id: 'pitch',
                name: 'Pitch Standing',
                color: '#16a34a',
                priceMultiplier: 2.0,
                polygon: [
                    { x: 300, y: 130 },
                    { x: 600, y: 130 },
                    { x: 620, y: 300 },
                    { x: 280, y: 300 },
                ],
                seats: generateSeatsInGrid(320, 150, 8, 20, 18, 12, 'P'),
            },
            {
                id: 'lower-tier',
                name: 'Lower Tier',
                color: '#ea580c',
                priceMultiplier: 1.4,
                polygon: [
                    { x: 100, y: 200 },
                    { x: 260, y: 200 },
                    { x: 260, y: 500 },
                    { x: 100, y: 500 },
                ],
                seats: generateSeatsInGrid(115, 215, 12, 10, 22, 13, 'LT'),
            },
            {
                id: 'lower-tier-r',
                name: 'Lower Tier',
                color: '#ea580c',
                priceMultiplier: 1.4,
                polygon: [
                    { x: 640, y: 200 },
                    { x: 800, y: 200 },
                    { x: 800, y: 500 },
                    { x: 640, y: 500 },
                ],
                seats: generateSeatsInGrid(655, 215, 12, 10, 22, 13, 'RT'),
            },
            {
                id: 'upper-tier',
                name: 'Upper Tier',
                color: '#2563eb',
                priceMultiplier: 1.0,
                polygon: [
                    { x: 150, y: 530 },
                    { x: 750, y: 530 },
                    { x: 780, y: 660 },
                    { x: 120, y: 660 },
                ],
                seats: generateSeatsInGrid(170, 545, 5, 36, 18, 14, 'UT'),
            },
        ],
    },
};

// First Direct Arena, Leeds
const firstDirectLayout: Venue = {
    id: 8,
    name: 'First Direct Arena',
    address: 'Arena Way, Leeds LS2 8BY',
    coordinates: { lat: 53.799, lng: -1.549 },
    layout: {
        width: 800,
        height: 600,
        stage: [
            { x: 350, y: 40 },
            { x: 450, y: 40 },
            { x: 460, y: 70 },
            { x: 340, y: 70 },
        ],
        sections: [
            {
                id: 'floor',
                name: 'Floor',
                color: '#dc2626',
                priceMultiplier: 1.8,
                polygon: [
                    { x: 290, y: 100 },
                    { x: 510, y: 100 },
                    { x: 530, y: 240 },
                    { x: 270, y: 240 },
                ],
                seats: generateSeatsInGrid(310, 115, 6, 14, 18, 12, 'A'),
            },
            {
                id: 'bowl',
                name: 'Bowl Seating',
                color: '#7c3aed',
                priceMultiplier: 1.3,
                polygon: [
                    { x: 100, y: 160 },
                    { x: 700, y: 160 },
                    { x: 720, y: 420 },
                    { x: 80, y: 420 },
                ],
                seats: generateSeatsInGrid(120, 255, 8, 32, 18, 14, 'B'),
            },
            {
                id: 'balcony',
                name: 'Balcony',
                color: '#2563eb',
                priceMultiplier: 1.0,
                polygon: [
                    { x: 130, y: 440 },
                    { x: 670, y: 440 },
                    { x: 700, y: 560 },
                    { x: 100, y: 560 },
                ],
                seats: generateSeatsInGrid(150, 455, 5, 30, 18, 14, 'BL'),
            },
        ],
    },
};

// Utilita Arena, Birmingham
const utilitaArenaLayout: Venue = {
    id: 9,
    name: 'Utilita Arena Birmingham',
    address: 'King Edwards Road, Birmingham B1 2AA',
    coordinates: { lat: 52.481, lng: -1.919 },
    layout: {
        width: 800,
        height: 600,
        stage: [
            { x: 350, y: 40 },
            { x: 450, y: 40 },
            { x: 460, y: 70 },
            { x: 340, y: 70 },
        ],
        sections: [
            {
                id: 'floor',
                name: 'Floor',
                color: '#dc2626',
                priceMultiplier: 1.8,
                polygon: [
                    { x: 290, y: 100 },
                    { x: 510, y: 100 },
                    { x: 530, y: 250 },
                    { x: 270, y: 250 },
                ],
                seats: generateSeatsInGrid(310, 115, 7, 14, 18, 12, 'A'),
            },
            {
                id: 'lower-tier',
                name: 'Lower Tier',
                color: '#7c3aed',
                priceMultiplier: 1.3,
                polygon: [
                    { x: 100, y: 160 },
                    { x: 260, y: 160 },
                    { x: 260, y: 400 },
                    { x: 100, y: 400 },
                ],
                seats: generateSeatsInGrid(115, 175, 10, 10, 20, 12, 'LT'),
            },
            {
                id: 'lower-tier-r',
                name: 'Lower Tier',
                color: '#7c3aed',
                priceMultiplier: 1.3,
                polygon: [
                    { x: 540, y: 160 },
                    { x: 700, y: 160 },
                    { x: 700, y: 400 },
                    { x: 540, y: 400 },
                ],
                seats: generateSeatsInGrid(555, 175, 10, 10, 20, 12, 'RT'),
            },
            {
                id: 'upper-tier',
                name: 'Upper Tier',
                color: '#2563eb',
                priceMultiplier: 1.0,
                polygon: [
                    { x: 130, y: 420 },
                    { x: 670, y: 420 },
                    { x: 700, y: 560 },
                    { x: 100, y: 560 },
                ],
                seats: generateSeatsInGrid(150, 435, 6, 30, 18, 14, 'U'),
            },
        ],
    },
};

// Bristol Beacon
const bristolBeaconLayout: Venue = {
    id: 10,
    name: 'Bristol Beacon',
    address: 'Broad Street, Bristol BS1 2EA',
    coordinates: { lat: 51.454, lng: -2.597 },
    layout: {
        width: 700,
        height: 500,
        stage: [
            { x: 300, y: 30 },
            { x: 400, y: 30 },
            { x: 410, y: 60 },
            { x: 290, y: 60 },
        ],
        sections: [
            {
                id: 'stalls',
                name: 'Stalls',
                color: '#dc2626',
                priceMultiplier: 1.6,
                polygon: [
                    { x: 220, y: 80 },
                    { x: 480, y: 80 },
                    { x: 500, y: 250 },
                    { x: 200, y: 250 },
                ],
                seats: generateSeatsInGrid(240, 95, 8, 16, 18, 12, 'S'),
            },
            {
                id: 'circle',
                name: 'Circle',
                color: '#7c3aed',
                priceMultiplier: 1.2,
                polygon: [
                    { x: 150, y: 270 },
                    { x: 550, y: 270 },
                    { x: 570, y: 380 },
                    { x: 130, y: 380 },
                ],
                seats: generateSeatsInGrid(170, 285, 5, 24, 18, 14, 'C'),
            },
            {
                id: 'gallery',
                name: 'Gallery',
                color: '#2563eb',
                priceMultiplier: 1.0,
                polygon: [
                    { x: 170, y: 400 },
                    { x: 530, y: 400 },
                    { x: 550, y: 470 },
                    { x: 150, y: 470 },
                ],
                seats: generateSeatsInGrid(190, 410, 3, 22, 18, 14, 'G'),
            },
        ],
    },
};

// Generic Fallback Venue — used when no specific layout matches
const genericVenueLayout: Venue = {
    id: 999,
    name: 'General Admission',
    address: '',
    coordinates: { lat: 0, lng: 0 },
    layout: {
        width: 800,
        height: 600,
        stage: [
            { x: 350, y: 40 },
            { x: 450, y: 40 },
            { x: 460, y: 70 },
            { x: 340, y: 70 },
        ],
        sections: [
            {
                id: 'premium',
                name: 'Premium',
                color: '#dc2626',
                priceMultiplier: 1.8,
                polygon: [
                    { x: 280, y: 100 },
                    { x: 520, y: 100 },
                    { x: 540, y: 230 },
                    { x: 260, y: 230 },
                ],
                seats: generateSeatsInGrid(300, 115, 6, 16, 18, 12, 'A'),
            },
            {
                id: 'standard-l',
                name: 'Standard',
                color: '#7c3aed',
                priceMultiplier: 1.2,
                polygon: [
                    { x: 100, y: 150 },
                    { x: 250, y: 150 },
                    { x: 250, y: 400 },
                    { x: 100, y: 400 },
                ],
                seats: generateSeatsInGrid(115, 165, 10, 9, 22, 12, 'SL'),
            },
            {
                id: 'standard-r',
                name: 'Standard',
                color: '#7c3aed',
                priceMultiplier: 1.2,
                polygon: [
                    { x: 550, y: 150 },
                    { x: 700, y: 150 },
                    { x: 700, y: 400 },
                    { x: 550, y: 400 },
                ],
                seats: generateSeatsInGrid(565, 165, 10, 9, 22, 12, 'SR'),
            },
            {
                id: 'economy',
                name: 'Economy',
                color: '#2563eb',
                priceMultiplier: 1.0,
                polygon: [
                    { x: 130, y: 420 },
                    { x: 670, y: 420 },
                    { x: 700, y: 560 },
                    { x: 100, y: 560 },
                ],
                seats: generateSeatsInGrid(150, 435, 6, 30, 18, 14, 'E'),
            },
        ],
    },
};

// ==========================================================================
// All venues + matching logic
// ==========================================================================

export const venues: Venue[] = [
    theSphereLayout,
    wembleyLayout,
    o2ArenaLayout,
    aoArenaLayout,
    tottenhamLayout,
    ovoHydroLayout,
    principalityLayout,
    firstDirectLayout,
    utilitaArenaLayout,
    bristolBeaconLayout,
];

// Alias map: keyword → venue id
const venueAliases: { keywords: string[]; venueId: number }[] = [
    { keywords: ['sphere', 'msg sphere'], venueId: 1 },
    { keywords: ['wembley'], venueId: 2 },
    { keywords: ['o2 arena', 'the o2', 'north greenwich arena', 'o2'], venueId: 3 },
    { keywords: ['ao arena', 'manchester arena', 'men arena', 'manchester'], venueId: 4 },
    { keywords: ['tottenham hotspur', 'tottenham stadium', 'spurs stadium'], venueId: 5 },
    { keywords: ['ovo hydro', 'sse hydro', 'hydro glasgow', 'hydro'], venueId: 6 },
    { keywords: ['principality', 'millennium stadium', 'cardiff stadium'], venueId: 7 },
    { keywords: ['first direct', 'leeds arena'], venueId: 8 },
    { keywords: ['utilita arena', 'birmingham arena', 'resorts world arena', 'nec arena', 'birmingham'], venueId: 9 },
    { keywords: ['bristol beacon', 'colston hall', 'bristol'], venueId: 10 },
];

export function getVenueById(id: number): Venue | undefined {
    return venues.find(v => v.id === id);
}

export function getVenueByName(name: string): Venue | undefined {
    return venues.find(v => v.name === name);
}

/**
 * Fuzzy-match an event venue string to the best known layout.
 * Falls back to generic venue if no match is found.
 */
export function findBestVenue(eventVenueName: string): Venue {
    const normalised = eventVenueName.toLowerCase().trim();

    // Direct match first
    const direct = venues.find(v => normalised.includes(v.name.toLowerCase()));
    if (direct) return direct;

    // Alias match — pick the alias with the longest matching keyword for best precision
    let bestMatch: { venueId: number; matchLen: number } | null = null;

    for (const alias of venueAliases) {
        for (const keyword of alias.keywords) {
            if (normalised.includes(keyword) && (!bestMatch || keyword.length > bestMatch.matchLen)) {
                bestMatch = { venueId: alias.venueId, matchLen: keyword.length };
            }
        }
    }

    if (bestMatch) {
        const matched = venues.find(v => v.id === bestMatch!.venueId);
        if (matched) return matched;
    }

    // No match — return generic layout with the event's venue name
    return { ...genericVenueLayout, name: eventVenueName || 'General Admission' };
}
