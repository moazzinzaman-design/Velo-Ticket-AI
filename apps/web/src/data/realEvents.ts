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
    tagColor?: string; // Added for UI
    accentColor?: string; // Added for UI
    soldPercentage: number;
    description?: string;
    hasMerch?: boolean;
    merchItems?: string[];
    ageRestriction?: 'All Ages' | '18+' | '16+' | '14+';
}

export const realEvents: RealEvent[] = [
    {
        id: 1,
        title: 'Daft Punk 2026',
        venue: 'The Sphere, London',
        location: {
            city: 'London',
            address: 'Stratford, London E20 1',
            coordinates: { lat: 51.5400, lng: -0.0100 }
        },
        date: 'Mar 15, 2026',
        time: '20:00',
        price: 128,
        category: 'Concert',
        image: 'https://images.unsplash.com/photo-1470229722913-7ea049c42081?q=80&w=2940&auto=format&fit=crop',
        tag: 'TONIGHT',
        tagColor: 'bg-velo-rose',
        accentColor: 'from-purple-600 to-blue-600',
        soldPercentage: 87,
        description: 'The legendary duo returns for a one-night-only holographic spectacle at The Sphere.',
        hasMerch: true,
        merchItems: ['Helmet Replica', 'Limited Edition Vinyl'],
        ageRestriction: 'All Ages'
    },
    {
        id: 2,
        title: 'Coldplay: World Tour',
        venue: 'Wembley Stadium',
        location: {
            city: "London",
            address: "Wembley, London HA9 0WS",
            coordinates: { lat: 51.5560, lng: -0.2795 }
        },
        date: 'Apr 22, 2026',
        time: '19:30',
        price: 95,
        category: 'Concert',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2940&auto=format&fit=crop',
        tag: 'SELLING FAST',
        tagColor: 'bg-amber-500',
        accentColor: 'from-cyan-500 to-blue-500',
        soldPercentage: 72,
        description: 'Experience the magic of Coldplay live under the stars.',
        hasMerch: true,
        merchItems: ['Eco-Tee', 'Lightband'],
        ageRestriction: 'All Ages'
    },
    {
        id: 3,
        title: 'Formula 1: British GP',
        venue: 'Silverstone Circuit',
        location: {
            city: "Towcester",
            address: "Towcester NN12 8TN",
            coordinates: { lat: 52.0786, lng: -1.0169 }
        },
        date: 'Jul 6, 2026',
        time: '14:00',
        price: 250,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?q=80&w=2940&auto=format&fit=crop',
        tag: 'VIP AVAILABLE',
        tagColor: 'bg-velo-violet',
        accentColor: 'from-rose-500 to-orange-500',
        soldPercentage: 45,
        description: 'Feel the roar of the engines at the home of British motorsport.',
        hasMerch: true,
        merchItems: ['Team Cap', 'Model Car'],
        ageRestriction: '16+'
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
        tagColor: 'bg-velo-rose',
        soldPercentage: 88,
        ageRestriction: '18+'
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
        tag: "MERCH AVAILABLE",
        tagColor: 'bg-velo-cyan',
        soldPercentage: 71,
        hasMerch: true,
        merchItems: ['Tour T-Shirt', 'Tote Bag', 'Phone Case'],
        ageRestriction: 'All Ages'
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
        tagColor: 'bg-indigo-500',
        soldPercentage: 54,
        ageRestriction: 'All Ages'
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
        tagColor: 'bg-orange-500',
        soldPercentage: 95,
        hasMerch: true,
        merchItems: ['Love On Tour Hoodie', 'Pleasing Merch']
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
        tagColor: 'bg-indigo-500',
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
        tagColor: 'bg-velo-emerald',
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
        tagColor: 'bg-amber-500',
        soldPercentage: 82,
        hasMerch: true,
        merchItems: ['Renaissance Tour Cap', 'Collector Box Set']
    },
    {
        id: 11,
        title: "Kevin Hart: Acting My Age",
        venue: "The O2 Arena",
        location: {
            city: "London",
            address: "Peninsula Square, London SE10 0DX",
            coordinates: { lat: 51.5030, lng: 0.0032 }
        },
        date: "Oct 12",
        time: "20:00",
        price: 65,
        category: "Comedy",
        image: "https://images.unsplash.com/photo-1585672922759-4244b79ce8ad?w=800",
        tag: "LAUGH OUT LOUD",
        tagColor: 'bg-yellow-500',
        soldPercentage: 60,
        ageRestriction: '16+'
    },
    {
        id: 12,
        title: "Van Gogh: The Immersive Experience",
        venue: "180 Studios",
        location: {
            city: "London",
            address: "180 Strand, London WC2R 1EA",
            coordinates: { lat: 51.5113, lng: -0.1154 }
        },
        date: "Daily",
        time: "10:00 - 20:00",
        price: 32,
        category: "Art",
        image: "https://images.unsplash.com/photo-1572947650440-e8a97ef053b5?w=800",
        tag: "MUST SEE",
        tagColor: 'bg-velo-violet',
        soldPercentage: 45,
        ageRestriction: 'All Ages'
    },
    {
        id: 13,
        title: "Ronnie Scott's All Stars",
        venue: "Ronnie Scott's Jazz Club",
        location: {
            city: "London",
            address: "47 Frith St, London W1D 4HT",
            coordinates: { lat: 51.5134, lng: -0.1308 }
        },
        date: "Tonight",
        time: "21:30",
        price: 55,
        category: "Music",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800",
        tag: "INTIMATE",
        tagColor: 'bg-velo-rose',
        soldPercentage: 92,
        ageRestriction: '18+'
    },
    {
        id: 14,
        title: "London Food Festival",
        venue: "Tobacco Dock",
        location: {
            city: "London",
            address: "Tobacco Quay, Wapping Ln, London E1W 2SF",
            coordinates: { lat: 51.5076, lng: -0.0594 }
        },
        date: "Aug 28",
        time: "12:00",
        price: 25,
        category: "Festival",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        tag: "TASTY",
        tagColor: 'bg-orange-500',
        soldPercentage: 30,
        ageRestriction: 'All Ages'
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
