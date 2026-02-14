"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, Users, DollarSign, BarChart3, Target,
    ArrowLeft, Sparkles, Calendar, MapPin, ArrowUpRight,
    ArrowDownRight, Minus, Zap, Megaphone, Eye
} from 'lucide-react';
import Link from 'next/link';

/* ─── Mock Data ─── */
const events = [
    {
        id: 'ev-1',
        name: 'Daft Punk 2026',
        venue: 'The Sphere, London',
        date: 'Mar 15, 2026',
        totalCapacity: 20000,
        ticketsSold: 17800,
        revenue: 2_278_400,
        predictedDemand: 'Extreme',
        demandScore: 96,
        optimalPrice: 135,
        currentPrice: 128,
        trend: 'up' as const,
        peakDay: 'Feb 28',
        audienceAge: '18-34',
    },
    {
        id: 'ev-2',
        name: 'Coldplay World Tour',
        venue: 'Glastonbury Festival',
        date: 'Jun 28, 2026',
        totalCapacity: 80000,
        ticketsSold: 52000,
        revenue: 5_200_000,
        predictedDemand: 'High',
        demandScore: 82,
        optimalPrice: 110,
        currentPrice: 95,
        trend: 'up' as const,
        peakDay: 'Mar 15',
        audienceAge: '22-40',
    },
    {
        id: 'ev-3',
        name: 'Local Jazz Night',
        venue: 'Ronnie Scott\'s',
        date: 'Mar 01, 2026',
        totalCapacity: 250,
        ticketsSold: 110,
        revenue: 5_500,
        predictedDemand: 'Moderate',
        demandScore: 55,
        optimalPrice: 48,
        currentPrice: 50,
        trend: 'down' as const,
        peakDay: 'Feb 25',
        audienceAge: '30-55',
    },
];

const marketingTips = [
    { title: 'Social Boost', description: 'Post a teaser video on Thursday evening — your audience peaks at 7-9 PM.', icon: Megaphone, impact: '+12% conversions' },
    { title: 'Email Blast', description: 'Send a "Last Chance" email 5 days before the event for maximum urgency.', icon: Target, impact: '+8% open rate' },
    { title: 'Price Signal', description: 'Enable Early Bird pricing now to capture 30% of total sales in the first week.', icon: DollarSign, impact: '+23% early sales' },
];

function DemandBar({ score }: { score: number }) {
    const color = score > 80 ? 'bg-red-500' : score > 50 ? 'bg-amber-500' : 'bg-emerald-500';
    const glow = score > 80 ? 'shadow-red-500/30' : score > 50 ? 'shadow-amber-500/30' : 'shadow-emerald-500/30';

    return (
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className={`h-full rounded-full ${color} shadow-lg ${glow}`}
            />
        </div>
    );
}

function MiniChart({ data, trend }: { data: number[]; trend: 'up' | 'down' | 'flat' }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
        <div className="flex items-end gap-[2px] h-8">
            {data.map((v, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${((v - min) / range) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className={`w-1.5 rounded-full min-h-[2px] ${trend === 'up' ? 'bg-emerald-500' : trend === 'down' ? 'bg-red-500' : 'bg-white/30'
                        } ${i === data.length - 1 ? 'opacity-100' : 'opacity-50'}`}
                />
            ))}
        </div>
    );
}

