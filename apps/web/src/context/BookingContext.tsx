'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our Event data (can be imported from types later)
interface EventData {
    id: number;
    title: string;
    venue: string;
    date: string;
    time: string;
    price: number;
    image: string;
}

interface BookingContextType {
    isBookingOpen: boolean;
    selectedEvent: EventData | null;
    openBooking: (event: EventData, options?: { skipDetails?: boolean }) => void;
    closeBooking: () => void;
    showDetails: boolean;
    setShowDetails: (show: boolean) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
    const [showDetails, setShowDetails] = useState(true);

    const openBooking = (event: EventData, options?: { skipDetails?: boolean }) => {
        setSelectedEvent(event);
        setShowDetails(!options?.skipDetails);
        setIsBookingOpen(true);
    };

    const closeBooking = () => {
        setIsBookingOpen(false);
        // Delay clearing event data to allow animation to finish
        setTimeout(() => setSelectedEvent(null), 300);
    };

    return (
        <BookingContext.Provider
            value={{
                isBookingOpen,
                selectedEvent,
                openBooking,
                closeBooking,
                showDetails,      // Exposed
                setShowDetails,   // Exposed
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
