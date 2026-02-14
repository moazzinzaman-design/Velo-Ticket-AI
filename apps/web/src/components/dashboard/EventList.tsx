"use client";

import { motion } from 'framer-motion';
import { MoreVertical, Edit, Pause, Eye, MapPin, Calendar, Users } from 'lucide-react';
import { useState } from 'react';

const EVENTS = [
    {
        id: 1,
        title: 'Daft Punk 2026',
        venue: 'The Sphere, London',
        date: 'Mar 15, 2026',
        sold: 14502,
        capacity: 18000,
        revenue: 1856256,
        status: 'Active',
        trend: '+12%',
        image: 'https://images.unsplash.com/photo-1470229722913-7ea049c42081?q=80&w=200&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Coldplay: World Tour',
        venue: 'Wembley Stadium',
        date: 'Apr 22, 2026',
        sold: 68400,
        capacity: 90000,
        revenue: 6498000,
        status: 'Selling Fast',
        trend: '+45%',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=200&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Formula 1: British GP',
        venue: 'Silverstone Circuit',
        date: 'Jul 6, 2026',
        sold: 3200,
        capacity: 140000,
        revenue: 800000,
        status: 'Just Launch',
        trend: 'New',
        image: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?q=80&w=200&auto=format&fit=crop'
    }
];

export default function EventList() {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    return (
        <div className="bg-velo-bg-card border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-bold text-lg text-white">Active Events</h3>
                <button className="text-sm text-velo-cyber hover:text-white transition-colors">View All</button>
            </div>

            <div className="divide-y divide-white/5">
                {EVENTS.map((event) => (
                    <div key={event.id} className="p-4 hover:bg-white/[0.02] transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-white truncate">{event.title}</h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${event.status === 'Active' ? 'bg-green-500/10 text-green-400' :
                                            event.status === 'Selling Fast' ? 'bg-amber-500/10 text-amber-400' :
                                                'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {event.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-velo-text-muted">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                                    <span className="flex items-center gap-1"><MapPin size={12} /> {event.venue}</span>
                                </div>
                            </div>

                            <div className="hidden md:block text-right">
                                <div className="text-sm font-bold text-white">
                                    {event.sold.toLocaleString()} <span className="text-velo-text-muted font-normal">/ {event.capacity.toLocaleString()}</span>
                                </div>
                                <div className="w-24 h-1.5 bg-white/10 rounded-full mt-1 ml-auto overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${event.sold / event.capacity > 0.8 ? 'bg-amber-500' : 'bg-velo-violet'}`}
                                        style={{ width: `${(event.sold / event.capacity) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="hidden sm:block text-right min-w-[100px]">
                                <div className="text-sm font-bold text-white">£{(event.revenue / 1000000).toFixed(2)}m</div>
                                <div className="text-xs text-green-400">{event.trend}</div>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setActiveMenu(activeMenu === event.id ? null : event.id)}
                                    className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-velo-text-muted hover:text-white transition-colors"
                                >
                                    <MoreVertical size={16} />
                                </button>

                                {activeMenu === event.id && (
                                    <div className="absolute right-0 top-10 w-40 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl z-10 overflow-hidden py-1">
                                        <button className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 flex items-center gap-2">
                                            <Edit size={14} /> Edit Details
                                        </button>
                                        <button className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 flex items-center gap-2">
                                            <Eye size={14} /> View Public
                                        </button>
                                        <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/10 flex items-center gap-2">
                                            <Pause size={14} /> Pause Sales
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-white/[0.02] border-t border-white/5 text-center">
                <button className="text-xs font-semibold text-velo-text-muted hover:text-white transition-colors">
                    + Create New Event
                </button>
            </div>
        </div>
    );
}
