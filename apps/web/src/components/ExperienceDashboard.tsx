"use client";

import { motion } from 'framer-motion';
import { MapPin, Navigation, Cloud, Sun, CloudRain, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { useConcierge } from '../hooks/useConcierge';
import type { Ticket } from '../types/ticket';
import HapticButton from './HapticButton';

interface ExperienceDashboardProps {
    ticket: Ticket;
    onEntryClick: () => void;
}

export default function ExperienceDashboard({ ticket, onEntryClick }: ExperienceDashboardProps) {
    const concierge = useConcierge(ticket);

    if (!concierge) return null;

    const WeatherIcon = {
        sunny: Sun,
        rainy: CloudRain,
        cloudy: Cloud,
        windy: Cloud
    }[concierge.weather.condition];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-gradient-to-br from-velo-bg-card to-black rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl mb-12"
        >
            {/* Header / Event Summary */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Live Experience • Starting Soon</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{ticket.event_title}</h2>
                    <p className="text-sm text-velo-text-secondary">{ticket.venue_name}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-velo-text-muted uppercase tracking-wider mb-1">Gate {ticket.gate || 'A'}</p>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                        <Clock size={14} className="text-velo-cyan" />
                        <span className="text-sm font-mono text-white">T-1h 58m</span>
                    </div>
                </div>
            </div>

            {/* Orchestration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Travel Column */}
                <div className="p-8 border-r border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <Navigation size={20} />
                        </div>
                        <h3 className="font-bold text-white">Travel Logic</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div>
                                <p className="text-xs text-white/40 mb-1">Est. Travel Time</p>
                                <p className="text-xl font-bold text-white tracking-tight">{concierge.travelTime} min</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-white/40 mb-1">Traffic</p>
                                <p className="text-sm text-yellow-500 font-bold">Moderate</p>
                            </div>
                        </div>

                        <HapticButton
                            variant="primary"
                            className="w-full !py-4 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 border-none group"
                            onClick={() => window.open('https://uber.com', '_blank')}
                        >
                            <span className="font-bold">Order Uber to Venue</span>
                            <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </HapticButton>
                    </div>
                </div>

                {/* Weather & Suggestions */}
                <div className="p-8 bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-velo-violet/10 flex items-center justify-center text-velo-violet">
                            <WeatherIcon size={20} />
                        </div>
                        <h3 className="font-bold text-white">Concierge Watch</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold text-white">{concierge.weather.temp}°</div>
                            <div className="h-8 w-[1px] bg-white/10" />
                            <div className="text-sm text-white/80 leading-snug">
                                {concierge.weather.suggestion}
                            </div>
                        </div>

                        <div className="p-4 bg-velo-violet/5 rounded-2xl border border-velo-violet/10 flex items-start gap-3">
                            <MapPin size={18} className="text-velo-violet mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-velo-violet uppercase tracking-wider mb-1">Local Rec</p>
                                <p className="text-xs text-white/60">"The Lyric" bar nearby has $5 Velo-member cocktails until 19:30.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Entry Action */}
            <div className="p-6 bg-gradient-to-t from-black to-transparent">
                <HapticButton
                    variant="glass"
                    className="w-full !py-5 rounded-2xl flex items-center justify-center gap-3 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30 transition-all group"
                    onClick={onEntryClick}
                >
                    <ShieldCheck size={24} className="text-velo-cyan group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-bold text-white">Tap to Authenticate & Enter</span>
                </HapticButton>
                <p className="text-center text-[10px] text-white/30 mt-4 uppercase tracking-[0.2em]"> Powered by Velo Secure Identity (ZK-SNARK)</p>
            </div>
        </motion.div>
    );
}
