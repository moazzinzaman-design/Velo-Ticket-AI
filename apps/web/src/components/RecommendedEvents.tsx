"use client";

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useRecommendations } from '../hooks/useRecommendations';
import EventCard from './EventCard';

interface RecommendedEventsProps {
    allEvents: any[];
    mockDate: Date;
}

export default function RecommendedEvents({ allEvents, mockDate }: RecommendedEventsProps) {
    const { interests } = useRecommendations();

    if (interests.length === 0) return null;

    // Mock recommendation logic
    const recommended = allEvents.filter(event => {
        if (interests.includes('Music') && (event.category === 'Concerts' || event.category === 'Festivals')) return true;
        if (interests.includes('Sports') && event.category === 'Sports') return true;
        if (interests.includes('Arts') && (event.category === 'Theatre' || event.category === 'Exhibitions')) return true;
        if (interests.includes('Tech') && event.title.toLowerCase().includes('sphere')) return true; // Sphere is techy
        return false;
    }).slice(0, 4);

    if (recommended.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-velo-violet/20 border border-velo-violet/30">
                        <Sparkles size={16} className="text-velo-violet shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Picked for You</h2>
                </div>
                <button className="text-sm text-velo-text-muted hover:text-white transition-colors flex items-center gap-1 group">
                    View all recommendations <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="flex overflow-x-auto pb-4 gap-6 snap-x snap-mandatory scrollbar-hide -mx-2 px-2">
                {recommended.map((event) => (
                    <motion.div
                        key={event.id}
                        className="snap-start shrink-0 w-[300px] md:w-[350px]"
                        whileHover={{ y: -5 }}
                    >
                        <div className="relative group">
                            {/* AI Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-velo-violet to-velo-cyan rounded-[26px] opacity-20 group-hover:opacity-40 transition-opacity blur shadow-[0_0_20px_rgba(139,92,246,0.2)]" />
                            <EventCard event={event} mockCurrentDate={mockDate} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
