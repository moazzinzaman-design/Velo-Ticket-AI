'use client';

import { useUser } from '../../hooks/useUser';
import HolographicCard from '../visuals/HolographicCard';
import { QrCode, MapPin, Calendar, Download, Mail, Smartphone, X, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmailService } from '../../lib/email/EmailService';

export default function TicketWallet() {
    const { tickets, profile } = useUser();
    const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
    const [emailSentFor, setEmailSentFor] = useState<string | null>(null);
    const [walletAdded, setWalletAdded] = useState<string | null>(null);

    const handleSendToEmail = (ticketId: string, eventTitle: string) => {
        EmailService.sendBookingConfirmation(profile.email, eventTitle, ticketId);
        setEmailSentFor(ticketId);
        setTimeout(() => setEmailSentFor(null), 3000);
    };

    const handleAddToWallet = (ticketId: string) => {
        setWalletAdded(ticketId);
        setTimeout(() => setWalletAdded(null), 3000);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Tickets</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="space-y-3">
                        <HolographicCard className="h-64 rounded-2xl overflow-hidden cursor-pointer relative group">
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

                            <img
                                src={ticket.eventImage}
                                alt={ticket.eventTitle}
                                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        </HolographicCard>

                        {/* Wallet Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleAddToWallet(ticket.id)}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-all"
                            >
                                {walletAdded === ticket.id ? (
                                    <><Check size={14} className="text-emerald-400" /> Added!</>
                                ) : (
                                    <><Smartphone size={14} /> Add to Wallet</>
                                )}
                            </button>
                            <button
                                onClick={() => handleSendToEmail(ticket.id, ticket.eventTitle)}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-all"
                            >
                                {emailSentFor === ticket.id ? (
                                    <><Check size={14} className="text-emerald-400" /> Sent!</>
                                ) : (
                                    <><Mail size={14} /> Email Ticket</>
                                )}
                            </button>
                            <button
                                onClick={() => {/* Mock PDF download */ }}
                                className="py-2.5 px-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-all"
                                title="Download PDF"
                            >
                                <Download size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* QR Modal with Wallet Actions */}
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
                            <button
                                onClick={() => setSelectedTicket(null)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
                            >
                                <X size={16} />
                            </button>
                            <h3 className="text-black font-bold text-xl mb-2">Scan for Entry</h3>
                            <p className="text-gray-500 text-sm mb-6">Show this code at the gate</p>
                            <div className="bg-black p-4 rounded-xl inline-block mb-4">
                                <QrCode size={200} className="text-white" />
                            </div>
                            <p className="text-xs text-gray-400 font-mono mb-6">{selectedTicket}</p>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleAddToWallet(selectedTicket)}
                                    className="py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2"
                                >
                                    <Smartphone size={14} />
                                    {walletAdded === selectedTicket ? 'Added!' : 'Apple Wallet'}
                                </button>
                                <button
                                    onClick={() => {
                                        const ticket = tickets.find(t => t.id === selectedTicket);
                                        if (ticket) handleSendToEmail(ticket.id, ticket.eventTitle);
                                    }}
                                    className="py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                >
                                    <Mail size={14} />
                                    {emailSentFor === selectedTicket ? 'Sent!' : 'Email Ticket'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
