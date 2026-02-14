"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Clock, MapPin, Navigation, Cloud, Sun, CloudRain, Wind,
    Utensils, Car, Zap, Sparkles, ChevronRight, Shield,
    Umbrella, ParkingCircle, Music, ExternalLink, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import HapticButton from '../../components/HapticButton';

/* ─── Mock Event Data ─── */
const upcomingEvent = {
    name: 'Daft Punk 2026',
    venue: 'The Sphere, London',
    date: 'Mar 15, 2026',
    time: '20:00',
    gate: 'A3',
    section: 'Floor Standing',
    ticketId: 'VLO-2026-DP-8847',
};

/* ─── Timeline Steps ─── */
const timelineSteps = [
    {
        id: 1,
        time: '16:00',
        label: '4 Hours Before',
        title: 'Pre-Game Plan',
        description: 'Weather check complete. Light jacket recommended — 17°C expected at showtime.',
        icon: Cloud,
        color: 'from-blue-500 to-cyan-500',
        status: 'complete' as const,
    },
    {
        id: 2,
        time: '17:30',
        label: '2.5 Hours Before',
        title: 'Dinner Reservation',
        description: 'Table for 2 at The Glass Bistro — 8 min walk from venue. Velo member discount applied.',
        icon: Utensils,
        color: 'from-amber-500 to-orange-500',
        status: 'complete' as const,
    },
    {
        id: 3,
        time: '18:45',
        label: '1.25 Hours Before',
        title: 'Travel Alert',
        description: 'Moderate traffic detected. Uber ride estimated at 28 min. Book now to arrive by 19:15.',
        icon: Car,
        color: 'from-velo-violet to-velo-indigo',
        status: 'active' as const,
    },
    {
        id: 4,
        time: '19:15',
        label: '45 Min Before',
        title: 'Venue Arrival',
        description: 'Gate A3 opens at 19:00. Priority entry lane for Velo+ members. Show QR on arrival.',
        icon: MapPin,
        color: 'from-emerald-500 to-teal-500',
        status: 'upcoming' as const,
    },
    {
        id: 5,
        time: '20:00',
        label: 'Showtime',
        title: 'Enjoy the Show!',
        description: 'Doors close. Your section: Floor Standing. Nearest bar: West Terrace Lounge.',
        icon: Music,
        color: 'from-pink-500 to-rose-500',
        status: 'upcoming' as const,
    },
];

/* ─── Nearby Suggestions ─── */
const nearbySpots = [
    { name: 'The Glass Bistro', type: 'Restaurant', distance: '8 min walk', rating: 4.8, deal: '15% Velo discount' },
    { name: 'Sphere Parking B', type: 'Parking', distance: '3 min walk', deal: 'Pre-book £12' },
    { name: 'The Lyric Bar', type: 'Bar', distance: '4 min walk', rating: 4.6, deal: '$5 cocktails until 19:30' },
];

