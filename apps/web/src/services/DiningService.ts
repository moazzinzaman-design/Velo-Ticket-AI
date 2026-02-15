import { Venue } from "../types/venue";

export interface Restaurant {
    id: string;
    name: string;
    cuisine: string;
    rating: number; // 1-5
    priceRange: '£' | '££' | '£££' | '££££';
    distance: number; // km
    imageUrl: string;
    availableTimes: string[];
}

// Mock database of London restaurants
const RESTAURANTS: Omit<Restaurant, 'distance'>[] = [
    {
        id: '1',
        name: "Sketch",
        cuisine: "Modern European",
        rating: 4.8,
        priceRange: "££££",
        imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=600",
        availableTimes: ["18:00", "18:30", "20:00"]
    },
    {
        id: '2',
        name: "Dishoom",
        cuisine: "Indian",
        rating: 4.9,
        priceRange: "££",
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&q=80&w=600",
        availableTimes: ["17:45", "19:15", "21:30"]
    },
    {
        id: '3',
        name: "Gloria",
        cuisine: "Italian",
        rating: 4.7,
        priceRange: "£££",
        imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600",
        availableTimes: ["18:15", "20:45"]
    },
    {
        id: '4',
        name: "Sexy Fish",
        cuisine: "Asian Fusion",
        rating: 4.5,
        priceRange: "££££",
        imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=600",
        availableTimes: ["19:00", "21:00"]
    },
    {
        id: '5',
        name: "Burger & Lobster",
        cuisine: "American",
        rating: 4.6,
        priceRange: "££",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
        availableTimes: ["17:30", "18:30", "19:30"]
    }
];

export const findRestaurants = (nearVenue: Venue, cuisine?: string): Restaurant[] => {
    // In a real app, we would query Google Places or OpenTable API with venue coordinates

    let filtered = RESTAURANTS;

    if (cuisine) {
        filtered = RESTAURANTS.filter(r => r.cuisine.toLowerCase().includes(cuisine.toLowerCase()));
    }

    // Add mock distance relative to venue
    return filtered.map(r => ({
        ...r,
        distance: Number((Math.random() * 2 + 0.1).toFixed(1)) // 0.1km to 2.1km
    })).sort((a, b) => a.distance - b.distance);
};
