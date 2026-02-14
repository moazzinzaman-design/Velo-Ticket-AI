"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Mail, Check } from 'lucide-react';
import { useWaitlist } from '../hooks/useWaitlist';

interface WaitlistButtonProps {
    eventId: number;
    eventTitle: string;
}

export default function WaitlistButton({ eventId, eventTitle }: WaitlistButtonProps) {
    const { joinWaitlist, isOnWaitlist } = useWaitlist();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [joined, setJoined] = useState(isOnWaitlist(eventId));
    const [showSuccess, setShowSuccess] = useState(false);

    const handleJoin = () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return; // Basic email validation
        }

        joinWaitlist(eventId, eventTitle, email);
        setJoined(true);
        setShowSuccess(true);

        setTimeout(() => {
            setIsModalOpen(false);
            setTimeout(() => {
                setShowSuccess(false);
                setEmail('');
            }, 300);
        }, 1500);
    };

    if (joined) {
        return (
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-velo-emerald/20 text-velo-emerald border border-velo-emerald/30">
                <Check size={14} />
                On Waitlist
            </span>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-all duration-300"
            >
                <Bell size={14} />
                Join Waitlist
            </button>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="glass-card rounded-3xl p-8 max-w-md w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>

                            {showSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 rounded-full bg-velo-emerald/20 border-2 border-velo-emerald flex items-center justify-center mx-auto mb-4">
                                        <Check size={32} className="text-velo-emerald" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                                    <p className="text-velo-text-secondary text-sm">
                                        We'll notify you when tickets become available.
                                    </p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-5">
                                        <Bell size={24} className="text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">Join Waitlist</h3>
                                    <p className="text-velo-text-secondary text-sm mb-6">
                                        Get notified when tickets for <span className="text-white font-medium">{eventTitle}</span> become available.
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-medium text-velo-text-muted uppercase tracking-wider mb-2 block">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-velo-text-muted" />
                                                <input
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-velo-text-muted text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
                                                    autoFocus
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleJoin}
                                            disabled={!email || !/\S+@\S+\.\S+/.test(email)}
                                            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                                        >
                                            Join Waitlist
                                        </button>

                                        <p className="text-xs text-velo-text-muted text-center">
                                            No spam. Just a heads-up when tickets are back.
                                        </p>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
