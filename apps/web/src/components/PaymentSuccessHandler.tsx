'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, Download, Ticket, X } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import { EmailService } from '../lib/email/EmailService';
import Link from 'next/link';

export default function PaymentSuccessHandler() {
    const searchParams = useSearchParams();
    const { profile, addTicket } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [bookingRef, setBookingRef] = useState('');

    useEffect(() => {
        const paymentStatus = searchParams.get('payment');
        const sessionId = searchParams.get('session_id');

        if (paymentStatus === 'success' && sessionId) {
            const ref = `VELO-${sessionId.substring(0, 8).toUpperCase()}`;
            setBookingRef(ref);
            setShowModal(true);

            // Add ticket to user's wallet
            addTicket({
                id: `tkt-${Date.now()}`,
                event_id: 'evt-confirmed',
                event_title: 'Confirmed Event',
                event_date: 'Upcoming',
                event_time: '20:00',
                venue_name: 'Venue TBC',
                event_image: 'https://images.unsplash.com/photo-1470229722913-7ea049c42081?q=80&w=2670&auto=format&fit=crop',
                seat_info: 'General Admission',
                section: 'GA',
                row: '-',
                seat_number: '-',
                price: 0,
                owner_name: 'You',
                purchase_date: new Date().toISOString(),
                qr_code: `VELO-${Date.now()}`,
                status: 'active'
            });

            // Send confirmation email
            EmailService.sendBookingConfirmation(profile.email, 'Confirmed Event', ref)
                .then(() => setEmailSent(true));

            // Clean URL without reloading
            window.history.replaceState({}, '', '/');
        }
    }, [searchParams]);

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="bg-velo-bg-card border border-white/10 rounded-3xl p-8 max-w-md w-full relative text-center"
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition"
                        >
                            <X size={16} />
                        </button>

                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
                        >
                            <Check size={40} className="text-white" strokeWidth={3} />
                        </motion.div>

                        <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
                        <p className="text-white/50 text-sm mb-6">
                            Your tickets are secured and ready.
                        </p>

                        {/* Booking Ref */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Booking Reference</p>
                            <p className="text-lg font-mono font-bold text-velo-cyan">{bookingRef}</p>
                        </div>

                        {/* Status Items */}
                        <div className="space-y-3 mb-8 text-left">
                            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${emailSent ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/30'}`}>
                                    {emailSent ? <Check size={14} /> : <Mail size={14} />}
                                </div>
                                <span className="text-sm text-white/80">Confirmation sent to <span className="text-white font-medium">{profile.email}</span></span>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                                <div className="w-6 h-6 rounded-full bg-velo-violet/20 text-velo-violet flex items-center justify-center">
                                    <Ticket size={14} />
                                </div>
                                <span className="text-sm text-white/80">Ticket added to <span className="text-white font-medium">My Velo</span></span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/account"
                                onClick={() => setShowModal(false)}
                                className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition flex items-center justify-center gap-2"
                            >
                                <Ticket size={16} /> View My Tickets
                            </Link>
                            <button
                                onClick={() => {
                                    alert('Add to Wallet functionality coming soon!');
                                }}
                                className="w-full py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition flex items-center justify-center gap-2"
                            >
                                <Download size={16} /> Add to Apple Wallet
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
