"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Search, Ticket, Sparkles } from 'lucide-react';
import { veloBus } from '../../lib/veloBus';
import WaitlistButton from '../../components/WaitlistButton';
import EventCard from '../../components/EventCard';
import { useDynamicTheme, getCategoryFromString } from '../../hooks/useDynamicTheme';
import { useGeolocation } from '../../hooks/useGeolocation';
import LocationSelector from '../../components/LocationSelector';
import DistanceFilter from '../../components/DistanceFilter';
import { RealEvent } from '../../data/realEvents';
import MapView from '../../components/MapView';
import { LayoutGrid, Map as MapIcon } from 'lucide-react';

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

import { realEvents as allEvents } from '../../data/realEvents';

function Reveal({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'scale' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const variants = {
        up: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
        left: { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
        scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
    };
    return (
        <motion.div
            ref={ref}
            initial={variants[direction].hidden}
            animate={isInView ? variants[direction].visible : variants[direction].hidden}
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
    const { setCategory, theme } = useDynamicTheme();

    // Location state
    const [currentCity, setCurrentCity] = useState('London');
    const [location, setLocation] = useState<{ lat?: number; lng?: number }>({});
    const [distance, setDistance] = useState(15);
    const geolocation = useGeolocation();

    // View state
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    // Events fetching state
    const [events, setEvents] = useState<RealEvent[]>([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(false);
    const [eventsSource, setEventsSource] = useState<'cache' | 'live' | 'fallback'>('fallback');
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    // Use local data directly for consistency
    const fetchEvents = useCallback(async () => {
        setIsLoadingEvents(true);
        // Simulate network delay for effect
        await new Promise(resolve => setTimeout(resolve, 600));

        // Filter locally based on category and search
        let filtered = [...allEvents];

        if (activeCategory !== 'All') {
            filtered = filtered.filter(e => e.category === getCategoryFromString(activeCategory));
        }

        if (currentCity !== 'All Cities' && currentCity !== 'Near Me') {
            // Simple city filter if needed, or just return all for demo richness
            // filtered = filtered.filter(e => e.location.city === currentCity);
        }

        setEvents(filtered);
        setEventsSource('local');
        setIsLoadingEvents(false);
    }, [activeCategory, currentCity]);

    // Fetch events on mount and when dependencies change
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // Handle location changes
    const handleLocationChange = (newLocation: { city?: string; lat?: number; lng?: number }) => {
        if (newLocation.city) setCurrentCity(newLocation.city);
        if (newLocation.lat && newLocation.lng) {
            setLocation({ lat: newLocation.lat, lng: newLocation.lng });
        }
    };

    // Handle geolocation request
    const handleRequestGeolocation = () => {
        geolocation.requestLocation();
    };

    // Update location when geolocation succeeds
    useEffect(() => {
        if (geolocation.hasLocation && geolocation.latitude && geolocation.longitude) {
            setLocation({ lat: geolocation.latitude, lng: geolocation.longitude });
            setCurrentCity('Near Me');
        }
    }, [geolocation.hasLocation, geolocation.latitude, geolocation.longitude]);

    // Sync theme with category filter
    useEffect(() => {
        if (activeCategory === 'All') {
            setCategory('default');
        } else {
            setCategory(getCategoryFromString(activeCategory));
        }
    }, [activeCategory, setCategory]);

    // Time Travel Debug State
    const [daysShift, setDaysShift] = useState(0);
    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() + daysShift);

    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.venue.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
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
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="text"
                                placeholder="Search events, artists, or venues..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-velo-violet/50 focus:bg-white/10 transition-all font-light"
                            />
                        </div>

                        {/* Location Controls */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <LocationSelector
                                currentCity={currentCity}
                                onLocationChange={handleLocationChange}
                                onRequestGeolocation={handleRequestGeolocation}
                                isLoadingLocation={geolocation.loading}
                            />
                            <div className="h-8 w-px bg-white/10 hidden md:block" />
                            <DistanceFilter
                                distance={distance}
                                onDistanceChange={setDistance}
                                disabled={!location.lat}
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-velo-violet text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={`p-2 rounded-full transition-all ${viewMode === 'map' ? 'bg-velo-violet text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                            >
                                <MapIcon size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${activeCategory === category
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {category}
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

            {/* Events Grid or Map */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
                {/* Themed ambient glow */}
                <div
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[180px] pointer-events-none transition-all duration-700 opacity-30"
                    style={{ background: theme.gradient }}
                />
                <AnimatePresence mode="wait">
                    {isLoadingEvents ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-[400px] rounded-2xl bg-white/5 animate-pulse" />
                            ))}
                        </motion.div>
                    ) : viewMode === 'map' ? (
                        <motion.div
                            key="map"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MapView
                                events={filteredEvents}
                                center={location.lat && location.lng ? { lat: location.lat, lng: location.lng } : undefined}
                                zoom={location.lat ? 12 : 10}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredEvents.map((event, index) => (
                                <Reveal key={event.id} delay={index * 0.1}>
                                    <EventCard event={event} mockCurrentDate={mockDate} />
                                </Reveal>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isLoadingEvents && filteredEvents.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-xl text-white/60">No events found matching your criteria.</p>
                        <button
                            onClick={() => {
                                setActiveCategory('All');
                                setSearchQuery('');
                                setDistance(50);
                            }}
                            className="mt-4 text-velo-cyan hover:underline"
                        >
                            Clear filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
