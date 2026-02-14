"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import Link from 'next/link';
import { useWaitlist } from '../hooks/useWaitlist';

export default function WaitlistNotification() {
    const { availableEvents, entries, clearNotifications } = useWaitlist();
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (availableEvents.length > 0) {
            setShowNotification(true);
        }
    }, [availableEvents]);

    const handleClose = () => {
        setShowNotification(false);
        clearNotifications();
    };

    const availableEventDetails = entries.filter(e =>
        availableEvents.includes(e.eventId) && !e.notified
    );

    if (availableEventDetails.length === 0) return null;

    return (
        <AnimatePresence>
            {showNotification && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed top-24 right-6 z-[150] w-96 max-w-[calc(100vw-3rem)]"
                >
                    <div className="glass-elevated rounded-2xl p-5 border border-velo-emerald/30 shadow-xl shadow-velo-emerald/10">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-velo-emerald/20 border border-velo-emerald/30 flex items-center justify-center">
                                    <Bell size={18} className="text-velo-emerald" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Tickets Available!</h4>
                                    <p className="text-xs text-velo-text-muted">
                                        {availableEventDetails.length} event{availableEventDetails.length > 1 ? 's' : ''} on your waitlist
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        <div className="space-y-2 mb-4">
                            {availableEventDetails.map((event) => (
                                <div
                                    key={event.eventId}
                                    className="bg-white/[0.03] rounded-lg p-3 border border-white/[0.06]"
                                >
                                    <p className="text-sm font-medium text-white mb-1">{event.eventTitle}</p>
                                    <p className="text-xs text-velo-text-muted">Tickets just became available</p>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/events"
                            onClick={handleClose}
                            className="block w-full bg-velo-emerald text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-velo-emerald/90 transition-colors text-sm text-center"
                        >
                            View Events
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
