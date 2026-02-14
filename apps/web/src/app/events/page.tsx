"use client";

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Search, Ticket, Sparkles } from 'lucide-react';
import { veloBus } from '../../lib/veloBus';
import WaitlistButton from '../../components/WaitlistButton';
import EventCard from '../../components/EventCard';

const categories = ['All', 'Concerts', 'Sports', 'Theatre', 'Comedy', 'Festivals', 'Exhibitions'];

const tagColors: Record<string, string> = {
    'TONIGHT': 'bg-velo-rose',
    'SELLING FAST': 'bg-amber-500',
    'VIP AVAILABLE': 'bg-velo-violet',
    'AWARD WINNING': 'bg-velo-cyan',
    'LIMITED': 'bg-orange-500',
    'NEW': 'bg-velo-emerald',
    'PREMIUM': 'bg-indigo-500',
    'POPULAR': 'bg-blue-500',
    'SOLD OUT': 'bg-zinc-600',
};

const allEvents = [
    {
        id: 1,
        title: 'Daft Punk 2026',
        venue: 'The Sphere, London',
        date: 'Mar 15, 2026',
        time: '20:00',
        price: 128,
        category: 'Concerts',
        image: 'https://images.unsplash.com/photo-1470229722913-7ea049c42081?q=80&w=800&auto=format&fit=crop',
        tag: 'TONIGHT',
        soldPercentage: 87,
    },
    {
        id: 2,
        title: 'Coldplay: World Tour',
        venue: 'Wembley Stadium',
        date: 'Apr 22, 2026',
        time: '19:30',
        price: 95,
        category: 'Concerts',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop',
        tag: 'SELLING FAST',
        soldPercentage: 72,
    },
    {
        id: 3,
        title: 'Formula 1: British GP',
        venue: 'Silverstone Circuit',
        date: 'Jul 6, 2026',
        time: '14:00',
        price: 250,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?q=80&w=800&auto=format&fit=crop',
        tag: 'VIP AVAILABLE',
        soldPercentage: 45,
    },
    {
        id: 4,
        title: 'Hamilton: The Musical',
        venue: 'Victoria Palace Theatre',
        date: 'May 10, 2026',
        time: '19:30',
        price: 65,
        category: 'Theatre',
        image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=800&auto=format&fit=crop',
        tag: 'AWARD WINNING',
        soldPercentage: 91,
    },
    {
        id: 5,
        title: 'Glastonbury Festival',
        venue: 'Worthy Farm, Somerset',
        date: 'Jun 25, 2026',
        time: '12:00',
        price: 340,
        category: 'Festivals',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',
        tag: 'LIMITED',
        soldPercentage: 95,
    },
    {
        id: 6,
        title: 'Kevin Hart: Live',
        venue: 'The O2 Arena',
        date: 'Aug 15, 2026',
        time: '20:00',
        price: 55,
        category: 'Comedy',
        image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=800&auto=format&fit=crop',
        tag: 'NEW',
        soldPercentage: 18,
    },
    {
        id: 7,
        title: 'Wimbledon Finals',
        venue: 'All England Club',
        date: 'Jul 14, 2026',
        time: '14:00',
        price: 180,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=800&auto=format&fit=crop',
        tag: 'PREMIUM',
        soldPercentage: 68,
    },
    {
        id: 8,
        title: 'Immersive Van Gogh',
        venue: 'Frameless, London',
        date: 'Ongoing',
        time: '10:00–21:00',
        price: 25,
        category: 'Exhibitions',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
        tag: 'POPULAR',
        soldPercentage: 55,
    },
    {
        id: 9,
        title: 'Taylor Swift: Eras Tour',
        venue: 'Wembley Stadium',
        date: 'Sep 5, 2026',
        time: '18:00',
        price: 110,
        category: 'Concerts',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop',
        tag: 'SOLD OUT',
        soldPercentage: 100,
    },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}



import InterestSelector from '../../components/InterestSelector';
import RecommendedEvents from '../../components/RecommendedEvents';

export default function EventsPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Time Travel Debug State
    const [daysShift, setDaysShift] = useState(0);
    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() + daysShift);

    const filteredEvents = allEvents.filter((event) => {
        const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.venue.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pt-28 pb-20">
            {/* Debug Controls */}
            {/* ... keeping debug controls as they are ... */}

            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center">
                            <Ticket className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-velo-violet">Browse & Book</div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Events</h1>
                    <p className="text-velo-text-secondary text-lg max-w-lg mb-8">Browse upcoming events, from world-class concerts to immersive exhibitions.</p>

                    {/* Interest Selector */}
                    <InterestSelector />
                </motion.div>
            </div>

            {/* Recommended Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <RecommendedEvents allEvents={allEvents} mockDate={mockDate} />
            </div>

            {/* Search & Filters */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="flex flex-col md:flex-row gap-4 items-start md:items-center"
                >
                    {/* Search */}
                    <div className="relative flex-1 w-full md:max-w-sm">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-velo-text-muted" />
                        <input
                            type="text"
                            placeholder="Search events or venues..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-velo-text-muted text-sm focus:outline-none focus:border-velo-violet/50 focus:ring-1 focus:ring-velo-violet/30 transition-all"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex gap-2 flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                    ? 'text-white'
                                    : 'bg-white/[0.04] text-velo-text-secondary hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
                                    }`}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-velo-violet rounded-full shadow-lg shadow-velo-violet/25"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Results count */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-velo-text-muted mt-4"
                >
                    Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
                </motion.p>
            </div>

            {/* Events Grid */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <AnimatePresence mode="wait">
                    {filteredEvents.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            <Sparkles className="w-12 h-12 text-velo-text-muted mx-auto mb-4" />
                            <p className="text-velo-text-muted text-lg mb-2">No events found</p>
                            <p className="text-velo-text-muted text-sm">Try adjusting your search or filters.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeCategory + searchQuery}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredEvents.map((event, i) => (
                                <Reveal key={event.id} delay={i * 0.04}>
                                    <EventCard
                                        event={event}
                                        mockCurrentDate={mockDate}
                                    />
                                </Reveal>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
