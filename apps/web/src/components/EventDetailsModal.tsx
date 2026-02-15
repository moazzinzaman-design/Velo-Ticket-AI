"use client";

import { motion } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Ticket, Info, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface EventDetailsModalProps {
    event: any;
    onClose: () => void;
    onBook: () => void;
}

export default function EventDetailsModal({ event, onClose, onBook }: EventDetailsModalProps) {
    if (!event) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-4xl max-h-[90vh] bg-velo-bg-card border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Hero Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-velo-bg-card via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-velo-bg-card/10" />

                    {/* Tag Overlay */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${event.tagColor || 'bg-velo-violet'}`}>
                            {event.tag}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                            {event.title}
                        </h2>

                        <div className="flex items-center gap-2 text-velo-text-secondary mb-6 text-sm">
                            <span className="uppercase tracking-wider font-semibold">{event.category}</span>
                            <span>•</span>
                            <span>{event.ageRestriction || 'All Ages'}</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-velo-violet/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="text-velo-violet" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Venue</h4>
                                    <p className="text-velo-text-muted text-sm">{event.venue}</p>
                                    <p className="text-velo-text-secondary text-xs">{event.location?.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-velo-rose/10 flex items-center justify-center flex-shrink-0">
                                    <Calendar className="text-velo-rose" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Date & Time</h4>
                                    <p className="text-velo-text-muted text-sm">{event.date} at {event.time}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-velo-cyan/10 flex items-center justify-center flex-shrink-0">
                                    <Info className="text-velo-cyan" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">About</h4>
                                    <p className="text-velo-text-muted text-sm leading-relaxed">
                                        {event.description || "Join us for an unforgettable experience. This event promises to be one of the highlights of the season, featuring top-tier entertainment in a spectacular venue."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 mb-6">
                            <div className="flex items-center gap-2 text-xs text-velo-text-muted">
                                <ShieldCheck size={14} className="text-green-400" />
                                <span>Verified Promoter</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-velo-text-muted">
                                <Ticket size={14} className="text-blue-400" />
                                <span>Instant Delivery</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer / CTA */}
                    <div className="pt-6 border-t border-white/10 mt-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs text-velo-text-secondary">Starting from</p>
                                <p className="text-2xl font-bold text-white">£{event.price}</p>
                            </div>
                            <div className="text-right">
                                {event.soldPercentage > 80 && (
                                    <p className="text-xs text-velo-rose font-semibold animate-pulse">
                                        Only {100 - event.soldPercentage}% tickets left!
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={onBook}
                            className="w-full py-4 bg-gradient-to-r from-velo-violet to-velo-rose hover:from-velo-violet/90 hover:to-velo-rose/90 text-white font-bold rounded-xl shadow-lg shadow-velo-violet/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <Ticket size={20} />
                            Select Seats
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
