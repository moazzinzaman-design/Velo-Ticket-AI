export interface RealEvent {
    id: number;
    title: string;
    venue: string;
    location: {
        city: string;
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    date: string;
    time: string;
    price: number;
    category: string;
    image: string;
    tag: string;
    soldPercentage: number;
    description?: string;
}

export const realEvents: RealEvent[] = [
    {
        id: 1,
        title: "Coldplay: Music of the Spheres",
        venue: "Wembley Stadium",
        location: {
            city: "London",
            address: "Wembley, London HA9 0WS",
            coordinates: { lat: 51.5560, lng: -0.2795 }
        },
        date: "Aug 22",
        time: "19:00",
        price: 95,
        category: "Concert",
        image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800",
        tag: "SELLING FAST",
        soldPercentage: 78,
        description: "Experience Coldplay's spectacular world tour"
    },
    {
        id: 2,
        title: "Ed Sheeran: Mathematics Tour",
        venue: "The O2",
        location: {
            city: "London",
            address: "Peninsula Square, London SE10 0DX",
            coordinates: { lat: 51.5033, lng: 0.0031 }
        },
        date: "Sep 15",
        time: "20:00",
        price: 85,
        category: "Concert",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        tag: "POPULAR",
        soldPercentage: 65
    },
    {
        id: 3,
        title: "Hamilton",
        venue: "Victoria Palace Theatre",
        location: {
            city: "London",
            address: "Victoria St, London SW1E 5EA",
            coordinates: { lat: 51.4965, lng: -0.1426 }
        },
        date: "Jul 30",
        time: "19:30",
        price: 120,
        category: "Theatre",
        image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800",
        tag: "AWARD WINNING",
        soldPercentage: 92
    },
    {
        id: 4,
        title: "Arsenal vs Manchester United",
        venue: "Emirates Stadium",
        location: {
            city: "London",
            address: "Hornsey Rd, London N7 7AJ",
            coordinates: { lat: 51.5549, lng: -0.1084 }
        },
        date: "Aug 5",
        time: "15:00",
        price: 75,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800",
        tag: "TONIGHT",
        soldPercentage: 88
    },
    {
        id: 5,
        title: "Dua Lipa: Future Nostalgia",
        venue: "Manchester Arena",
        location: {
            city: "Manchester",
            address: "Victoria Station, Manchester M3 1AR",
            coordinates: { lat: 53.4876, lng: -2.2446 }
        },
        date: "Sep 8",
        time: "19:30",
        price: 78,
        category: "Concert",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
        tag: "VIP AVAILABLE",
        soldPercentage: 71
    },
    {
        id: 6,
        title: "The Lion King",
        venue: "Lyceum Theatre",
        location: {
            city: "London",
            address: "21 Wellington St, London WC2E 7RQ",
            coordinates: { lat: 51.5115, lng: -0.1205 }
        },
        date: "Aug 12",
        time: "19:00",
        price: 95,
        category: "Theatre",
        image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800",
        tag: "PREMIUM",
        soldPercentage: 54
    },
    {
        id: 7,
        title: "Harry Styles: Love On Tour",
        venue: "Etihad Stadium",
        location: {
            city: "Manchester",
            address: "Ashton New Rd, Manchester M11 3FF",
            coordinates: { lat: 53.4831, lng: -2.2004 }
        },
        date: "Jul 28",
        time: "18:30",
        price: 110,
        category: "Concert",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
        tag: "LIMITED",
        soldPercentage: 95
    },
    {
        id: 8,
        title: "Wimbledon Finals",
        venue: "All England Club",
        location: {
            city: "London",
            address: "Church Rd, Wimbledon, London SW19 5AE",
            coordinates: { lat: 51.4344, lng: -0.2141 }
        },
        date: "Jul 16",
        time: "14:00",
        price: 250,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800",
        tag: "PREMIUM",
        soldPercentage: 99
    },
    {
        id: 9,
        title: "The Phantom of the Opera",
        venue: "His Majesty's Theatre",
        location: {
            city: "London",
            address: "Haymarket, London SW1Y 4QL",
            coordinates: { lat: 51.5091, lng: -0.1318 }
        },
        date: "Aug 20",
        time: "19:30",
        price: 85,
        category: "Theatre",
        image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800",
        tag: "NEW",
        soldPercentage: 42
    },
    {
        id: 10,
        title: "Beyoncé: Renaissance World Tour",
        venue: "Tottenham Hotspur Stadium",
        location: {
            city: "London",
            address: "782 High Rd, London N17 0BX",
            coordinates: { lat: 51.6042, lng: -0.0662 }
        },
        date: "Sep 1",
        time: "19:00",
        price: 135,
        category: "Concert",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
        tag: "SELLING FAST",
        soldPercentage: 82
    }
];

// Helper function to calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

// Sort events by distance from user location
export function sortEventsByDistance(
    events: RealEvent[],
    userLat: number,
    userLng: number
): (RealEvent & { distance: number })[] {
    return events
        .map(event => ({
            ...event,
            distance: calculateDistance(
                userLat,
                userLng,
                event.location.coordinates.lat,
                event.location.coordinates.lng
            )
        }))
        .sort((a, b) => a.distance - b.distance);
}
