export interface NearbyPlace {
    id: string;
    name: string;
    type: 'Restaurant' | 'Bar' | 'Transport' | 'Hotel';
    distance: string; // e.g., "0.2 miles"
    rating: number;
    priceLevel: '£' | '££' | '£££' | '££££';
    image?: string;
    description: string;
}

export const nearbyData: Record<string, NearbyPlace[]> = {
    // The Sphere, London
    'The Sphere, London': [
        {
            id: 'sphere-1',
            name: 'Haugen',
            type: 'Restaurant',
            distance: '0.1 miles',
            rating: 4.5,
            priceLevel: '£££',
            description: 'Alpine-inspired dining with rooftop views of the Olympic Park.'
        },
        {
            id: 'sphere-2',
            name: 'Stratford Station',
            type: 'Transport',
            distance: '0.3 miles',
            rating: 4.0,
            priceLevel: '£',
            description: 'Major transport hub (Central, Jubilee, Elizabeth lines).'
        },
        {
            id: 'sphere-3',
            name: 'The Westbridge Hotel',
            type: 'Hotel',
            distance: '0.4 miles',
            rating: 4.3,
            priceLevel: '£££',
            description: 'Stylish boutique hotel in a Grade II listed building.'
        }
    ],
    // Wembley Stadium
    'Wembley Stadium': [
        {
            id: 'wembley-1',
            name: 'Boxpark Wembley',
            type: 'Bar',
            distance: '0.2 miles',
            rating: 4.6,
            priceLevel: '££',
            description: 'Vibrant street food hall and bar with live events.'
        },
        {
            id: 'wembley-2',
            name: 'The White Horse',
            type: 'Bar',
            distance: '0.1 miles',
            rating: 4.2,
            priceLevel: '££',
            description: 'Contemporary British pub perfecting the pre-match pint.'
        }
    ],
    // Emirates Stadium
    'Emirates Stadium': [
        {
            id: 'emirates-1',
            name: 'The Tollington Arms',
            type: 'Bar',
            distance: '0.3 miles',
            rating: 4.4,
            priceLevel: '££',
            description: 'Classic Arsenal pub with Thai food and big screens.'
        },
        {
            id: 'emirates-2',
            name: 'Arsenal Station',
            type: 'Transport',
            distance: '0.2 miles',
            rating: 3.8,
            priceLevel: '£',
            description: 'Piccadilly line tube station.'
        }
    ],
    // Silverstone Circuit
    'Silverstone Circuit': [
        {
            id: 'silverstone-1',
            name: 'The White Horse',
            type: 'Restaurant',
            distance: '1.5 miles',
            rating: 4.5,
            priceLevel: '££',
            description: 'Traditional village pub with a hearty menu.'
        },
        {
            id: 'silverstone-2',
            name: 'Hilton Garden Inn',
            type: 'Hotel',
            distance: '0.0 miles',
            rating: 4.7,
            priceLevel: '£££',
            description: 'Trackside hotel with stunning views of the circuit.'
        }
    ],
    // The O2 Arena
    'The O2 Arena': [
        {
            id: 'o2-1',
            name: 'Gaucho at The O2',
            type: 'Restaurant',
            distance: '0.0 miles',
            rating: 4.4,
            priceLevel: '££££',
            description: 'Premium Argentine steakhouse inside the arena.'
        },
        {
            id: 'o2-2',
            name: 'North Greenwich Station',
            type: 'Transport',
            distance: '0.1 miles',
            rating: 4.2,
            priceLevel: '£',
            description: 'Jubilee line station right next to The O2.'
        }
    ]
};
