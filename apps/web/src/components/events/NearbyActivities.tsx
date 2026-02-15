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
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-velo-cyan" size={20} /> Event Orchestrator
            </h3>
            <p className="text-velo-text-secondary text-sm">
                AI-curated recommendations for your night out at {venueName}.
            </p>

            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-white/20" />
                </div>
            ) : (
                <div className="space-y-4">
                    {insights.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex gap-4"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                {getIcon(item.type)}
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                <p className="text-xs text-velo-text-muted mt-1">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Map Placeholder */}
                    <div className="w-full h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer mt-6">
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-0.1276,51.5074,13,0/600x300?access_token=pk.mock')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition-all" />
                        <div className="z-10 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold text-white">
                            <MapPin size={12} /> Open Interactive Map
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
