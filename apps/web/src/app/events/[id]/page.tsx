'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Shield, Sparkles, Ticket, Lock, Zap } from 'lucide-react';
import Image from 'next/image';
import { useBooking } from '../../../context/BookingContext';
import { realEvents } from '../../../data/realEvents';
import ParticleCanvas from '../../../components/ParticleCanvas';
import NearbyActivities from '../../../components/events/NearbyActivities';
import AIEventDetails from '../../../components/events/AIEventDetails';
import { useState, useEffect } from 'react';

// Retrieve event by ID from API
const useEvent = (id: string) => {
    const [event, setEvent] = useState<any>(null); // Using any temporarily to bypass strict type check during transition
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`/api/events/${id}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setEvent(data.event);
            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    return { event, loading, error };
};

/* ─── Seating Chart Visual ─── */
function SeatingChartDiagram({ soldPercentage }: { soldPercentage: number }) {
    return (
        <div className="relative w-full aspect-video rounded-3xl bg-black/20 border border-white/10 overflow-hidden p-8 flex flex-col items-center justify-center">
            {/* Stage */}
            <div className="w-2/3 h-12 bg-white/10 rounded-t-full mb-12 flex items-center justify-center border-t border-x border-white/20 shadow-[0_-10px_40px_rgba(139,92,246,0.3)]">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Stage</span>
            </div>

            {/* Front Sections */}
            <div className="flex gap-2 mb-2 w-full justify-center">
                {[...Array(5)].map((_, i) => (
                    <div key={`front-${i}`} className={`h-16 flex-1 rounded-sm ${i === 2 ? 'bg-velo-rose/40' : 'bg-velo-violet/30'} border border-white/5 mx-0.5`} />
                ))}
            </div>

            {/* Back Sections */}
            <div className="flex gap-2 w-full justify-center">
                {[...Array(7)].map((_, i) => (
                    <div key={`back-${i}`} className={`h-24 flex-1 rounded-sm ${i % 2 === 0 ? 'bg-velo-cyan/20' : 'bg-white/5'} border border-white/5 mx-0.5`} />
                ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex gap-4 text-[10px] text-white/50">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-velo-rose/40" /> VIP</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-velo-violet/30" /> Front</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-velo-cyan/20" /> General</div>
            </div>

            {/* Availability badge */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-green-400">
                {100 - soldPercentage}% Seats Left
            </div>
        </div>
    );
}

/* ─── Main Page Component ─── */
export default function EventDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { openBooking } = useBooking();
    // Unwrap params.id properly as it might be a string or array, though in this route it's a string
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { event, loading, error } = useEvent(id as string);

    if (loading) {
        return (
            <div className="min-h-screen bg-velo-bg-deep flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-velo-cyan"></div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-velo-bg-deep flex flex-col items-center justify-center text-white">
                <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
                <p className="text-velo-text-secondary mb-8">The event you are looking for may have been removed or is unavailable.</p>
                <button
                    onClick={() => router.push('/events')}
                    className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                    Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-velo-bg-deep text-white pb-32">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <ParticleCanvas />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-velo-bg-deep/80 to-velo-bg-deep" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-velo-violet/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-velo-cyan/10 blur-[120px] rounded-full pointer-events-none" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[70vh] w-full">
                <Image
                    src={event.image || ''}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-velo-bg-deep via-velo-bg-deep/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${event.tagColor || 'bg-velo-violet/20'} border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 shadow-lg backdrop-blur-md`}>
                            <Sparkles size={12} />
                            {event.category || 'Live Event'}
                        </div>
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight drop-shadow-2xl max-w-5xl">
                            {event.title}
                        </h1>

                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="flex flex-wrap gap-8 text-white/90 font-medium text-lg">
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-velo-cyan" size={24} />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="text-velo-cyan" size={24} />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-velo-cyan" size={24} />
                                    <span>{event.venue}</span>
                                </div>
                                {event.ageRestriction && (
                                    <div className="flex items-center gap-2">
                                        <Shield className={event.ageRestriction === '18+' ? 'text-velo-rose' : 'text-velo-emerald'} size={24} />
                                        <span className={event.ageRestriction === '18+' ? 'text-velo-rose font-bold' : 'text-white'}>
                                            {event.ageRestriction === '18+' ? '18+ Event' : `Entry: ${event.ageRestriction}`}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    import('../../../lib/veloBus').then(({ veloBus }) => {
                                        veloBus.emit('open-agent', { message: `Tell me more about the ${event.title} event at ${event.venue}.` });
                                    });
                                }}
                                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group"
                            >
                                <Sparkles size={18} className="text-velo-cyan group-hover:rotate-12 transition-transform" />
                                Ask Concierge
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16 mt-12">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-16">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                            About the Experience
                        </h2>
                        <AIEventDetails
                            title={event.title}
                            venue={event.venue}
                            date={event.date}
                            originalDescription={event.description}
                        />
                    </section>

                    {/* Venue Map / Seating Diagram */}
                    <section>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                            <MapPin className="text-velo-violet" /> Venue Map
                        </h2>
                        {event.location?.coordinates?.lat ? (
                            <div className="rounded-3xl overflow-hidden border border-white/10 relative h-[400px] group">
                                <Image
                                    src={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${event.location.coordinates.lng},${event.location.coordinates.lat},15,0/800x400?access_token=pk.mock`}
                                    alt="Venue Map"
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-velo-bg-deep/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
                                        <MapPin className="text-velo-rose animate-bounce" />
                                        <div className="text-left">
                                            <div className="text-sm font-bold text-white">{event.venue}</div>
                                            <div className="text-xs text-velo-text-secondary">{event.location?.address}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-xs px-2 py-1 rounded text-white/50">
                                    Mapbox
                                </div>
                            </div>
                        ) : (
                            <SeatingChartDiagram soldPercentage={event.soldPercentage} />
                        )}
                    </section>

                    {/* ... */}
                </div>

            </div>

            {/* Event Orchestrator Sidebar */}
            <div className="relative">
                <div className="sticky top-32 space-y-8">
                    {/* ... Booking Card ... */}

                    {/* Nearby Activities */}
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md">
                        <NearbyActivities
                            eventName={event.title}
                            venueName={event.venue}
                            lat={event.location?.coordinates?.lat}
                            lng={event.location?.coordinates?.lng}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
