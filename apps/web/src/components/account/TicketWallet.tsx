'use client';

import { useUser } from '../../hooks/useUser';
import HolographicCard from '../visuals/HolographicCard';
import { QrCode, MapPin, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TicketWallet() {
    const { tickets } = useUser();
    const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Tickets</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tickets.map((ticket) => (
                    <HolographicCard key={ticket.id} className="h-64 rounded-2xl overflow-hidden cursor-pointer relative group">
                        <div
                            className="absolute inset-0 z-10 p-6 flex flex-col justify-between"
                            onClick={() => setSelectedTicket(ticket.id)}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{ticket.eventTitle}</h3>
                                    <div className="flex items-center gap-2 text-white/60 text-sm">
                                        <MapPin size={14} /> {ticket.eventVenue}
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl">
                                    <QrCode className="text-white" size={24} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-4 text-sm text-white/80">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {ticket.eventDate}</span>
                                </div>
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Seat Location</p>
                                    <p className="text-white font-medium">{ticket.seat}</p>
                                </div>
                            </div>
                        </div>

                        {/* Background Image */}
                        <img
                            src={ticket.eventImage}
                            alt={ticket.eventTitle}
                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </HolographicCard>
                ))}
            </div>

            {/* QR Modal */}
            <AnimatePresence>
                {selectedTicket && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedTicket(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white p-8 rounded-3xl z-10 w-full max-w-sm text-center relative"
                        >
                            <h3 className="text-black font-bold text-xl mb-2">Scan for Entry</h3>
                            <p className="text-gray-500 text-sm mb-6">Show this code at the gate</p>
                            <div className="bg-black p-4 rounded-xl inline-block mb-6">
                                <QrCode size={200} className="text-white" />
                            </div>
                            <p className="text-xs text-gray-400 font-mono">{selectedTicket}</p>
                            <button
                                onClick={() => setSelectedTicket(null)}
                                className="mt-6 w-full py-3 bg-gray-100 rounded-xl font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