export default function ConciergePage() {
    const [expandedStep, setExpandedStep] = useState(3);

    const WeatherIcon = Sun;
    const weatherTemp = 17;
    const weatherCondition = 'Clear skies, light breeze';

    return (
        <div className="min-h-screen bg-velo-bg-deep relative overflow-hidden">
            {/* Mesh Background */}
            <div className="absolute inset-0 mesh-background pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-8">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse relative">
                            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40" />
                        </div>
                        <span className="text-xs font-bold text-green-500 uppercase tracking-[0.15em]">Live Concierge Active</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Your Evening <span className="gradient-text">Orchestrated</span>
                    </h1>
                    <p className="text-lg text-white/50">
                        AI-powered pre-event briefing for <span className="text-white font-medium">{upcomingEvent.name}</span>
                    </p>
                </motion.div>

                {/* Event Quick Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8 glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <div>
                        <p className="text-xl font-bold text-white">{upcomingEvent.name}</p>
                        <p className="text-sm text-white/50">{upcomingEvent.venue} • {upcomingEvent.date}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-[10px] text-white/40 uppercase tracking-wider">Gate</p>
                            <p className="text-lg font-bold text-velo-cyan font-mono">{upcomingEvent.gate}</p>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10" />
                        <div className="text-center">
                            <p className="text-[10px] text-white/40 uppercase tracking-wider">Section</p>
                            <p className="text-lg font-bold text-white font-mono">{upcomingEvent.section}</p>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10" />
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                            <Clock size={16} className="text-velo-violet" />
                            <span className="text-sm font-mono text-white font-bold">T-1h 15m</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Timeline Column */}
                    <div className="md:col-span-2">
                        <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Zap size={14} className="text-velo-violet" />
                            Evening Timeline
                        </h2>

                        <div className="space-y-0 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-5 top-6 bottom-6 w-[1px] bg-gradient-to-b from-velo-violet/40 via-white/10 to-transparent" />

                            {timelineSteps.map((step, i) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 * i }}
                                    className={`relative pl-14 py-4 cursor-pointer group ${step.status === 'active' ? '' : 'opacity-70 hover:opacity-100 transition-opacity'}`}
                                    onClick={() => setExpandedStep(step.id)}
                                >
                                    {/* Dot */}
                                    <div className={`absolute left-3 top-6 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all
                                        ${step.status === 'complete' ? 'bg-green-500/20 border-green-500' :
                                            step.status === 'active' ? 'bg-velo-violet/30 border-velo-violet shadow-md shadow-velo-violet/30' :
                                                'bg-white/5 border-white/20'}`}
                                    >
                                        {step.status === 'complete' && (
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                        )}
                                        {step.status === 'active' && (
                                            <div className="w-2 h-2 rounded-full bg-velo-violet animate-pulse" />
                                        )}
                                    </div>

                                    {/* Card */}
                                    <div className={`glass-card rounded-2xl p-5 transition-all duration-300
                                        ${step.status === 'active' ? 'border-velo-violet/30 shadow-lg shadow-velo-violet/10' : ''}`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                                                    <step.icon size={18} className="text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-sm">{step.title}</p>
                                                    <p className="text-[10px] text-white/40 uppercase tracking-wider">{step.label} • {step.time}</p>
                                                </div>
                                            </div>
                                            {step.status === 'active' && (
                                                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-velo-violet/20 text-velo-violet uppercase tracking-wider">Now</span>
                                            )}
                                        </div>

                                        {expandedStep === step.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="mt-3 pt-3 border-t border-white/5"
                                            >
                                                <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                                                {step.status === 'active' && (
                                                    <HapticButton
                                                        variant="primary"
                                                        className="mt-4 !py-3 !px-6 !rounded-xl !text-sm flex items-center gap-2"
                                                        onClick={() => { }}
                                                    >
                                                        Book Uber Now <ChevronRight size={14} />
                                                    </HapticButton>
                                                )}
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Weather Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Cloud size={14} className="text-blue-400" />
                                Weather
                            </h2>
                            <div className="glass-card rounded-2xl p-5">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-4xl font-bold text-white">{weatherTemp}°</div>
                                    <div>
                                        <WeatherIcon size={24} className="text-amber-400 mb-1" />
                                        <p className="text-xs text-white/50">{weatherCondition}</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                                    <p className="text-xs text-blue-300 flex items-center gap-2">
                                        <Umbrella size={12} />
                                        Light jacket recommended for the evening
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Nearby Spots */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <MapPin size={14} className="text-velo-rose" />
                                Nearby
                            </h2>
                            <div className="space-y-3">
                                {nearbySpots.map((spot, i) => (
                                    <div key={i} className="glass-card rounded-xl p-4 hover:border-white/15 transition-all cursor-pointer group">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-white group-hover:text-velo-violet transition-colors">{spot.name}</p>
                                                <p className="text-[10px] text-white/40 mt-0.5">{spot.type} • {spot.distance}</p>
                                            </div>
                                            <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors mt-1" />
                                        </div>
                                        {spot.deal && (
                                            <div className="mt-2 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md w-fit font-medium">
                                                {spot.deal}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Sparkles size={14} className="text-amber-400" />
                                Quick Actions
                            </h2>
                            <div className="space-y-2">
                                <button className="w-full glass-card rounded-xl p-4 flex items-center gap-3 hover:border-white/15 transition-all group">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                        <ParkingCircle size={16} />
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="text-sm font-medium text-white">Pre-Book Parking</p>
                                        <p className="text-[10px] text-white/40">From £12 • Sphere Parking B</p>
                                    </div>
                                    <ChevronRight size={14} className="text-white/20 group-hover:text-white/50" />
                                </button>
                                <button className="w-full glass-card rounded-xl p-4 flex items-center gap-3 hover:border-white/15 transition-all group">
                                    <div className="w-8 h-8 rounded-lg bg-velo-violet/10 flex items-center justify-center text-velo-violet">
                                        <Shield size={16} />
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="text-sm font-medium text-white">View Digital Ticket</p>
                                        <p className="text-[10px] text-white/40">{upcomingEvent.ticketId}</p>
                                    </div>
                                    <ChevronRight size={14} className="text-white/20 group-hover:text-white/50" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
