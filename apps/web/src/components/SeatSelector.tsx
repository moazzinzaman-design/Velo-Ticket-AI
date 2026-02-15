"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Ticket, ShoppingCart, Trash2, Users, Check } from 'lucide-react';
import Link from 'next/link';
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
    const [agreed, setAgreed] = useState(false);
    const [ageConfirmed, setAgeConfirmed] = useState(false);

    const is18Plus = eventTitle.toLowerCase().includes('united') || venue.name.toLowerCase().includes('emirates'); // Simplified logic for demo, usually passed via prop
    const finalAgreed = venue.name.includes('Emirates') ? (agreed && ageConfirmed) : agreed; // In a real app we'd use event.ageRestriction

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
                    <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-5 border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-30">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center">
                                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm md:text-lg font-bold text-white leading-tight">{eventTitle}</h3>
                                <p className="text-[10px] md:text-sm text-velo-text-secondary">{venue.name}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                        {/* Map */}
                        <div className="flex-1 p-4 md:p-6 min-h-[50vh] md:min-h-0 relative">
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
                        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/10 p-4 md:p-6 flex flex-col bg-black/40 md:bg-transparent md:max-h-full overflow-y-auto">
                            <div className="md:sticky md:top-0 space-y-6 pb-20 md:pb-0">
                                <SeatLegend sections={venue.layout.sections} basePrice={basePrice || 50} />

                                {/* Selected seats */}
                                <div className="flex-1 mt-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-velo-text-muted">
                                                Selected Seats
                                            </h4>
                                            <span className="bg-velo-violet/20 text-velo-violet text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                {selectedSeats.length}/10
                                            </span>
                                        </div>
                                        {selectedSeats.length > 0 && (
                                            <button
                                                onClick={clearSelection}
                                                className="text-[10px] md:text-xs text-velo-rose hover:text-white transition-colors flex items-center gap-1"
                                            >
                                                <Trash2 size={10} />
                                                Clear
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-1 overflow-y-auto max-h-32 md:max-h-48 scrollbar-hide">
                                        {selectedSeats.length === 0 ? (
                                            <p className="text-xs text-velo-text-muted text-center py-4 border border-dashed border-white/5 rounded-xl">
                                                Tap seats on the map to select
                                            </p>
                                        ) : (
                                            selectedSeats.map((seat) => {
                                                const section = venue.layout.sections.find(s =>
                                                    s.seats.some(st => st.id === seat.id)
                                                );
                                                return (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        key={seat.id}
                                                        className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded bg-velo-violet/10 flex items-center justify-center">
                                                                <Ticket size={12} className="text-velo-violet" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-bold text-white leading-none">
                                                                    {seat.row}-{seat.number}
                                                                </p>
                                                                {section && (
                                                                    <p className="text-[9px] text-velo-text-muted uppercase tracking-tighter">
                                                                        {section.name}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => deselectSeat(seat.id)}
                                                            className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-velo-text-muted hover:text-white"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </motion.div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>

                                {/* Total & confirm */}
                                <div className="border-t border-white/10 pt-6 mt-6 space-y-3">
                                    {/* Price Breakdown */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-velo-text-secondary">Subtotal ({selectedSeats.length} ticket{selectedSeats.length !== 1 ? 's' : ''})</span>
                                            <span className="text-white">£{totalPrice > 0 ? totalPrice.toFixed(2) : '0.00'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs font-mono">
                                            <span className="text-velo-text-muted">Service Fee (10%)</span>
                                            <span className="text-white/60">£{totalPrice > 0 ? (totalPrice * 0.10).toFixed(2) : '0.00'}</span>
                                        </div>
                                        <div className="w-full h-px bg-white/10" />
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-white uppercase tracking-wider">Estimated Total</span>
                                            <span className="text-xl md:text-2xl font-bold text-white">
                                                {totalPrice > 0 ? `£${(totalPrice * 1.10).toFixed(2)}` : 'Calculated at checkout'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Legal Compliance Checkbox */}
                                    <div className="flex items-start gap-3 mb-4 px-1">
                                        <div className="relative flex items-center pt-1">
                                            <input
                                                type="checkbox"
                                                id="ticket-terms"
                                                className="peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-white/30 bg-white/5 checked:border-velo-violet checked:bg-velo-violet transition-all"
                                                checked={agreed}
                                                onChange={(e) => setAgreed(e.target.checked)}
                                            />
                                            <Check size={12} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 text-white font-bold" />
                                        </div>
                                        <label htmlFor="ticket-terms" className="text-[10px] text-velo-text-muted cursor-pointer select-none">
                                            I agree to the <Link href="/terms" className="text-white hover:underline">Terms of Service</Link> and acknowledge that event liability rests with the promoter.
                                        </label>
                                    </div>

                                    {/* Age Acknowledgment (Conditional) */}
                                    {is18Plus && (
                                        <div className="flex items-start gap-3 mb-4 px-1">
                                            <div className="relative flex items-center pt-1">
                                                <input
                                                    type="checkbox"
                                                    id="age-confirm"
                                                    className="peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-white/30 bg-white/5 checked:border-velo-rose checked:bg-velo-rose transition-all"
                                                    checked={ageConfirmed}
                                                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                                                />
                                                <Check size={12} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 text-white font-bold" />
                                            </div>
                                            <label htmlFor="age-confirm" className="text-[10px] text-velo-text-muted cursor-pointer select-none">
                                                I confirm that I am <span className="text-white font-bold">18 years or older</span> and will provide valid ID at the venue.
                                            </label>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={handleInitialConfirm}
                                            disabled={selectedSeats.length === 0 || !finalAgreed}
                                            className="w-full bg-gradient-to-r from-velo-violet to-velo-indigo text-white font-bold px-6 py-4 rounded-xl hover:shadow-lg hover:shadow-velo-violet/20 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart size={18} />
                                            Pay Now
                                        </button>

                                        <button
                                            onClick={handleSplitPayment}
                                            disabled={selectedSeats.length < 2}
                                            className="w-full bg-white/[0.05] text-white font-bold px-6 py-3 rounded-xl hover:bg-white/[0.08] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/10"
                                        >
                                            <Users size={16} />
                                            Split with Friends
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mobile Sticky Checkout Bar */}
                    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            className="bg-velo-bg-deep/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-2xl"
                        >
                            <div className="flex flex-col">
                                <span className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-none mb-1">Total Due</span>
                                <span className="text-xl font-bold text-white">£{(totalPrice * 1.10).toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleInitialConfirm}
                                disabled={selectedSeats.length === 0 || !finalAgreed}
                                className="bg-gradient-to-r from-velo-violet to-velo-indigo text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg shadow-velo-violet/20 disabled:opacity-40"
                            >
                                Checkout ({selectedSeats.length})
                            </button>
                        </motion.div>
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
