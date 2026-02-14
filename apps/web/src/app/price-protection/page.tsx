"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Shield, TrendingDown, ArrowLeft, Sparkles, DollarSign,
    Bell, BellOff, ChevronRight, CheckCircle2, Gift, Ticket,
    ArrowDownRight, Clock, CreditCard
} from 'lucide-react';
import Link from 'next/link';

/* ─── Mock Data ─── */
const trackedTickets = [
    {
        id: 'tk-1',
        event: 'Daft Punk 2026',
        venue: 'The Sphere, London',
        date: 'Mar 15, 2026',
        purchasePrice: 128,
        currentPrice: 128,
        lowestPrice: 128,
        priceHistory: [135, 132, 128, 128, 130, 128, 125, 128],
        creditEarned: 0,
        autoRefund: true,
        status: 'stable' as const,
    },
    {
        id: 'tk-2',
        event: 'Coldplay World Tour',
        venue: 'Glastonbury Festival',
        date: 'Jun 28, 2026',
        purchasePrice: 110,
        currentPrice: 95,
        lowestPrice: 92,
        priceHistory: [110, 108, 105, 100, 98, 95, 92, 95],
        creditEarned: 18,
        autoRefund: true,
        status: 'dropped' as const,
    },
    {
        id: 'tk-3',
        event: 'Taylor Swift | Eras Tour',
        venue: 'O2 Arena, London',
        date: 'Apr 12, 2026',
        purchasePrice: 145,
        currentPrice: 155,
        lowestPrice: 140,
        priceHistory: [145, 142, 140, 145, 148, 150, 152, 155],
        creditEarned: 5,
        autoRefund: false,
        status: 'rising' as const,
    },
];

function SparkLine({ data, color }: { data: number[]; color: string }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((v - min) / range) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox="0 0 100 100" className="w-full h-16" preserveAspectRatio="none">
            <defs>
                <linearGradient id={`sparkGrad-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            {/* Fill area */}
            <polygon
                points={`0,100 ${points} 100,100`}
                fill={`url(#sparkGrad-${color})`}
            />
            {/* Line */}
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            {/* End dot */}
            {data.length > 0 && (() => {
                const lastX = 100;
                const lastY = 100 - ((data[data.length - 1] - min) / range) * 100;
                return <circle cx={lastX} cy={lastY} r="3" fill={color} />;
            })()}
        </svg>
    );
}

function TicketCard({ ticket, index }: { ticket: typeof trackedTickets[0]; index: number }) {
    const [autoRefund, setAutoRefund] = useState(ticket.autoRefund);
    const priceDiff = ticket.purchasePrice - ticket.lowestPrice;
    const sparkColor = ticket.status === 'dropped' ? '#10b981' : ticket.status === 'rising' ? '#f59e0b' : '#6366f1';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card-hover rounded-2xl overflow-hidden"
        >
            {/* Header gradient line */}
            <div className={`h-1 ${ticket.status === 'dropped' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                    ticket.status === 'rising' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                        'bg-gradient-to-r from-velo-violet to-velo-indigo'
                }`} />

            <div className="p-6">
                {/* Event Info */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-white text-lg">{ticket.event}</h3>
                        <p className="text-xs text-white/40 mt-0.5">{ticket.venue} • {ticket.date}</p>
                    </div>
                    {ticket.creditEarned > 0 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                            <Gift size={12} className="text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-400">£{ticket.creditEarned} credit</span>
                        </div>
                    )}
                </div>

                {/* Price Chart */}
                <div className="mb-5">
                    <SparkLine data={ticket.priceHistory} color={sparkColor} />
                    <div className="flex justify-between mt-1">
                        <span className="text-[9px] text-white/20">8 weeks ago</span>
                        <span className="text-[9px] text-white/20">Now</span>
                    </div>
                </div>

                {/* Price Details */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                    <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Paid</p>
                        <p className="text-lg font-bold text-white">£{ticket.purchasePrice}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Current</p>
                        <p className={`text-lg font-bold ${ticket.currentPrice < ticket.purchasePrice ? 'text-emerald-400' : 'text-white'}`}>
                            £{ticket.currentPrice}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Lowest</p>
                        <p className="text-lg font-bold text-velo-cyan">£{ticket.lowestPrice}</p>
                    </div>
                </div>

                {priceDiff > 0 && (
                    <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <ArrowDownRight size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-emerald-400">Price dropped £{priceDiff} since purchase</p>
                            <p className="text-[10px] text-white/40">£{ticket.creditEarned} auto-refunded to your Velo Wallet</p>
                        </div>
                    </div>
                )}

                {/* Auto-Refund Toggle */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        {autoRefund ? <Bell size={14} className="text-velo-violet" /> : <BellOff size={14} className="text-white/30" />}
                        <span className="text-xs text-white/60">Auto-refund on price drop</span>
                    </div>
                    <button
                        onClick={() => setAutoRefund(!autoRefund)}
                        className={`w-10 h-5 rounded-full transition-all relative ${autoRefund ? 'bg-velo-violet' : 'bg-white/10'}`}
                    >
                        <motion.div
                            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
                            animate={{ left: autoRefund ? '1.25rem' : '0.125rem' }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function PriceProtectionPage() {
    const totalCredits = trackedTickets.reduce((sum, t) => sum + t.creditEarned, 0);

    return (
        <div className="min-h-screen bg-velo-bg-deep relative overflow-hidden">
            <div className="absolute inset-0 mesh-background pointer-events-none" />

            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-emerald-500/3 blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-3 mb-3">
                        <Shield size={18} className="text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-[0.15em]">Best Price Guarantee</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Price <span className="gradient-text">Protection</span>
                    </h1>
                    <p className="text-lg text-white/50">
                        If the price drops after you buy, we auto-refund the difference. Zero effort.
                    </p>
                </motion.div>

                {/* Summary Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8 grid grid-cols-3 gap-4"
                >
                    <div className="glass-card rounded-2xl p-5 text-center">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                            <DollarSign size={20} />
                        </div>
                        <p className="text-2xl font-bold text-emerald-400">£{totalCredits}</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Total Saved</p>
                    </div>
                    <div className="glass-card rounded-2xl p-5 text-center">
                        <div className="w-10 h-10 rounded-xl bg-velo-violet/10 flex items-center justify-center text-velo-violet mx-auto mb-3">
                            <Ticket size={20} />
                        </div>
                        <p className="text-2xl font-bold text-white">{trackedTickets.length}</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Tracked</p>
                    </div>
                    <div className="glass-card rounded-2xl p-5 text-center">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mx-auto mb-3">
                            <CreditCard size={20} />
                        </div>
                        <p className="text-2xl font-bold text-white">{trackedTickets.filter(t => t.autoRefund).length}</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Auto-Refund On</p>
                    </div>
                </motion.div>

                {/* Ticket Cards */}
                <div className="mt-8 space-y-6">
                    {trackedTickets.map((ticket, i) => (
                        <TicketCard key={ticket.id} ticket={ticket} index={i} />
                    ))}
                </div>

                {/* Trust Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <div className="p-4 glass-card rounded-2xl inline-flex items-center gap-4">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <p className="text-xs text-white/50">
                            Price Protection powered by <span className="text-velo-violet font-bold">Velo Smart Contracts</span> — fully automatic, zero claims.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
