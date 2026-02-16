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

// Retrieve event by ID from universal data source
const getEvent = (id: string) => {
    const event = realEvents.find(e => e.id === Number(id));
    if (event) return event;

    // Fallback
    return {
        id: Number(id),
        title: 'Event Not Found',
        venue: 'Unknown Venue',
        date: 'TBD',
        time: 'TBD',
        price: 0,
        soldPercentage: 0,
        image: 'https://images.unsplash.com/photo-1470229722913-7ea049c42081?q=80&w=2940&auto=format&fit=crop',
        description: 'This event detail is currently unavailable.',
        tag: 'SOLD OUT',
        category: 'Event',
        tagColor: 'bg-zinc-600',
        ageRestriction: 'All Ages',
    };
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
    const id = params.id as string;
    const event = getEvent(id);

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
                        <SeatingChartDiagram soldPercentage={event.soldPercentage} />
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] transition-colors">
                            <Shield className="w-10 h-10 text-velo-emerald mb-6" />
                            <h3 className="font-bold text-xl mb-3 text-white">Authenticated Tickets</h3>
                            <p className="text-velo-text-secondary">Every ticket is cryptographically verified on the blockchain to prevent fraud.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] transition-colors">
                            <Zap className="w-10 h-10 text-velo-cyan mb-6" />
                            <h3 className="font-bold text-xl mb-3 text-white">Instant Transfer</h3>
                            <p className="text-velo-text-secondary">Send tickets to friends instantly via our secure peer-to-peer transfer system.</p>
                        </div>
                    </section>
                </div>

            </div>

            {/* Event Orchestrator Sidebar */}
            <div className="relative">
                <div className="sticky top-32 space-y-8">
                    {/* Booking Card */}
                    <div className="p-8 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                        {/* ... Existing Booking Card Content ... */}
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <p className="text-sm text-velo-text-muted mb-2 font-medium tracking-wide uppercase">Starting from</p>
                                <div className="text-5xl font-bold text-white tracking-tight">£{event.price}</div>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/20">
                                Best Price
                            </div>
                        </div>

                        <div className="space-y-5 mb-10">
                            <div className="flex items-center gap-3 text-sm text-white/80">
                                <Lock size={18} className="text-velo-emerald" /> Secure checkout powered by Stripe
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/80">
                                <Ticket size={18} className="text-velo-violet" /> Instant digital delivery
                            </div>
                        </div>

                        <button
                            onClick={() => openBooking(event as any, { skipDetails: true })}
                            className="w-full bg-white text-black hover:bg-white/90 font-bold py-5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
                        >
                            <Ticket size={22} />
                            Book Select Seats
                        </button>

                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <p className="text-xs text-velo-text-muted mb-2">Powered by Velo Trust Engine™</p>
                        </div>
                    </div>

                    {/* Nearby Activities */}
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md">
                        <NearbyActivities eventName={event.title} venueName={event.venue} ageRestriction={event.ageRestriction} />
                    </div>
                </div>
            </div>
        </div>
    );
}
