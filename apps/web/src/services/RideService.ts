import { EventLocation } from '../types/location';

export interface RideOption {
    provider: 'Uber' | 'Lyft' | 'Velo Black';
    product: string;
    price: number;
    eta: number; // minutes
    currency: string;
    deepLink: string;
}

export const getRideEstimates = (fromLat: number, fromLng: number, venue: EventLocation): RideOption[] => {
    // Simulate API latency
    // In a real app, this would call Uber/Lyft APIs

    // Simple distance-based price calculation (mock)
    const basePrice = 12;
    const distanceMultiplier = 2.5; // per km (mock)

    // Random fluctuation for "surge" simulation
    const surge = Math.random() > 0.8 ? 1.5 : 1.0;

    return [
        {
            provider: 'Uber',
            product: 'UberX',
            price: Math.round((basePrice + 5) * surge),
            eta: Math.floor(Math.random() * 5) + 2,
            currency: 'GBP',
            deepLink: `https://m.uber.com/ul/?action=setPickup&client_id=velo&pickup=my_location&dropoff[latitude]=${venue.coordinates.lat}&dropoff[longitude]=${venue.coordinates.lng}&dropoff[nickname]=${encodeURIComponent(venue.address)}`
        },
        {
            provider: 'Lyft',
            product: 'Standard',
            price: Math.round((basePrice + 4) * surge),
            eta: Math.floor(Math.random() * 8) + 3,
            currency: 'GBP',
            deepLink: `lyft://ridetype?id=lyft&destination[latitude]=${venue.coordinates.lat}&destination[longitude]=${venue.coordinates.lng}`
        },
        {
            provider: 'Velo Black',
            product: 'Executive',
            price: Math.round((basePrice + 25) * surge),
            eta: Math.floor(Math.random() * 3) + 1,
            currency: 'GBP',
            deepLink: 'velo://book-ride'
        }
    ];
};
