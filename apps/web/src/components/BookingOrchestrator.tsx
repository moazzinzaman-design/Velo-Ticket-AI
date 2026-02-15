'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import SeatSelector from './SeatSelector';
import { findBestVenue } from '../data/venueData';
import { EmailService } from '../lib/email/EmailService';
import { useUser } from '../hooks/useUser';

export default function BookingOrchestrator() {
    const { isBookingOpen, selectedEvent, closeBooking } = useBooking();
    const { profile } = useUser();
    const [isProcessing, setIsProcessing] = React.useState(false);

    // Match event venue to the best available venue layout
    const venue = React.useMemo(() => {
        if (!selectedEvent) return null;
        return findBestVenue(selectedEvent.venue);
    }, [selectedEvent]);

    const [dynamicPrice, setDynamicPrice] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (selectedEvent) {
            fetch(`/api/events/${selectedEvent.id}/price`)
                .then(res => res.json())
                .then(data => setDynamicPrice(data.price))
                .catch(err => console.error('Failed to fetch price:', err));
        }
    }, [selectedEvent]);

    const handleCheckout = async (seatIds: string[], total: number, addOns?: Record<string, number>) => {
        if (!selectedEvent) return;
        setIsProcessing(true);

        // Use real user email from auth, fall back to empty string
        const userEmail = profile.email || '';

        // Send booking confirmation email to the actual user
        if (userEmail) {
            EmailService.sendBookingConfirmation(
                userEmail,
                selectedEvent.title,
                `VELO-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
            );
        }

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
                    addOns,
                    customerEmail: userEmail, // Pre-fill Stripe checkout email
                    userId: profile.id, // Pass user ID for webhook fulfillment
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
            {isBookingOpen && selectedEvent && venue && (
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

