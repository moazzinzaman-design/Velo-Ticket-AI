"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Ticket, ShoppingCart, Trash2, Users } from 'lucide-react';
import VenueMap from './VenueMap';
import SeatLegend from './SeatLegend';
import GroupSplitModal from './GroupSplitModal';
import { useVenueSelection } from '../hooks/useVenueSelection';
import { useGroupBooking } from '../hooks/useGroupBooking';
import type { Venue } from '../types/venue';

interface SeatSelectorProps {
    venue: Venue;
    eventTitle: string;
    basePrice: number;
    onClose: () => void;
    onConfirm: (seatIds: string[], totalPrice: number, addOns?: Record<string, number>) => void;
}

import UpgradeModal from './UpgradeModal';

// ... (previous imports)

export default function SeatSelector({ venue, eventTitle, basePrice, onClose, onConfirm }: SeatSelectorProps) {
    const {
        selectedSeats,
        selectSeat,
        deselectSeat,
        clearSelection,
        getTotalPrice,
        isSelected,
        canSelectMore,
    } = useVenueSelection(venue.layout.sections);

    const { createGroup } = useGroupBooking();
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [createdGroup, setCreatedGroup] = useState<any>(null); // Using any to avoid complex type import for now

    const totalPrice = getTotalPrice(basePrice);

    const handleInitialConfirm = () => {
        if (selectedSeats.length === 0) return;
        setShowUpgradeModal(true);
    };

    const handleFinalConfirm = (finalPrice: number, addOns: Record<string, number>) => {
        const seatIds = selectedSeats.map(s => s.id);
        onConfirm(seatIds, finalPrice, addOns);
    };

    const handleSplitPayment = () => {
        if (selectedSeats.length === 0) return;

        // Create the group booking
        const group = createGroup({
            captainName: 'You', // In a real app, user's actual name
            captainEmail: 'you@example.com',
            eventName: eventTitle,
            eventDate: 'Fri, 14 Aug', // Mock data for demo
            eventTime: '19:30',
            venueName: venue.name,
            totalAmount: totalPrice,
            seats: selectedSeats.map(s => s.id),
        });

        setCreatedGroup(group);
        setShowGroupModal(true);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[250] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="w-full max-w-7xl h-[90vh] glass-elevated rounded-3xl overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{eventTitle}</h3>
                                <p className="text-sm text-velo-text-secondary">{venue.name}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Map */}
                        <div className="flex-1 p-6">
                            <VenueMap
                                layout={venue.layout}
                                onSeatClick={seat => {
                                    if (isSelected(seat.id)) {
                                        deselectSeat(seat.id);
                                    } else if (canSelectMore()) {
                                        selectSeat(seat);
                                    }
                                }}
                                isSelected={isSelected}
                                basePrice={basePrice}
                            />
                        </div>

                        {/* Sidebar */}
                        <div className="w-80 border-l border-white/10 p-6 flex flex-col">
                            <SeatLegend sections={venue.layout.sections} basePrice={basePrice} />

                            {/* Selected seats */}
                            <div className="flex-1 mt-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-velo-text-muted">
                                        Selected Seats ({selectedSeats.length}/10)
                                    </h4>
                                    {selectedSeats.length > 0 && (
                                        <button
                                            onClick={clearSelection}
                                            className="text-xs text-velo-rose hover:text-white transition-colors flex items-center gap-1"
                                        >
                                            <Trash2 size={12} />
                                            Clear
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-1.5 overflow-y-auto max-h-48">
                                    {selectedSeats.length === 0 ? (
                                        <p className="text-sm text-velo-text-muted text-center py-8">
                                            Click seats on the map to select
                                        </p>
                                    ) : (
                                        selectedSeats.map((seat) => {
                                            const section = venue.layout.sections.find(s =>
                                                s.seats.some(st => st.id === seat.id)
                                            );
                                            return (
                                                <div
                                                    key={seat.id}
                                                    className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Ticket size={14} className="text-velo-violet" />
                                                        <span className="text-sm text-white">
                                                            {seat.row}-{seat.number}
                                                        </span>
                                                        {section && (
                                                            <span className="text-xs text-velo-text-muted">
                                                                ({section.name})
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => deselectSeat(seat.id)}
                                                        className="text-velo-text-muted hover:text-white"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            {/* Total & confirm */}
                            <div className="border-t border-white/10 pt-6 mt-6 space-y-3">
                                {/* Price Breakdown */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-velo-text-secondary">Subtotal ({selectedSeats.length} ticket{selectedSeats.length !== 1 ? 's' : ''})</span>
                                        <span className="text-white">£{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-velo-text-muted">Velo Service Fee</span>
                                        <span className="text-white/60">£{(totalPrice * 0.10).toFixed(2)}</span>
                                    </div>
                                    <div className="w-full h-px bg-white/10" />
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-white">Total</span>
                                        <span className="text-2xl font-bold text-white">
                                            £{(totalPrice * 1.10).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleInitialConfirm}
                                    disabled={selectedSeats.length === 0}
                                    className="w-full bg-gradient-to-r from-velo-violet to-velo-indigo text-white font-semibold px-6 py-4 rounded-xl hover:shadow-lg hover:shadow-velo-violet/20 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={18} />
                                    Pay Now
                                </button>

                                <button
                                    onClick={handleSplitPayment}
                                    disabled={selectedSeats.length < 2}
                                    className="w-full bg-white/[0.05] text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/[0.08] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/10"
                                >
                                    <Users size={18} />
                                    Split with Friends
                                </button>

                                <p className="text-xs text-velo-text-muted text-center pt-2">
                                    Select 2+ seats to split the payment
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {showGroupModal && createdGroup && (
                    <GroupSplitModal
                        booking={createdGroup}
                        onClose={() => setShowGroupModal(false)}
                    />
                )}
                {showUpgradeModal && (
                    <UpgradeModal
                        baseTotal={totalPrice}
                        onClose={() => setShowUpgradeModal(false)}
                        onConfirm={handleFinalConfirm}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
