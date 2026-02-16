'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import SeatSelector from './SeatSelector';
import EventDetailsModal from './EventDetailsModal';
import GuestEmailModal from './GuestEmailModal';
import { findBestVenue } from '../data/venueData';
import { EmailService } from '../lib/email/EmailService';
import { useUser } from '../hooks/useUser';
import { createClient } from '../lib/supabase/client';

export default function BookingOrchestrator() {
    const { isBookingOpen, selectedEvent, closeBooking, showDetails, setShowDetails } = useBooking();
    const { profile } = useUser();
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [guestEmail, setGuestEmail] = React.useState<string | null>(null);
    const [showGuestModal, setShowGuestModal] = React.useState(false);
    const [pendingCheckout, setPendingCheckout] = React.useState<{ seatIds: string[], total: number, addOns?: Record<string, number> } | null>(null);

    // Match event venue to the best available venue layout
    const venue = React.useMemo(() => {
        if (!selectedEvent) return null;
        return findBestVenue(selectedEvent.venue);
    }, [selectedEvent]);

    const [dynamicPrice, setDynamicPrice] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (selectedEvent) {
            // We don't reset showDetails here anymore because openBooking handles it
            fetch(`/api/events/${selectedEvent.id}/price`)
                .then(res => res.json())
                .then(data => setDynamicPrice(data.price))
                .catch(err => console.error('Failed to fetch price:', err));
        }
    }, [selectedEvent]);

    const handleBookSeats = () => {
        setShowDetails(false);
    };

    const handleCheckout = async (seatIds: string[], total: number, addOns?: Record<string, number>) => {
        if (!selectedEvent) return;

        // CHECK FOR AFFILIATE EVENT - Redirect to partner site
        if (selectedEvent.purchaseUrl) {
            // Track the affiliate click
            const { trackAffiliateClick } = await import('../lib/analytics/affiliateTracking');

            await trackAffiliateClick({
                eventId: String(selectedEvent.id),
                eventTitle: selectedEvent.title,
                platform: selectedEvent.source || 'velo',
                userId: profile?.id,
                purchaseUrl: selectedEvent.purchaseUrl
            });

            // Open partner site in new tab
            window.open(selectedEvent.purchaseUrl, '_blank');

            // Close booking modal
            closeBooking();
            return;
        }

        // VELO-HOSTED EVENT - Continue with normal checkout
        // Check if user is authenticated
        if (!profile || !profile.email) {
            // Guest checkout - show email modal
            setPendingCheckout({ seatIds, total, addOns });
            setShowGuestModal(true);
            return;
        }

        // User is authenticated, proceed directly
        await processCheckout(seatIds, total, addOns, profile.email, profile.id);
    };

    const handleGuestContinue = async (email: string, createAccount?: boolean) => {
        setGuestEmail(email);
        setShowGuestModal(false);

        // Optionally create account in background
        if (createAccount) {
            try {
                const supabase = createClient();
                // Note: In production, you'd want to handle password securely
                // For now, we're just creating a placeholder account
                await supabase.auth.signUp({
                    email,
                    password: Math.random().toString(36), // Generate temp password
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                });
            } catch (error) {
                console.error('Account creation error:', error);
                // Continue with checkout anyway
            }
        }

        // Proceed with checkout using guest email
        if (pendingCheckout) {
            await processCheckout(
                pendingCheckout.seatIds,
                pendingCheckout.total,
                pendingCheckout.addOns,
                email,
                undefined // No user ID for guests
            );
        }
    };

    const processCheckout = async (
        seatIds: string[],
        total: number,
        addOns: Record<string, number> | undefined,
        userEmail: string,
        userId?: string
    ) => {
        if (!selectedEvent) return;
        setIsProcessing(true);

        // Send booking confirmation email
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
                    customerEmail: userEmail,
                    userId,
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
                <>
                    {showDetails ? (
                        <EventDetailsModal
                            event={selectedEvent}
                            onClose={closeBooking}
                            onBook={handleBookSeats}
                        />
                    ) : (
                        venue && (
                            <SeatSelector
                                venue={venue}
                                eventTitle={selectedEvent.title}
                                basePrice={dynamicPrice || selectedEvent.price}
                                onClose={closeBooking}
                                onConfirm={handleCheckout}
                            />
                        )
                    )}
                    {showGuestModal && (
                        <GuestEmailModal
                            onContinue={handleGuestContinue}
                            onClose={() => {
                                setShowGuestModal(false);
                                setPendingCheckout(null);
                            }}
                        />
                    )}
                </>
            )}
        </AnimatePresence>
    );
}

