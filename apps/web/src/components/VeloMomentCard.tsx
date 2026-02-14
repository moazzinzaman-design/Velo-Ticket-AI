"use client";

import { motion } from 'framer-motion';
import { Star, Share2, Quote, Sparkles, MapPin, Calendar } from 'lucide-react';
import type { EventReview } from '../hooks/useReviews';

interface VeloMomentCardProps {
    review: EventReview;
}

export default function VeloMomentCard({ review }: VeloMomentCardProps) {
    const handleShare = async () => {
        const shareText = `⭐ ${review.rating}/5 — "${review.headline}"\n\n${review.body}\n\n📍 ${review.venueName}\n🎫 Booked via Velo`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `My Velo Moment: ${review.eventName}`,
                    text: shareText,
                    url: window.location.href,
                });
            } catch (e) {
                // User cancelled share
            }
        } else {
            await navigator.clipboard.writeText(shareText);
            alert('Review copied to clipboard!');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-velo-bg-card via-black to-velo-bg-card rounded-3xl border border-white/10 overflow-hidden group"
        >
            {/* Decorative gradient bar */}
            <div className="h-1 bg-gradient-to-r from-velo-violet via-velo-cyan to-velo-rose" />

            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-velo-violet/20">
                            {review.userName.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{review.userName}</p>
                            <p className="text-[10px] text-white/30 uppercase tracking-wider">Velo Attendee</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={14} className={s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/10'} />
                        ))}
                    </div>
                </div>

                {/* Review Content */}
                <div className="mb-5">
                    <div className="flex items-start gap-2 mb-2">
                        <Quote size={16} className="text-velo-violet mt-0.5 shrink-0 rotate-180" />
                        <h4 className="text-lg font-bold text-white leading-tight">{review.headline}</h4>
                    </div>
                    {review.body && (
                        <p className="text-sm text-white/60 leading-relaxed pl-6">{review.body}</p>
                    )}
                </div>

                {/* Highlight Moment */}
                {review.highlightMoment && (
                    <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-velo-violet/5 to-transparent border border-velo-violet/10">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Sparkles size={12} className="text-velo-violet" />
                            <span className="text-[10px] font-bold text-velo-violet uppercase tracking-wider">Highlight Moment</span>
                        </div>
                        <p className="text-xs text-white/70 italic">"{review.highlightMoment}"</p>
                    </div>
                )}

                {/* Category Ratings */}
                <div className="flex gap-4 mb-5">
                    {[
                        { label: 'Vibe', val: review.atmosphere, color: 'text-pink-400' },
                        { label: 'Venue', val: review.venueQuality, color: 'text-blue-400' },
                        { label: 'Value', val: review.value, color: 'text-emerald-400' },
                    ].map(cat => (
                        <div key={cat.label} className="text-center flex-1">
                            <p className="text-lg font-bold text-white">{cat.val}<span className="text-xs text-white/30">/5</span></p>
                            <p className={`text-[10px] font-medium ${cat.color} uppercase tracking-wider`}>{cat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4 text-[11px] text-white/30">
                        <span className="flex items-center gap-1"><MapPin size={11} />{review.venueName}</span>
                        <span className="flex items-center gap-1"><Calendar size={11} />{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs transition-all"
                    >
                        <Share2 size={12} /> Share
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
