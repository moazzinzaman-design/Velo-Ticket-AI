"use client";

import { useGroupBooking } from '../../../hooks/useGroupBooking';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Lock, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function SplitPaymentPage() {
    const params = useParams();
    const router = useRouter();
    const { getGroup, payShare } = useGroupBooking();
    const [email, setEmail] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [isPaying, setIsPaying] = useState(false);
    const [success, setSuccess] = useState(false);

    // In a real app we'd fetch from API, for now load from localStorage
    const inviteCode = params.code as string;
    const booking = getGroup(inviteCode);

    if (!booking) {
        return (
            <div className="min-h-screen bg-velo-bg-deep flex items-center justify-center text-white">
                <p>Invalid or expired invite link.</p>
            </div>
        );
    }

    const pendingMember = booking.members.find(m => m.status === 'pending');
    const userRole = pendingMember ? `Pay for ${pendingMember.name}` : "View Group Status";
    const amountToPay = pendingMember ? pendingMember.shareAmount : 0;

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pendingMember) return;

        setIsPaying(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        payShare(inviteCode, pendingMember.id, email);
        setSuccess(true);
        setIsPaying(false);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-velo-bg-deep pt-24 pb-12 px-6">
                <Navbar />
                <div className="max-w-md mx-auto mt-20 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 bg-velo-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-velo-emerald"
                    >
                        <Check size={40} className="text-velo-emerald" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-white mb-4">You're In! 🎉</h1>
                    <p className="text-velo-text-secondary mb-8">
                        Payment successful. You've joined the group for {booking.eventName}.
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="btn-primary w-full"
                    >
                        Return Home
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-velo-bg-deep flex flex-col">
            <Navbar />

            <main className="flex-1 pt-28 pb-20 px-6">
                <div className="max-w-md mx-auto">
                    {/* Event Card */}
                    <div className="glass-card rounded-3xl p-6 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="bg-velo-cyan/20 text-velo-cyan text-xs font-bold px-3 py-1 rounded-full border border-velo-cyan/30">
                                GROUP INVITE
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-1">{booking.eventName}</h2>
                        <p className="text-velo-text-secondary text-sm mb-6">Invited by {booking.captainName}</p>

                        <div className="space-y-3 border-t border-white/10 pt-4">
                            <div className="flex items-center gap-3 text-sm text-white/80">
                                <Calendar size={16} className="text-velo-text-muted" />
                                {booking.eventDate}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/80">
                                <Clock size={16} className="text-velo-text-muted" />
                                {booking.eventTime}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/80">
                                <MapPin size={16} className="text-velo-text-muted" />
                                {booking.venueName}
                            </div>
                        </div>
                    </div>

                    {pendingMember ? (
                        <div className="glass-elevated rounded-3xl p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-xl font-bold text-white">Pay Your Share</h1>
                                <span className="text-2xl font-bold text-velo-cyan">£{amountToPay.toFixed(2)}</span>
                            </div>

                            <form onSubmit={handlePayment} className="space-y-5">
                                <div>
                                    <label className="text-xs font-medium text-velo-text-muted uppercase tracking-wider mb-2 block">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-velo-violet/50 transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-velo-text-muted uppercase tracking-wider mb-2 block">
                                        Card Details (Mock)
                                    </label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                        <input
                                            type="text"
                                            required
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-velo-violet/50 transition-colors placeholder:text-white/20"
                                            placeholder="4242 4242 4242 4242"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            required
                                            placeholder="MM/YY"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-velo-violet/50 transition-colors placeholder:text-white/20"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            required
                                            placeholder="CVC"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-velo-violet/50 transition-colors placeholder:text-white/20"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPaying}
                                    className="w-full bg-gradient-to-r from-velo-violet to-velo-indigo text-white font-bold px-6 py-4 rounded-xl hover:shadow-lg hover:shadow-velo-violet/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                                >
                                    {isPaying ? (
                                        <>Processing...</>
                                    ) : (
                                        <>
                                            Pay £{amountToPay.toFixed(2)} <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center justify-center gap-2 text-xs text-velo-text-muted">
                                    <Lock size={12} />
                                    Secure payment powered by Stripe
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="text-center p-8 glass-elevated rounded-3xl">
                            <h3 className="text-xl font-bold text-white mb-2">Queue Full 🚫</h3>
                            <p className="text-velo-text-secondary">
                                All shares for this booking have been paid.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
