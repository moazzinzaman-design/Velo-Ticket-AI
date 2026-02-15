"use client";

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Share2, Info, DollarSign } from 'lucide-react';
import type { Ticket } from '../types/ticket';
import ResaleModal from './ResaleModal';
import GuaranteedBadge, { AuthenticityModal } from './GuaranteedBadge';
import PriceProtectionBadge, { PriceHistoryModal } from './PriceProtectionBadge';
import IdentityEntry from './IdentityEntry';
import { useCurrency } from '../hooks/useCurrency';

interface DigitalTicketProps {
    ticket: Ticket;
    onClose?: () => void;
    onListForResale?: (id: string, price: number) => void;
}

export default function DigitalTicket({ ticket, onClose, onListForResale }: DigitalTicketProps) {
    const [rotatedQR, setRotatedQR] = useState(ticket.qrPayload);
    const [nfcMode, setNfcMode] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [showResaleModal, setShowResaleModal] = useState(false);
    const [showAuthenticity, setShowAuthenticity] = useState(false);
    const [showPriceProtection, setShowPriceProtection] = useState(false);
    const { formatPrice } = useCurrency();

    const getTierStyle = (tier?: string) => {
        switch (tier) {
            case 'platinum':
                return {
                    bg: 'bg-gradient-to-br from-slate-300 via-white to-slate-400 text-black',
                    border: 'border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.3)]',
                    accent: 'bg-black/10',
                    label: 'PLATINUM'
                };
            case 'vip':
                return {
                    bg: 'bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700 text-white',
                    border: 'border-yellow-400/50 shadow-[0_0_30px_rgba(234,179,8,0.3)]',
                    accent: 'bg-black/20',
                    label: 'VIP'
                };
            case 'early-access':
                return {
                    bg: 'bg-gradient-to-br from-emerald-600 to-teal-800 text-white',
                    border: 'border-emerald-400/50',
                    accent: 'bg-black/20',
                    label: 'EARLY BIRD'
                };
            default:
                return {
                    bg: 'bg-gradient-to-br from-velo-violet to-velo-indigo text-white',
                    border: 'border-white/10',
                    accent: 'bg-white/10',
                    label: null
                };
        }
    };

    const style = getTierStyle(ticket.tier);

    // Simulate rotating QR code for security
    useEffect(() => {
        const interval = setInterval(() => {
            setRotatedQR(`${ticket.qrPayload}:${Date.now()}`);
        }, 15000); // Rotate every 15s
        return () => clearInterval(interval);
    }, [ticket.qrPayload]);

    return (
        <div className="relative w-full max-w-sm mx-auto perspective-1000">
            <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: showBack ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-full aspect-[3/5] preserve-3d cursor-pointer"
                onClick={() => setShowBack(!showBack)}
            >
                {/* Front Side */}
                <div className={`absolute inset-0 backface-hidden bg-black rounded-3xl overflow-hidden shadow-2xl border ${style.border}`}>
                    {/* Holographic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent bg-[length:200%_200%] animate-shimmer pointer-events-none z-10" />

                    {/* Header Image */}
                    <div className={`h-1/3 ${style.bg} relative p-6 flex flex-col justify-end`}>
                        <div className={`absolute top-4 right-4 w-8 h-8 ${style.accent} rounded-full flex items-center justify-center backdrop-blur-sm`}>
                            <Info size={16} className="currentColor" />
                        </div>

                        {style.label && (
                            <div className="absolute top-4 right-16 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold tracking-widest text-white">
                                {style.label}
                            </div>
                        )}

                        <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                            {ticket.isVerified && (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowAuthenticity(true);
                                    }}
                                >
                                    <GuaranteedBadge />
                                </div>
                            )}
                            {ticket.isPriceProtected && (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowPriceProtection(true);
                                    }}
                                >
                                    <PriceProtectionBadge />
                                </div>
                            )}
                        </div>

                        <h2 className="text-2xl font-bold text-white leading-tight mb-1">{ticket.eventName}</h2>
                        <p className="text-white/80 text-sm">{ticket.venueName}</p>
                    </div>

                    {/* Ticket Body */}
                    <div className="h-2/3 bg-velo-bg-card p-6 flex flex-col relative">
                        {/* Punch Hole Details */}
                        <div className="absolute -top-3 left-0 right-0 flex justify-between px-6">
                            <div className="w-6 h-6 rounded-full bg-black -mt-3" />
                            <div className="w-6 h-6 rounded-full bg-black -mt-3" />
                        </div>

                        {/* Seat Info */}
                        <div className="grid grid-cols-3 gap-4 mb-8 mt-2">
                            <div className="text-center">
                                <p className="text-xs text-velo-text-muted uppercase tracking-wider">SEC</p>
                                <p className="text-xl font-bold text-white">{ticket.section}</p>
                            </div>
                            <div className="text-center border-x border-white/10">
                                <p className="text-xs text-velo-text-muted uppercase tracking-wider">ROW</p>
                                <p className="text-xl font-bold text-white">{ticket.row}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-velo-text-muted uppercase tracking-wider">SEAT</p>
                                <p className="text-xl font-bold text-white">{ticket.seatNumber}</p>
                            </div>
                        </div>

                        {/* QR Code Area / Identity Entry */}
                        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl shadow-inner relative overflow-hidden">
                            {!nfcMode ? (
                                <div className="p-4 relative w-full h-full flex flex-col items-center justify-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative z-10"
                                    >
                                        <QRCodeSVG value={rotatedQR} size={180} level="H" />
                                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 font-mono justify-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Live Code • Auto-updates
                                        </div>
                                    </motion.div>

                                    {/* Scan Line Animation */}
                                    <motion.div
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                        className="absolute left-0 right-0 h-1 bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)] z-20 pointer-events-none"
                                    />
                                </div>
                            ) : (
                                <IdentityEntry
                                    onCancel={() => setNfcMode(false)}
                                    ticketId={ticket.id}
                                />
                            )}
                        </div>

                        {/* Toggle NFC */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setNfcMode(!nfcMode);
                            }}
                            className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2"
                        >
                            {nfcMode ? 'Show QR Code' : 'Switch to NFC Mode'}
                            <Wifi size={16} className={nfcMode ? 'text-blue-400' : 'text-gray-400'} />
                        </button>

                        {/* Quick Sell Button - Front Face */}
                        {ticket.isResalable !== false && ticket.status !== 'listed' && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowResaleModal(true);
                                }}
                                className="mt-2 w-full py-3 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 border border-emerald-500/20 rounded-xl text-sm font-semibold text-emerald-400 transition-all flex items-center justify-center gap-2 group/sell"
                            >
                                <DollarSign size={16} className="group-hover/sell:scale-110 transition-transform" />
                                Sell on Exchange
                            </button>
                        )}
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-velo-bg-card rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-velo-violet/10 to-transparent pointer-events-none" />

                    <h3 className="text-lg font-bold text-white mb-6">Ticket Details</h3>

                    <div className="space-y-4 flex-1">
                        <div className="flex justify-between border-b border-white/10 pb-3">
                            <span className="text-velo-text-muted text-sm">Date</span>
                            <span className="text-white font-medium">{ticket.eventDate}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-3">
                            <span className="text-velo-text-muted text-sm">Time</span>
                            <span className="text-white font-medium">{ticket.eventTime}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-3">
                            <span className="text-velo-text-muted text-sm">Gate</span>
                            <span className="text-white font-medium">{ticket.gate || 'TBA'}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-3">
                            <span className="text-velo-text-muted text-sm">Order ID</span>
                            <span className="text-white font-mono text-xs">{ticket.id}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-3">
                            <span className="text-velo-text-muted text-sm">Price</span>
                            <span className="text-white font-medium">{formatPrice(ticket.price)}</span>
                        </div>
                        {ticket.isPriceProtected && (
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span className="text-blue-400 text-sm font-bold">Protected Price</span>
                                <span className="text-blue-400 font-medium">{formatPrice(ticket.purchasePrice || 0)}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto pt-6 space-y-3">
                        {ticket.status === 'listed' ? (
                            <div className="w-full py-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center gap-2 mb-3">
                                <Share2 className="text-yellow-500" size={18} />
                                <span className="text-yellow-500 font-bold">Listed for {formatPrice(ticket.resalePrice || 0)}</span>
                            </div>
                        ) : (
                            ticket.isResalable !== false && (
                                <button
                                    className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 mb-3 hover:bg-gray-100 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowResaleModal(true);
                                    }}
                                >
                                    <Share2 size={18} />
                                    Sell on Exchange
                                </button>
                            )
                        )}
                        <p className="text-center text-xs text-velo-text-muted">
                            Tap card to flip back
                        </p>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {showResaleModal && (
                    <ResaleModal
                        ticket={ticket}
                        onClose={() => setShowResaleModal(false)}
                        onConfirmSearch={(price) => {
                            if (onListForResale) {
                                onListForResale(ticket.id, price);
                                setShowResaleModal(false);
                            }
                        }}
                    />
                )}
                {showAuthenticity && (
                    <AuthenticityModal
                        hash={ticket.authenticityHash || 'Unknown Hash'}
                        issuer={ticket.originalIssuer || 'Velo Protocol'}
                        onClose={() => setShowAuthenticity(false)}
                        key="auth-modal"
                    />
                )}
                {showPriceProtection && (
                    <PriceHistoryModal
                        purchasePrice={ticket.purchasePrice || ticket.price}
                        currentPrice={135} // Mock current market price
                        onClose={() => setShowPriceProtection(false)}
                        key="price-modal"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
