"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Crown, Search, TrendingUp, Check, ArrowRight, Users } from 'lucide-react';
import MagneticButton from '../visuals/MagneticButton';

interface BoostEventModalProps {
    eventTitle: string;
    onClose: () => void;
}

const PACKAGES = [
    {
        id: 'search',
        name: 'Search Priority',
        price: 79,
        period: 'per week',
        icon: Search,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/20',
        features: ['Top 3 in search results', 'Highlighted search tag', '2x View Visibility']
    },
    {
        id: 'category',
        name: 'Category Spotlight',
        price: 149,
        period: 'per week',
        icon: TrendingUp,
        color: 'text-velo-cyan',
        bg: 'bg-velo-cyan/10',
        border: 'border-velo-cyan/20',
        features: ['Featured in "Concerts" tab', 'Large card display', 'Email newsletter feature', '5x View Visibility'],
        popular: true
    },
    {
        id: 'homepage',
        name: 'Homepage Feature',
        price: 299,
        period: 'per week',
        icon: Crown,
        color: 'text-amber-400',
        bg: 'bg-amber-400/10',
        border: 'border-amber-400/20',
        features: ['Main carousel placement', 'Global reach', 'Dedicated push notification', '10x View Visibility']
    }
];

export default function BoostEventModal({ eventTitle, onClose }: BoostEventModalProps) {
    const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePurchase = async () => {
        if (!selectedPkg) return;
        setIsProcessing(true);

        // Simulating Stripe Checkout Redirect
        setTimeout(() => {
            alert(`Redirecting to payment for ${PACKAGES.find(p => p.id === selectedPkg)?.name}...`);
            setIsProcessing(false);
            onClose();
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-4xl bg-velo-bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left Side: Header & Info */}
                <div className="bg-white/5 p-8 md:w-1/3 flex flex-col justify-between border-r border-white/10">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-velo-violet/20 flex items-center justify-center mb-6">
                            <Zap size={24} className="text-velo-violet" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Boost Event</h2>
                        <p className="text-velo-text-secondary text-sm mb-6">
                            Skyrocket visibility for <span className="text-white font-medium">"{eventTitle}"</span>.
                            Promoted events sell out 3x faster on average.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-white/60">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <TrendingUp size={14} />
                                </div>
                                <span>Increase page views</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/60">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <Users size={14} />
                                </div>
                                <span>Reach new audiences</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <div className="text-xs text-white/40 mb-4">
                            Payments processed securely by Stripe. Cancel anytime.
                        </div>
                        <button onClick={onClose} className="text-white/60 hover:text-white text-sm font-medium transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Right Side: Packages */}
                <div className="p-8 md:w-2/3 flex-1 overflow-y-auto">
                    <div className="grid gap-4">
                        {PACKAGES.map((pkg) => (
                            <div
                                key={pkg.id}
                                onClick={() => setSelectedPkg(pkg.id)}
                                className={`relative p-5 rounded-xl border transition-all duration-300 cursor-pointer ${selectedPkg === pkg.id
                                    ? `bg-white/10 ${pkg.border} shadow-lg ring-1 ring-white/20`
                                    : 'bg-white/5 border-white/5 hover:bg-white/[0.08]'
                                    }`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-3 right-4 px-2 py-0.5 bg-velo-cyan text-[10px] font-bold text-black rounded-full shadow-lg shadow-velo-cyan/20">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg ${pkg.bg} flex items-center justify-center ${pkg.color}`}>
                                            <pkg.icon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{pkg.name}</h3>
                                            <p className="text-xs text-velo-text-muted">Visibility Boost</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-white">£{pkg.price}</div>
                                        <div className="text-[10px] text-white/40">{pkg.period}</div>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-2">
                                    {pkg.features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-white/70">
                                            <Check size={12} className={pkg.color} />
                                            {feat}
                                        </div>
                                    ))}
                                </div>

                                {selectedPkg === pkg.id && (
                                    <motion.div
                                        layoutId="check"
                                        className={`absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 rounded-full ${pkg.bg} flex items-center justify-center ${pkg.color}`}
                                    >
                                        <Check size={14} />
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                        <MagneticButton
                            onClick={handlePurchase}
                            disabled={!selectedPkg || isProcessing}
                            className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${!selectedPkg
                                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/10'
                                }`}
                        >
                            {isProcessing ? 'Processing...' : 'Continue to Payment'}
                            {!isProcessing && <ArrowRight size={18} />}
                        </MagneticButton>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
