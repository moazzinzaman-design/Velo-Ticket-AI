"use client";

import { useState, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DigitalTicket from '../../components/DigitalTicket';
import ReferralModal from '../../components/ReferralModal';
import ExperienceDashboard from '../../components/ExperienceDashboard';
import BiometricGate from '../../components/BiometricGate';
import ReviewModal from '../../components/ReviewModal';
import VeloMomentCard from '../../components/VeloMomentCard';
import { useTicketSystem } from '../../hooks/useTicketSystem';
import { useReviews } from '../../hooks/useReviews';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket as TicketIcon, Gift, Zap, Star, MessageSquare } from 'lucide-react';
import CurrencySelector from '../../components/CurrencySelector';

// Simulated past events for demo
const PAST_EVENTS = [
    { id: 'past-1', eventId: 'evt-past-1', eventName: 'Adele: Live at The O2', venueName: 'The O2 Arena, London', eventDate: 'Sat, 25 Jan' },
    { id: 'past-2', eventId: 'evt-past-2', eventName: 'Champions League Final', venueName: 'Wembley Stadium', eventDate: 'Sun, 02 Feb' },
];

export default function TicketWallet() {
    const { getGroupedTickets, listForResale } = useTicketSystem();
    const groupedTickets = getGroupedTickets();
    const { reviews, addReview } = useReviews();
    const [showReferralModal, setShowReferralModal] = useState(false);
    const [isBiometricOpen, setIsBiometricOpen] = useState(false);
    const [entrySuccess, setEntrySuccess] = useState(false);
    const [reviewTarget, setReviewTarget] = useState<{ eventId: string; eventName: string; venueName: string } | null>(null);

    // Identify the "Live" ticket
    const liveTicket = useMemo(() => {
        if (groupedTickets.length === 0) return null;
        return groupedTickets[0].tickets[0];
    }, [groupedTickets]);

    const handleVerifyEntry = () => {
        setIsBiometricOpen(false);
        setEntrySuccess(true);
        setTimeout(() => setEntrySuccess(false), 5000);
    };

    return (
        <div className="min-h-screen bg-velo-bg-deep flex flex-col">
            <Navbar />

            <main className="flex-1 pt-28 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">My Wallet</h1>
                            <p className="text-velo-text-secondary">Your active tickets and passes</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <CurrencySelector />
                            <button
                                onClick={() => setShowReferralModal(true)}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-velo-violet to-velo-indigo text-white text-sm font-bold shadow-lg shadow-velo-violet/20 hover:scale-[1.02] transition-transform flex items-center gap-2"
                            >
                                <Gift size={16} /> Refer & Earn £5
                            </button>
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                                <TicketIcon size={24} className="text-velo-cyan" />
                            </div>
                        </div>
                    </div>

                    {/* AI Concierge / Live Dashboard */}
                    {liveTicket && (
                        <ExperienceDashboard
                            ticket={liveTicket}
                            onEntryClick={() => setIsBiometricOpen(true)}
                        />
                    )}

                    {groupedTickets.length === 0 ? (
                        <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5">
                            <TicketIcon size={48} className="text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No tickets yet</h3>
                            <p className="text-velo-text-secondary mb-6">Time to find your next experience!</p>
                            <a href="/events" className="btn-primary inline-flex">Browse Events</a>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {groupedTickets.map((group) => (
                                <div key={group.event_id} className="relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-1 h-8 bg-velo-violet rounded-full" />
                                        <div>
                                            <h2 className="text-xl font-bold text-white">{group.event_title}</h2>
                                            <p className="text-sm text-velo-text-secondary">
                                                {group.event_date} • {group.venue_name}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide">
                                        {group.tickets.map((ticket, index) => (
                                            <motion.div
                                                key={ticket.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="snap-center shrink-0 w-full max-w-sm"
                                            >
                                                <DigitalTicket
                                                    ticket={ticket}
                                                    onListForResale={listForResale}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ═══════════ Past Events & Reviews Section ═══════════ */}
                    <div className="mt-20">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
                                <Star size={20} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Past Events</h2>
                                <p className="text-xs text-white/40">Rate your experiences and share Velo Moments</p>
                            </div>
                        </div>

                        {/* Past event cards with review prompts */}
                        <div className="space-y-4 mb-12">
                            {PAST_EVENTS.map(pe => {
                                const hasReview = reviews.some(r => r.eventId === pe.eventId);
                                return (
                                    <motion.div
                                        key={pe.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                                <TicketIcon size={20} className="text-white/30" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-white">{pe.eventName}</h3>
                                                <p className="text-xs text-white/40">{pe.eventDate} • {pe.venueName}</p>
                                            </div>
                                        </div>
                                        {hasReview ? (
                                            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                                <Star size={12} className="fill-emerald-400" /> Reviewed
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => setReviewTarget({ eventId: pe.eventId, eventName: pe.eventName, venueName: pe.venueName })}
                                                className="text-xs text-velo-violet font-bold flex items-center gap-1.5 px-4 py-2 bg-velo-violet/10 rounded-full border border-velo-violet/20 hover:bg-velo-violet/20 transition-colors"
                                            >
                                                <MessageSquare size={12} /> Write Review
                                            </button>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Velo Moments Feed */}
                        {reviews.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Your Velo Moments</span>
                                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {reviews.map(review => (
                                        <VeloMomentCard key={review.id} review={review} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Entry Success Alert */}
            <AnimatePresence>
                {entrySuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] px-8 py-4 bg-green-500 text-white rounded-full shadow-2xl flex items-center gap-3 font-bold"
                    >
                        <Zap size={20} fill="white" />
                        Access Granted • Proceed to Gate {liveTicket?.gate || 'A'}
                    </motion.div>
                )}
            </AnimatePresence>

            <BiometricGate
                isOpen={isBiometricOpen}
                onVerify={handleVerifyEntry}
                onCancel={() => setIsBiometricOpen(false)}
                actionName="Venue Entry Authenticate"
            />

            <ReviewModal
                isOpen={!!reviewTarget}
                onClose={() => setReviewTarget(null)}
                eventId={reviewTarget?.eventId || ''}
                eventName={reviewTarget?.eventName || ''}
                venueName={reviewTarget?.venueName || ''}
                onSubmit={(review) => {
                    addReview(review);
                    setReviewTarget(null);
                }}
            />

            <ReferralModal
                isOpen={showReferralModal}
                onClose={() => setShowReferralModal(false)}
            />

            <Footer />
        </div>
    );
}
