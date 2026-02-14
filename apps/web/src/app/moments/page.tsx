"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star, Heart, Share2, MessageCircle, Sparkles, Filter,
    ArrowLeft, Copy, Check, Twitter, Link2, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import HapticButton from '../../components/HapticButton';

/* ─── Mock Reviews ─── */
const mockReviews = [
    {
        id: 'rev-1',
        eventName: 'Daft Punk 2026',
        venueName: 'The Sphere, London',
        rating: 5,
        headline: 'Absolutely unforgettable night!',
        body: 'The visual production was next level. The Sphere was the perfect venue — every seat felt like the best seat. Lost my voice from singing along to every track.',
        atmosphere: 5,
        value: 4,
        venueQuality: 5,
        highlightMoment: 'When the helmet LEDs synced with the crowd\'s phones during Around the World',
        userName: 'Moazzin Z.',
        userAvatar: null,
        createdAt: '2026-03-16T02:30:00Z',
        likes: 42,
    },
    {
        id: 'rev-2',
        eventName: 'Coldplay World Tour',
        venueName: 'Glastonbury Festival',
        rating: 5,
        headline: 'Magic in every moment',
        body: 'Chris Martin was incredible. The wristbands lighting up made it feel like we were all part of something bigger. Highly recommend the VIP lounge for the sunset set.',
        atmosphere: 5,
        value: 5,
        venueQuality: 4,
        highlightMoment: 'Yellow with 80,000 phone flashlights',
        userName: 'Sarah K.',
        userAvatar: null,
        createdAt: '2026-02-20T22:15:00Z',
        likes: 31,
    },
    {
        id: 'rev-3',
        eventName: 'Beyoncé Renaissance',
        venueName: 'Wembley Stadium',
        rating: 4,
        headline: 'Queen Bey delivered as always',
        body: 'Production was insane, choreo was tight, and the energy was electric. Only negative was the long queues for food and drinks. But the show itself? 11/10.',
        atmosphere: 5,
        value: 3,
        venueQuality: 4,
        highlightMoment: 'The silver horse entrance to Cuff It',
        userName: 'James P.',
        userAvatar: null,
        createdAt: '2026-01-28T23:45:00Z',
        likes: 58,
    },
    {
        id: 'rev-4',
        eventName: 'Taylor Swift | Eras Tour',
        venueName: 'O2 Arena, London',
        rating: 5,
        headline: 'Every era, every emotion',
        body: 'Three and a half hours of perfection. The friendship bracelets, the surprise songs, the crowd energy — this is what live music is about. Worth every penny.',
        atmosphere: 5,
        value: 5,
        venueQuality: 5,
        highlightMoment: 'Surprise acoustic mashup of Style and Blank Space',
        userName: 'Emma L.',
        userAvatar: null,
        createdAt: '2026-02-05T01:00:00Z',
        likes: 89,
    },
];

type SortOption = 'recent' | 'rating' | 'likes';

function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={size} className={s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/15'} />
            ))}
        </div>
    );
}

