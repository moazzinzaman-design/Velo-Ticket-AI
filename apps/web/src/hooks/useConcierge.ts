"use client";

import { useState, useEffect } from 'react';
import type { Ticket } from '../types/ticket';

export interface ConciergeState {
    travelTime: number; // minutes
    travelMode: 'uber' | 'bolt' | 'public' | 'walking';
    weather: {
        temp: number;
        condition: 'sunny' | 'rainy' | 'cloudy' | 'windy';
        suggestion: string;
    };
    isEventSoon: boolean;
    minutesToStart: number;
}

export function useConcierge(upcomingTicket?: Ticket) {
    const [state, setState] = useState<ConciergeState | null>(null);

    useEffect(() => {
        if (!upcomingTicket) {
            setState(null);
            return;
        }

        // Simulate logic to check if event is within 24 hours
        // For development, we'll force it to be "soon" if we have a ticket

        const updateConcierge = () => {
            // Mock travel logic
            const baseTravelTime = 35;
            const variance = Math.floor(Math.random() * 10) - 5;

            // Mock weather logic
            const conditions: ConciergeState['weather']['condition'][] = ['sunny', 'rainy', 'cloudy', 'windy'];
            const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

            const weatherSuggestions = {
                sunny: "Perfect evening for the show. Light jacket recommended.",
                rainy: "Rain expected. We've reserved a covered drop-off point.",
                cloudy: "Mild conditions. Ideal for the outdoor terrace.",
                windy: "Chilly breeze tonight. The VIP lounge is heated."
            };

            setState({
                travelTime: baseTravelTime + variance,
                travelMode: 'uber',
                weather: {
                    temp: 18 + Math.floor(Math.random() * 5),
                    condition: randomCondition,
                    suggestion: weatherSuggestions[randomCondition]
                },
                isEventSoon: true, // Force true for demo
                minutesToStart: 120 // 2 hours away for demo
            });
        };

        updateConcierge();
        const interval = setInterval(updateConcierge, 30000); // Update every 30s

        return () => clearInterval(interval);
    }, [upcomingTicket]);

    return state;
}
