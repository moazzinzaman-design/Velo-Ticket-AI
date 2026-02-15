'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import SeatSelector from './SeatSelector';
import { venues } from '../data/venueData'; // Using mock venue data for now
import { EmailService } from '../lib/email/EmailService';

export default function BookingOrchestrator() {
    const { isBookingOpen, selectedEvent, closeBooking } = useBooking();
    const [isProcessing, setIsProcessing] = React.useState(false);

    // In a real app, we would fetch the venue layout based on selectedEvent.venue
    // For this prototype, we'll use the default mock venue.
    const venue = venues[0];
    const [dynamicPrice, setDynamicPrice] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (selectedEvent) {
            fetch(`/api/events/${selectedEvent.id}/price`)
                .then(res => res.json())
                .then(data => setDynamicPrice(data.price))
                .catch(err => console.error('Failed to fetch price:', err));
        }
    }, [selectedEvent]);

    const handleCheckout = async (seatIds: string[], total: number) => {
        if (!selectedEvent) return;
        setIsProcessing(true);

        // Track booking confirmation email trigger (mock)
        EmailService.sendBookingConfirmation(
            'user@example.com', // In a real app, this comes from useUser()
            selectedEvent.title,
            `VELO-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        );

        try {
            const response = await fetch('/api/checkout_session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price: selectedEvent.price,
                    title: selectedEvent.title,
                    quantity: seatIds.length,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('No checkout URL returned', data);
                alert(`Payment initialization failed: ${data.error || 'Unknown error'}`);
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An error occurred. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <AnimatePresence>
            {isBookingOpen && selectedEvent && (
                <SeatSelector
                    venue={venue}
                    eventTitle={selectedEvent.title}
                    basePrice={dynamicPrice || selectedEvent.price}
                    onClose={closeBooking}
                    onConfirm={handleCheckout}
                />
            )}
        </AnimatePresence>
    );
}
