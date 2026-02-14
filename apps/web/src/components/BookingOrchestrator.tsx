'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import SeatSelector from './SeatSelector';
import { defaultVenue } from '../data/venueData'; // Using mock venue data for now

export default function BookingOrchestrator() {
    const { isBookingOpen, selectedEvent, closeBooking } = useBooking();

    // In a real app, we would fetch the venue layout based on selectedEvent.venue
    // For this prototype, we'll use the default mock venue.
    const venue = defaultVenue;

    return (
        <AnimatePresence>
            {isBookingOpen && selectedEvent && (
                <SeatSelector
                    venue={venue}
                    eventTitle={selectedEvent.title}
                    basePrice={selectedEvent.price}
                    onClose={closeBooking}
                    onConfirm={(seatIds, total) => {
                        console.log('Booking confirmed:', seatIds, total);
                        closeBooking();
                        // Here you would trigger a success toast or redirect
                        alert(`Booked ${seatIds.length} seats for ${selectedEvent.title}! Total: £${total}`);
                    }}
                />
            )}
        </AnimatePresence>
    );
}