function MomentCard({ review, index }: { review: typeof mockReviews[0]; index: number }) {
    const [liked, setLiked] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(`Check out this Velo Moment: "${review.headline}" — ${review.userName}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTwitter = () => {
        const text = encodeURIComponent(`"${review.headline}" — My ${review.eventName} experience was ${review.rating === 5 ? 'unforgettable' : 'amazing'}! 🎟️ @velotickets`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="glass-card-hover rounded-2xl overflow-hidden"
        >
            {/* Gradient Header Bar */}
            <div className="h-1 bg-gradient-to-r from-velo-violet via-velo-cyan to-velo-rose" />

            <div className="p-6">
                {/* User & Event */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center text-white font-bold text-sm">
                            {review.userName.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{review.userName}</p>
                            <p className="text-[10px] text-white/40">
                                {new Date(review.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <StarDisplay rating={review.rating} />
                </div>

                {/* Event Badge */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="px-2.5 py-1 bg-velo-violet/10 rounded-lg border border-velo-violet/20">
                        <span className="text-[10px] font-bold text-velo-violet uppercase tracking-wider">{review.eventName}</span>
                    </div>
                    <span className="text-[10px] text-white/30">{review.venueName}</span>
                </div>

                {/* Review Content */}
                <h3 className="text-lg font-bold text-white mb-2">{review.headline}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">{review.body}</p>

                {/* Highlight Moment */}
                {review.highlightMoment && (
                    <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/10 mb-4">
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider font-bold mb-1">✨ Highlight Moment</p>
                        <p className="text-xs text-white/70 italic">"{review.highlightMoment}"</p>
                    </div>
                )}

                {/* Category Ratings */}
                <div className="flex items-center gap-6 mb-5 py-3 border-t border-white/5">
                    <div>
                        <p className="text-[9px] text-white/30 uppercase tracking-wider">Atmosphere</p>
                        <StarDisplay rating={review.atmosphere} size={10} />
                    </div>
                    <div>
                        <p className="text-[9px] text-white/30 uppercase tracking-wider">Value</p>
                        <StarDisplay rating={review.value} size={10} />
                    </div>
                    <div>
                        <p className="text-[9px] text-white/30 uppercase tracking-wider">Venue</p>
                        <StarDisplay rating={review.venueQuality} size={10} />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLiked(!liked)}
                            className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? 'text-pink-500' : 'text-white/40 hover:text-white/70'}`}
                        >
                            <Heart size={14} className={liked ? 'fill-pink-500' : ''} />
                            {review.likes + (liked ? 1 : 0)}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
                            <MessageCircle size={14} />
                            Reply
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleShare}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                            title="Copy link"
                        >
                            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                        <button
                            onClick={handleTwitter}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                            title="Share on X"
                        >
                            <Twitter size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function MomentsPage() {
    const [sortBy, setSortBy] = useState<SortOption>('recent');
    const [showFilter, setShowFilter] = useState(false);

    const sorted = [...mockReviews].sort((a, b) => {
        if (sortBy === 'likes') return b.likes - a.likes;
        if (sortBy === 'rating') return b.rating - a.rating;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <div className="min-h-screen bg-velo-bg-deep relative overflow-hidden">
            <div className="absolute inset-0 mesh-background pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-3 mb-3">
                        <Sparkles size={18} className="text-amber-400" />
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-[0.15em]">Community</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Velo <span className="gradient-text">Moments</span>
                    </h1>
                    <p className="text-lg text-white/50">
                        Real experiences from the Velo community. Rate, review, and relive.
                    </p>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8 glass-card rounded-2xl p-5 flex items-center justify-between"
                >
                    <div className="flex items-center gap-8">
                        <div>
                            <p className="text-2xl font-bold text-white">{mockReviews.length}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-wider">Moments</p>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10" />
                        <div>
                            <p className="text-2xl font-bold text-amber-400">4.8</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-wider">Avg Rating</p>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10" />
                        <div>
                            <p className="text-2xl font-bold text-velo-cyan">{mockReviews.reduce((s, r) => s + r.likes, 0)}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-wider">Total Likes</p>
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:text-white hover:border-white/20 transition-all"
                        >
                            <Filter size={14} />
                            {sortBy === 'recent' ? 'Newest' : sortBy === 'rating' ? 'Top Rated' : 'Most Liked'}
                            <ChevronDown size={12} />
                        </button>
                        <AnimatePresence>
                            {showFilter && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="absolute right-0 top-full mt-2 w-40 glass-elevated rounded-xl p-1.5 z-20"
                                >
                                    {(['recent', 'rating', 'likes'] as SortOption[]).map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => { setSortBy(opt); setShowFilter(false); }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${sortBy === opt ? 'bg-velo-violet/20 text-velo-violet' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            {opt === 'recent' ? 'Newest First' : opt === 'rating' ? 'Top Rated' : 'Most Liked'}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Reviews Feed */}
                <div className="mt-8 space-y-6">
                    {sorted.map((review, i) => (
                        <MomentCard key={review.id} review={review} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
