"use client";

import { useEffect, useState } from 'react';
import { MapPin, Coffee, Beer, Navigation, Sparkles, Loader2, Train, Bed, Ticket, Music, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { RealEvent } from '../../data/realEvents';
import { useRouter } from 'next/navigation';

export default function NearbyActivities({ eventName, venueName, lat, lng }: { eventName: string, venueName: string, lat?: number, lng?: number }) {
    const [nearbyEvents, setNearbyEvents] = useState<RealEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchNearby = async () => {
            if (!lat || !lng) {
                setLoading(false);
                return;
            }

            try {
                // Fetch events within 2 miles
                const res = await fetch(`/api/events?lat=${lat}&lng=${lng}&radius=2&limit=4`);
                const data = await res.json();

                if (data.events && Array.isArray(data.events)) {
                    // Filter out the current event if possible (by title similarity or ID if available)
                    const filtered = data.events.filter((e: RealEvent) => e.title !== eventName);
                    setNearbyEvents(filtered);
                }
            } catch (err) {
                console.error('Failed to fetch nearby events', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNearby();
    }, [lat, lng, eventName]);

    const getIcon = (category: string) => {
        const cat = (category || '').toLowerCase();
        if (cat.includes('music') || cat.includes('concert')) return <Music className="text-velo-violet" size={20} />;
        if (cat.includes('sport')) return <Ticket className="text-velo-cyan" size={20} />;
        if (cat.includes('theatre') || cat.includes('art')) return <Sparkles className="text-velo-rose" size={20} />;
        return <Calendar className="text-white" size={20} />;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="text-velo-cyan" size={20} /> Nearby Experiences
                </h3>
            </div>

            <p className="text-velo-text-secondary text-sm">
                Other live events happening near {venueName}.
            </p>

            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-white/20" />
                </div>
            ) : nearbyEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {nearbyEvents.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => router.push(`/events/${item.id}`)}
                            className="group p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-velo-cyan/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                                    {getIcon(item.category)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-white text-base group-hover:text-velo-cyan transition-colors truncate">{item.title}</h4>
                                    <p className="text-xs text-velo-text-secondary mt-1 flex items-center gap-2">
                                        <span>{item.date} • {item.time}</span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 border border-white/10 px-1.5 py-0.5 rounded-md">{item.category}</span>
                                    </p>
                                    <p className="text-xs text-white/60 mt-1 truncate">{item.venue}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/5">
                    <Navigation className="mx-auto text-white/20 mb-3" size={32} />
                    <p className="text-white/60 text-sm">No other events found nearby.</p>
                    <p className="text-velo-text-secondary text-xs mt-1">Try exploring the full map.</p>
                </div>
            )}

            {/* Map Placeholder */}
            <div
                onClick={() => {
                    import('../../lib/veloBus').then(({ veloBus }) => {
                        veloBus.emit('open-agent', { message: `Show me an interactive map of ${venueName} and nearby spots.` });
                    });
                }}
                className="w-full h-40 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer mt-2 shadow-inner"
            >
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-0.1276,51.5074,13,0/600x300?access_token=pk.mock')] bg-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="z-10 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-velo-violet flex items-center justify-center shadow-lg shadow-velo-violet/40 group-hover:scale-110 transition-transform">
                        <MapPin size={24} className="text-white" />
                    </div>
                    <span className="text-sm font-bold text-white drop-shadow-md">Explore Interactive Map</span>
                </div>
            </div>

            <button
                onClick={() => {
                    import('../../lib/veloBus').then(({ veloBus }) => {
                        veloBus.emit('open-agent', { message: `Build a full evening itinerary for ${eventName}.` });
                    });
                }}
                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-velo-indigo to-velo-violet hover:from-velo-violet hover:to-velo-indigo text-white font-bold shadow-lg shadow-velo-violet/20 hover:shadow-velo-violet/40 transition-all active:scale-98 flex items-center justify-center gap-2"
            >
                <Sparkles size={18} /> Plan Full Itinerary
            </button>
        </div>
    );
}
