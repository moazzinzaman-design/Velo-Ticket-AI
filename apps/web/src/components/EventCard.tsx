"use client";

import { useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Calendar, Clock, Lock, ShoppingBag, Ticket } from 'lucide-react';
import { veloBus } from '../lib/veloBus';
import WaitlistButton from './WaitlistButton';
import { useDynamicPricing } from '../hooks/useDynamicPricing';
import { useBooking } from '../context/BookingContext';
import PricingTierIndicator from './PricingTierIndicator';
import HolographicCard from './visuals/HolographicCard';

interface Event {
    id: number;
    title: string;
    venue: string;
    date: string;
    time: string;
    price: number;
    category: string;
    image: string;
    tag: string;
    soldPercentage: number;
    hasMerch?: boolean;
    merchItems?: string[];
    resaleTickets?: any[];
    ageRestriction?: string;
}

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
    'MERCH AVAILABLE': 'bg-pink-500',
};

interface EventCardProps {
    event: Event;
    mockCurrentDate?: Date;
}

export default function EventCard({ event, mockCurrentDate }: EventCardProps) {
    // Dynamic Pricing Hook
    const currentYear = new Date().getFullYear();
    const hasYear = event.date.includes(String(currentYear)) || event.date.match(/\d{4}/);
    const dateString = hasYear ? event.date : `${event.date}, ${currentYear}`;
    const eventDateObj = new Date(dateString);
    const { price, tier, daysRemaining, nextTierDate } = useDynamicPricing({
        basePrice: event.price,
        eventDate: eventDateObj,
        mockCurrentDate
    });

    const { openBooking } = useBooking();
    const router = useRouter(); // Import useRouter

    const isSoldOut = event.tag === 'SOLD OUT';

    const handleCardClick = () => {
        router.push(`/events/${event.id}`);
    };

    return (
        <HolographicCard className={`rounded-2xl overflow-hidden h-[450px] cursor-pointer shimmer-border ${isSoldOut ? 'opacity-70' : ''}`}>
            <div
                className="w-full h-full relative"
                onClick={handleCardClick}
            >
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Magic glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-magic-purple/20 via-magic-pink/20 to-magic-blue/20 blur-2xl" />
                </div>

                {/* Tag */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 items-start">
                    <div className={`px-3 py-1.5 rounded-full ${tagColors[event.tag] || 'bg-white/10'} text-[11px] font-bold text-white uppercase tracking-wider`}>
                        {event.tag}
                    </div>
                    {!isSoldOut && (
                        <PricingTierIndicator
                            tier={tier}
                            daysRemaining={daysRemaining}
                            nextTierDate={nextTierDate}
                        />
                    )}
                </div>

                {/* Category + Demand ring */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-lg text-[11px] text-white/70 border border-white/[0.06]">
                        {event.category}
                    </div>
                    <div className="w-10 h-10 relative">
                        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke={event.soldPercentage > 80 ? '#f43f5e' : event.soldPercentage > 50 ? '#f59e0b' : '#10b981'}
                                strokeWidth="2.5"
                                strokeDasharray={`${event.soldPercentage}, 100`}
                                strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[9px] font-bold text-white">{event.soldPercentage}%</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    {/* Merch Badge - independent from main tag */}
                    {/* Merch & Resale Badges */}
                    {(event.hasMerch || event.ageRestriction || (event.resaleTickets && event.resaleTickets.length > 0)) && (
                        <div className="mb-3 flex flex-wrap gap-2">
                            {event.hasMerch && (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 backdrop-blur-sm text-[10px] font-bold text-pink-300 uppercase tracking-wider">
                                    <ShoppingBag size={11} />
                                    <span>Merch Available</span>
                                    {event.merchItems && (
                                        <span className="ml-1 w-4 h-4 rounded-full bg-pink-500/40 flex items-center justify-center text-[9px] text-white">
                                            {event.merchItems.length}
                                        </span>
                                    )}
                                </div>
                            )}
                            {(event.resaleTickets && event.resaleTickets.length > 0) && (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm text-[10px] font-bold text-blue-300 uppercase tracking-wider">
                                    <Ticket size={11} />
                                    <span>Resale Available</span>
                                </div>
                            )}
                            {event.ageRestriction && (
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider ${event.ageRestriction === '18+'
                                    ? 'bg-red-500/20 border border-red-500/30 text-red-300'
                                    : 'bg-green-500/20 border border-green-500/30 text-green-300'
                                    }`}>
                                    <span>{event.ageRestriction}</span>
                                </div>
                            )}
                        </div>
                    )}
                    <h3 className="text-xl font-bold text-white mb-1.5 group-hover:translate-y-[-3px] transition-transform duration-500 group-hover:holographic-text">
                        {event.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-white/60 mb-3">
                        <MapPin size={14} /> {event.venue}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-white/50">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col items-end">
                                {price !== event.price && (
                                    <span className="text-xs text-white/50 line-through">£{event.price.toFixed(0)}</span>
                                )}
                                <span className={`text-base font-bold ${tier === 'early' ? 'text-green-400' : tier === 'final' ? 'text-red-400' : 'text-white'}`}>
                                    £{price.toFixed(2)}
                                </span>
                            </div>
                            {isSoldOut ? (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <WaitlistButton eventId={event.id} eventTitle={event.title} />
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCardClick();
                                    }}
                                    className="text-sm font-semibold px-4 py-2 rounded-full text-white bg-gradient-magic backdrop-blur-sm border border-white/20 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-500"
                                >
                                    View Details
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </HolographicCard>
    );
}
