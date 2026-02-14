"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Sparkles, Music, Building2, Banknote, Camera } from 'lucide-react';
import HapticButton from './HapticButton';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventName: string;
    venueName: string;
    eventId: string;
    onSubmit: (review: {
        eventId: string;
        eventName: string;
        venueName: string;
        rating: number;
        headline: string;
        body: string;
        atmosphere: number;
        value: number;
        venueQuality: number;
        highlightMoment: string;
        userName: string;
    }) => void;
}

function StarRating({ value, onChange, size = 28 }: { value: number; onChange: (v: number) => void; size?: number }) {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => onChange(star)}
                    className="transition-transform hover:scale-125 active:scale-95"
                >
                    <Star
                        size={size}
                        className={`transition-colors ${(hover || value) >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-white/20'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
}

export default function ReviewModal({ isOpen, onClose, eventName, venueName, eventId, onSubmit }: ReviewModalProps) {
    const [step, setStep] = useState(0);
    const [rating, setRating] = useState(0);
    const [headline, setHeadline] = useState('');
    const [body, setBody] = useState('');
    const [atmosphere, setAtmosphere] = useState(0);
    const [value, setValue] = useState(0);
    const [venueQuality, setVenueQuality] = useState(0);
    const [highlightMoment, setHighlightMoment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        onSubmit({
            eventId,
            eventName,
            venueName,
            rating,
            headline,
            body,
            atmosphere,
            value,
            venueQuality,
            highlightMoment,
            userName: 'Moazzin Z.',
        });
        setSubmitted(true);
        setTimeout(() => {
            onClose();
            // Reset
            setStep(0);
            setRating(0);
            setHeadline('');
            setBody('');
            setAtmosphere(0);
            setValue(0);
            setVenueQuality(0);
            setHighlightMoment('');
            setSubmitted(false);
        }, 2500);
    };

    const steps = [
        // Step 0: Overall Rating
        <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                <Star size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">How was {eventName}?</h3>
            <p className="text-sm text-white/50 mb-8">Tap a star to rate your overall experience</p>
            <StarRating value={rating} onChange={setRating} size={40} />
            <p className="text-xs text-white/30 mt-4 h-5">
                {rating === 1 && 'Disappointing'}
                {rating === 2 && 'Below Average'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Great'}
                {rating === 5 && 'Unforgettable!'}
            </p>
        </motion.div>,

        // Step 1: Category Ratings
        <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
            <h3 className="text-xl font-bold text-white text-center mb-6">Rate the Details</h3>
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-pink-500/10 flex items-center justify-center"><Music size={18} className="text-pink-400" /></div>
                        <span className="text-sm text-white/80">Atmosphere</span>
                    </div>
                    <StarRating value={atmosphere} onChange={setAtmosphere} size={22} />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center"><Building2 size={18} className="text-blue-400" /></div>
                        <span className="text-sm text-white/80">Venue Quality</span>
                    </div>
                    <StarRating value={venueQuality} onChange={setVenueQuality} size={22} />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center"><Banknote size={18} className="text-emerald-400" /></div>
                        <span className="text-sm text-white/80">Value for Money</span>
                    </div>
                    <StarRating value={value} onChange={setValue} size={22} />
                </div>
            </div>
        </motion.div>,

        // Step 2: Written Review
        <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
            <h3 className="text-xl font-bold text-white text-center mb-4">Tell Others About It</h3>
            <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Headline</label>
                <input
                    type="text"
                    placeholder="e.g. Best concert of my life!"
                    value={headline}
                    onChange={e => setHeadline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-velo-violet/50"
                />
            </div>
            <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Your Review</label>
                <textarea
                    placeholder="What made it special?"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-velo-violet/50 resize-none"
                />
            </div>
            <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Highlight Moment</label>
                <input
                    type="text"
                    placeholder="e.g. When the confetti dropped during the encore"
                    value={highlightMoment}
                    onChange={e => setHighlightMoment(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-velo-violet/50"
                />
            </div>
        </motion.div>,
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.97 }}
                        className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[480px] bg-velo-bg-card rounded-3xl border border-white/10 shadow-2xl z-[101] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 pt-6 pb-4">
                            <div>
                                <p className="text-[10px] text-velo-violet uppercase tracking-[0.15em] font-bold">Post-Event Review</p>
                                <p className="text-xs text-white/40 mt-1">{venueName}</p>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Progress */}
                        <div className="px-6 mb-6">
                            <div className="flex gap-1.5">
                                {[0, 1, 2].map(i => (
                                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step >= i ? 'bg-velo-violet' : 'bg-white/10'}`} />
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 pb-6 min-h-[280px]">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center h-[260px] text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', delay: 0.1 }}
                                        className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30"
                                    >
                                        <Sparkles size={36} className="text-white" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-white mb-2">Review Posted!</h3>
                                    <p className="text-sm text-white/50">Your Velo Moment has been created 🎉</p>
                                </motion.div>
                            ) : (
                                <AnimatePresence mode="wait">
                                    {steps[step]}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Actions */}
                        {!submitted && (
                            <div className="px-6 pb-6 flex items-center justify-between gap-3">
                                {step > 0 ? (
                                    <button
                                        onClick={() => setStep(s => s - 1)}
                                        className="px-5 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        Back
                                    </button>
                                ) : <div />}

                                {step < 2 ? (
                                    <HapticButton
                                        variant="primary"
                                        className="!px-8 !py-3 !rounded-xl"
                                        onClick={() => setStep(s => s + 1)}
                                        disabled={step === 0 && rating === 0}
                                    >
                                        Continue
                                    </HapticButton>
                                ) : (
                                    <HapticButton
                                        variant="primary"
                                        className="!px-8 !py-3 !rounded-xl !bg-gradient-to-r !from-velo-violet !to-velo-indigo"
                                        onClick={handleSubmit}
                                        disabled={!headline.trim()}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Sparkles size={16} /> Post Review
                                        </span>
                                    </HapticButton>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
