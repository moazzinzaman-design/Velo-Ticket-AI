import { useState, useEffect } from 'react';

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
    description: string;
    soldPercentage: number;
    status: 'draft' | 'live' | 'sold_out' | 'past';
    promoterId?: string;
}

export const MOCK_EVENTS: Event[] = [
    {
        id: 1,
        title: 'Neon Nights Festival',
        venue: 'O2 Arena, London',
        date: 'Jul 15, 2026',
        time: '19:00',
        price: 120,
        category: 'Music',
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
        tag: 'SELLING FAST',
        description: 'The biggest electronic music festival of the year.',
        soldPercentage: 85,
        status: 'live'
    },
    {
        id: 2,
        title: 'Tech Summit 2026',
        venue: 'ExCeL London',
        date: 'Aug 22, 2026',
        time: '09:00',
        price: 299,
        category: 'Conference',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
        tag: 'NEW',
        description: 'Future of AI and Technology.',
        soldPercentage: 12,
        status: 'draft'
    }
];

export function useEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate fetching events
        const fetchEvents = async () => {
            try {
                setLoading(true);
                // In production: await fetch('/api/events');
                await new Promise(resolve => setTimeout(resolve, 800)); // Simulate net delay
                setEvents(MOCK_EVENTS);
            } catch (err) {
                setError('Failed to load events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const createEvent = async (eventData: Partial<Event>) => {
        setLoading(true);
        try {
            const response = await fetch('/api/events/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) throw new Error('Failed to create event');

            const result = await response.json();

            // Optimistically update list
            setEvents(prev => [result.event, ...prev]);

            return result.event;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getPromoterEvents = async (promoterId?: string) => {
        // Mock implementation: filter by promoterId if we had it, or return all for now
        return events;
    };

    return {
        events,
        loading,
        error,
        createEvent,
        getPromoterEvents,
        refresh: () => setLoading(true) // Trigger effect again if we depended on loading, or separate function
    };
}
