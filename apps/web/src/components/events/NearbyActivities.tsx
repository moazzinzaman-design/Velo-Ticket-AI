"use client";

import { useEffect, useState } from 'react';
import { MapPin, Coffee, Beer, Navigation, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Insight {
    title: string;
    description: string;
    type: 'food' | 'drink' | 'activity';
}

export default function NearbyActivities({ eventName, venueName }: { eventName: string, venueName: string }) {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const res = await fetch('/api/events/insights', {
                    method: 'POST',
                    body: JSON.stringify({ eventName, venueName }),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();
                if (data.insights) setInsights(data.insights);
            } catch (err) {
                console.error(err);
                // Fallback data if API fails
                setInsights([
                    { title: 'The Velo Lounge', description: 'Exclusive pre-show drinks 2 mins away.', type: 'drink' },
                    { title: 'City Burger Co.', description: 'Best rated burger joint for a quick bite.', type: 'food' },
                    { title: 'Central Park', description: 'Relax before the chaos starts.', type: 'activity' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        if (eventName && venueName) {
            fetchInsights();
        }
    }, [eventName, venueName]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'food': return <Coffee className="text-amber-400" size={20} />;
            case 'drink': return <Beer className="text-velo-cyan" size={20} />;
            default: return <Navigation className="text-velo-violet" size={20} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="text-velo-cyan" size={20} /> Event Orchestrator
                </h3>
                <button
                    onClick={() => {
                        import('../../lib/veloBus').then(({ veloBus }) => {
                            veloBus.emit('open-agent', { message: `Plan my night for ${eventName} at ${venueName}. I need dinner reservations and a ride.` });
                        });
                    }}
                    className="px-4 py-2 bg-velo-violet/20 hover:bg-velo-violet/30 border border-velo-violet/50 rounded-xl text-xs font-bold text-velo-violet transition-colors flex items-center gap-2"
                >
                    <Sparkles size={14} /> Plan with AI
                </button>
            </div>

            <p className="text-velo-text-secondary text-sm">
                AI-curated recommendations for your night out at {venueName}.
            </p>

            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-white/20" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {insights.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-velo-cyan/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                                    {getIcon(item.type)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-white text-base group-hover:text-velo-cyan transition-colors">{item.title}</h4>
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 border border-white/10 px-1.5 py-0.5 rounded-md">{item.type}</span>
                                    </div>
                                    <p className="text-sm text-velo-text-secondary leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

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
            )}
        </div>
    );
}
