'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, MapPin, Clock, RotateCcw } from 'lucide-react';

interface Ticket {
    id: string;
    event_title: string;
    event_date: string;
    venue_name: string;
    seat_info: string;
    qr_code: string;
    status: string;
    metadata: any;
}

export default function TicketCard({ ticket }: { ticket: Ticket }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="relative w-full h-[400px] perspective-1000 group cursor-pointer" onClick={() => setFlipped(!flipped)}>
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-700"
                animate={{ rotateY: flipped ? 180 : 0 }}
            >
                {/* FRONT */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-md flex flex-col">
                    {/* Header */}
                    <div className="h-32 bg-gradient-to-r from-velo-violet to-velo-indigo p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <h3 className="text-xl font-bold text-white relative z-10 line-clamp-2">{ticket.event_title}</h3>
                        <div className="flex items-center gap-2 text-white/80 text-xs mt-2 relative z-10">
                            <span className="bg-white/20 px-2 py-1 rounded-full">General Admission</span>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-6 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-velo-cyan">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-velo-text-muted uppercase">Date</p>
                                <p className="text-sm font-medium text-white">{new Date(ticket.event_date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-velo-cyan">
                                <Clock size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-velo-text-muted uppercase">Time</p>
                                <p className="text-sm font-medium text-white">{new Date(ticket.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-velo-cyan">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-velo-text-muted uppercase">Venue</p>
                                <p className="text-sm font-medium text-white line-clamp-1">{ticket.venue_name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/10 bg-black/20 flex justify-between items-center">
                        <div className="text-xs text-velo-text-muted">Tap to flip for QR Code</div>
                        <div className={`px-2 py-1 rounded text-xs font-bold ${ticket.status === 'valid' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {ticket.status.toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* BACK (QR Code) */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-white flex flex-col items-center justify-center p-8 space-y-6"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <h3 className="text-black font-bold text-lg">Scan at Entry</h3>
                    <div className="p-4 bg-white rounded-xl shadow-xl border-2 border-dashed border-gray-300">
                        <QRCodeSVG value={ticket.qr_code} size={180} />
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-xs text-gray-500 font-mono">{ticket.qr_code}</p>
                        <p className="text-xs text-black/60 font-medium">{ticket.seat_info}</p>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <RotateCcw size={16} className="text-gray-600" />
                    </button>
                    <div className="absolute bottom-6 text-xs text-gray-400">Powered by Velo SecureEntry™</div>
                </div>
            </motion.div>
        </div>
    );
}