export default function PromoterPage() {
    const [selectedEvent, setSelectedEvent] = useState(events[0]);

    // Simulated daily sales data
    const salesData = [12, 18, 25, 22, 30, 45, 62, 55, 70, 88, 95, 110, 105, 120];
    const revenueData = [1500, 2300, 3200, 2800, 3800, 5700, 7800, 6900, 8800, 11000, 12000, 14000, 13200, 15200];

    const fillRate = Math.round((selectedEvent.ticketsSold / selectedEvent.totalCapacity) * 100);

    return (
        <div className="min-h-screen bg-velo-bg-deep relative overflow-hidden">
            <div className="absolute inset-0 mesh-background pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-3 mb-3">
                        <BarChart3 size={18} className="text-velo-cyan" />
                        <span className="text-xs font-bold text-velo-cyan uppercase tracking-[0.15em]">Promoter Intelligence</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Demand <span className="gradient-text">Forecasting</span>
                    </h1>
                    <p className="text-lg text-white/50">
                        AI-powered demand predictions, pricing insights, and marketing recommendations.
                    </p>
                </motion.div>

                {/* Event Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8 flex gap-3 overflow-x-auto pb-2"
                >
                    {events.map(ev => (
                        <button
                            key={ev.id}
                            onClick={() => setSelectedEvent(ev)}
                            className={`flex-shrink-0 px-5 py-3 rounded-xl border text-sm font-medium transition-all ${selectedEvent.id === ev.id
                                    ? 'bg-velo-violet/10 border-velo-violet/40 text-velo-violet'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20'
                                }`}
                        >
                            {ev.name}
                        </button>
                    ))}
                </motion.div>

                {/* KPI Row */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Tickets Sold', value: selectedEvent.ticketsSold.toLocaleString(), sub: `of ${selectedEvent.totalCapacity.toLocaleString()}`, icon: Users, color: 'text-blue-400' },
                        { label: 'Revenue', value: `£${(selectedEvent.revenue / 1000).toFixed(0)}K`, sub: '', icon: DollarSign, color: 'text-emerald-400' },
                        { label: 'Fill Rate', value: `${fillRate}%`, sub: selectedEvent.trend === 'up' ? '↑ Trending up' : '↓ Slowing', icon: TrendingUp, color: 'text-amber-400' },
                        { label: 'Demand Score', value: selectedEvent.demandScore.toString(), sub: selectedEvent.predictedDemand, icon: Zap, color: 'text-red-400' },
                    ].map((kpi, i) => (
                        <motion.div
                            key={kpi.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.05 }}
                            className="glass-card rounded-2xl p-5"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <kpi.icon size={18} className={kpi.color} />
                                <MiniChart data={salesData.slice(0, 7 + i * 2)} trend={selectedEvent.trend} />
                            </div>
                            <p className="text-2xl font-bold text-white">{kpi.value}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{kpi.label}</p>
                            {kpi.sub && <p className="text-[10px] text-white/30 mt-0.5">{kpi.sub}</p>}
                        </motion.div>
                    ))}
                </div>

                {/* Main Grid */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Demand Curve (left 2/3) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 glass-card rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <TrendingUp size={16} className="text-velo-violet" />
                                Sales Velocity
                            </h3>
                            <span className="text-[10px] text-white/30 uppercase tracking-wider">Last 14 Days</span>
                        </div>

                        {/* Bar Chart */}
                        <div className="flex items-end gap-1.5 h-32 mb-4">
                            {salesData.map((v, i) => {
                                const maxVal = Math.max(...salesData);
                                const height = (v / maxVal) * 100;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ delay: 0.3 + i * 0.04, duration: 0.5 }}
                                        className="flex-1 rounded-t-md bg-gradient-to-t from-velo-violet/60 to-velo-indigo/80 hover:from-velo-violet hover:to-velo-indigo transition-colors cursor-pointer relative group"
                                    >
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[9px] px-2 py-1 rounded whitespace-nowrap">
                                            {v} tickets
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between text-[9px] text-white/20">
                            <span>Feb 1</span>
                            <span>Feb 7</span>
                            <span>Feb 14</span>
                        </div>

                        {/* Demand Bar */}
                        <div className="mt-6 pt-6 border-t border-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-white/50">Demand Intensity</span>
                                <span className={`text-xs font-bold ${selectedEvent.demandScore > 80 ? 'text-red-400' : selectedEvent.demandScore > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                    {selectedEvent.predictedDemand}
                                </span>
                            </div>
                            <DemandBar score={selectedEvent.demandScore} />
                        </div>
                    </motion.div>

                    {/* Pricing Insight (right 1/3) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card rounded-2xl p-6"
                    >
                        <h3 className="font-bold text-white flex items-center gap-2 mb-6">
                            <DollarSign size={16} className="text-emerald-400" />
                            Pricing Engine
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Current Price</p>
                                <p className="text-3xl font-bold text-white">£{selectedEvent.currentPrice}</p>
                            </div>

                            <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                                <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold mb-1">AI Optimal Price</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-emerald-400">£{selectedEvent.optimalPrice}</p>
                                    {selectedEvent.optimalPrice > selectedEvent.currentPrice ? (
                                        <ArrowUpRight size={18} className="text-emerald-400" />
                                    ) : (
                                        <ArrowDownRight size={18} className="text-red-400" />
                                    )}
                                </div>
                                <p className="text-[10px] text-white/40 mt-1">
                                    {selectedEvent.optimalPrice > selectedEvent.currentPrice
                                        ? `+£${selectedEvent.optimalPrice - selectedEvent.currentPrice} potential revenue per ticket`
                                        : `Consider lowering by £${selectedEvent.currentPrice - selectedEvent.optimalPrice}`
                                    }
                                </p>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/50">Peak Demand Day</span>
                                    <span className="text-xs font-bold text-white">{selectedEvent.peakDay}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/50">Core Audience</span>
                                    <span className="text-xs font-bold text-white">{selectedEvent.audienceAge}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/50">Projected Sellout</span>
                                    <span className="text-xs font-bold text-amber-400">
                                        {fillRate > 85 ? '2-3 days' : fillRate > 60 ? '1-2 weeks' : '3+ weeks'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Marketing Tips */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                >
                    <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                        <Sparkles size={16} className="text-amber-400" />
                        AI Marketing Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {marketingTips.map((tip, i) => (
                            <motion.div
                                key={tip.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 + i * 0.05 }}
                                className="glass-card-hover rounded-2xl p-5 cursor-pointer"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-xl bg-velo-violet/10 flex items-center justify-center text-velo-violet">
                                        <tip.icon size={18} />
                                    </div>
                                    <h4 className="font-bold text-white text-sm">{tip.title}</h4>
                                </div>
                                <p className="text-xs text-white/50 leading-relaxed mb-3">{tip.description}</p>
                                <div className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md w-fit font-medium">
                                    Est. Impact: {tip.impact}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
