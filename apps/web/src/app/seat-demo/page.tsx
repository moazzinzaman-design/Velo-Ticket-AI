"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SeatSelector from '../../components/SeatSelector';
import { getVenueByName } from '../../data/venueData';

export default function SeatSelectionDemo() {
    const [showSelector, setShowSelector] = useState(false);
    const venue = getVenueByName('The Sphere, London');

    if (!venue) {
        return <div className="min-h-screen flex items-center justify-center text-white">Venue not found</div>;
    }

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-white mb-4">Seat Selection Demo</h1>
                <p className="text-velo-text-secondary mb-8">
                    Test the interactive venue map and seat selection system
                </p>

                <button
                    onClick={() => setShowSelector(true)}
                    className="btn-primary"
                >
                    Open Seat Selector
                </button>

                <AnimatePresence>
                    {showSelector && (
                        <SeatSelector
                            venue={venue}
                            eventTitle="Daft Punk 2026"
                            basePrice={128}
                            onClose={() => setShowSelector(false)}
                            onConfirm={(seatIds, total) => {
                                console.log('Selected seats:', seatIds);
                                console.log('Total price:', total);
                                alert(`Confirmed ${seatIds.length} seats for £${total.toFixed(2)}`);
                                setShowSelector(false);
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
