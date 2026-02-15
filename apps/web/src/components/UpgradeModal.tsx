"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Plus, Minus, Crown, Car, Shirt, Zap, Shield, TrendingUp, Sparkles, Clock, Flame } from 'lucide-react';

export interface AddOn {
    id: string;
    name: string;
    description: string;
    price: number;
    icon: any;
    image: string;
    badge?: 'most-popular' | 'best-value' | 'recommended';
    popularityPercent?: number;
    remainingStock?: number;
}

const ADD_ONS: AddOn[] = [
    {
        id: 'velo-shield',
        name: 'Velo Shield (Insurance)',
        description: '100% Refund if you can\'t make it. Illness, travel delay, or emergency.',
        price: 0, // Dynamic 7%
        icon: Shield,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
        badge: 'recommended',
        popularityPercent: 72,
    },
    {
        id: 'vip-lounge',
        name: 'VIP Lounge Access',
        description: 'Access to the exclusive lounge with complimentary drinks and snacks.',
        price: 45,
        icon: Crown,
        image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=800&auto=format&fit=crop',
        badge: 'best-value',
        popularityPercent: 45,
        remainingStock: 12,
    },
    {
        id: 'fast-track',
        name: 'Fast Track Entry',
        description: 'Skip the queues. Enter via the dedicated Red Carpet lane.',
        price: 15,
        icon: Zap,
        image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=800&auto=format&fit=crop',
        badge: 'most-popular',
        popularityPercent: 88,
        remainingStock: 34,
    },
    {
        id: 'parking',
        name: 'Premium Parking',
        description: 'Guaranteed spot in the secure lot next to the main entrance.',
        price: 25,
        icon: Car,
        image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop',
        popularityPercent: 31,
        remainingStock: 8,
    },
    {
        id: 'tour-shirt',
        name: 'Tour T-Shirt (Pre-order)',
        description: 'Collect your limited edition tour merch at the venue.',
        price: 35,
        icon: Shirt,
        image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop',
        popularityPercent: 56,
    }
];

const BADGE_STYLES: Record<string, { bg: string; text: string; icon: any }> = {
    'most-popular': { bg: 'bg-amber-500/20 border-amber-500/40', text: 'text-amber-400', icon: Flame },
    'best-value': { bg: 'bg-emerald-500/20 border-emerald-500/40', text: 'text-emerald-400', icon: Sparkles },
    'recommended': { bg: 'bg-blue-500/20 border-blue-500/40', text: 'text-blue-400', icon: TrendingUp },
};

const BUNDLE_DISCOUNT = 0.10; // 10% off when 2+ add-ons

interface UpgradeModalProps {
    baseTotal: number;
    onClose: () => void;
    onConfirm: (totalPrice: number, selectedAddOns: Record<string, number>) => void;
}

export default function UpgradeModal({ baseTotal, onClose, onConfirm }: UpgradeModalProps) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const updateQuantity = (id: string, delta: number) => {
        setQuantities(prev => {
            const current = prev[id] || 0;
            const next = Math.max(0, current + delta);
            if (next === 0) {
                const { [id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [id]: next };
        });
    };

    const getAddOnPrice = (item: AddOn) => {
        if (item.id === 'velo-shield') {
            return Math.round(baseTotal * 0.07);
        }
        return item.price;
    };

    const selectedCount = Object.values(quantities).filter(q => q > 0).length;
    const hasBundleDiscount = selectedCount >= 2;

    const { addOnTotal, discountAmount, finalTotal } = useMemo(() => {
        const rawTotal = ADD_ONS.reduce((sum, item) => {
            return sum + (getAddOnPrice(item) * (quantities[item.id] || 0));
        }, 0);

        const discount = hasBundleDiscount ? Math.round(rawTotal * BUNDLE_DISCOUNT) : 0;
        const addOnAfterDiscount = rawTotal - discount;

        return {
            addOnTotal: rawTotal,
            discountAmount: discount,
            finalTotal: baseTotal + addOnAfterDiscount,
        };
    }, [quantities, baseTotal, hasBundleDiscount]);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-2xl bg-velo-bg-card border border-white/10 rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            Enhance Your Experience
                            {hasBundleDiscount && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold"
                                >
                                    BUNDLE −10%
                                </motion.span>
                            )}
                        </h2>
                        <p className="text-velo-text-secondary text-sm">
                            Add 2+ upgrades and save 10% on add-ons.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {ADD_ONS.map((item, idx) => {
                        const badgeStyle = item.badge ? BADGE_STYLES[item.badge] : null;
                        const isLowStock = item.remainingStock !== undefined && item.remainingStock <= 15;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`relative rounded-xl border transition-all duration-300 overflow-hidden group ${quantities[item.id]
                                    ? 'bg-white/[0.08] border-velo-violet/50 shadow-[0_0_20px_rgba(139,92,246,0.1)]'
                                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                                    }`}
                            >
                                {/* Badge */}
                                {badgeStyle && (
                                    <div className={`absolute top-0 right-0 px-2.5 py-1 rounded-bl-lg border-l border-b ${badgeStyle.bg} z-10`}>
                                        <span className={`text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 ${badgeStyle.text}`}>
                                            <badgeStyle.icon size={10} />
                                            {item.badge?.replace('-', ' ')}
                                        </span>
                                    </div>
                                )}

                                <div className="flex gap-4 p-4">
                                    <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-bold text-white flex items-center gap-2">
                                                {item.name}
                                            </h3>
                                            <span className="font-semibold text-velo-cyan">£{getAddOnPrice(item).toFixed(2)}</span>
                                        </div>
                                        <p className="text-sm text-velo-text-muted mb-2">{item.description}</p>

                                        {/* Popularity & Stock indicators */}
                                        <div className="flex items-center gap-3 mb-3">
                                            {item.popularityPercent && (
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-gradient-to-r from-velo-violet to-velo-cyan"
                                                            style={{ width: `${item.popularityPercent}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-white/40">{item.popularityPercent}% buy this</span>
                                                </div>
                                            )}
                                            {isLowStock && (
                                                <span className="text-[10px] text-amber-400 flex items-center gap-1 font-medium">
                                                    <Clock size={10} />
                                                    Only {item.remainingStock} left
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {quantities[item.id] ? (
                                                <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/10">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="font-bold text-white w-4 text-center">{quantities[item.id]}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded-md bg-velo-violet text-white hover:bg-velo-violet/80 transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white border border-white/10 transition-colors flex items-center gap-2"
                                                >
                                                    <Plus size={14} /> Add
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-black/20">
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-velo-text-secondary">Tickets</span>
                            <span className="text-white">£{baseTotal.toFixed(2)}</span>
                        </div>
                        {addOnTotal > 0 && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-velo-text-secondary">Add-ons</span>
                                <span className="text-white">+£{addOnTotal.toFixed(2)}</span>
                            </div>
                        )}
                        <AnimatePresence>
                            {hasBundleDiscount && discountAmount > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center justify-between text-sm overflow-hidden"
                                >
                                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                                        <Sparkles size={12} /> Bundle Discount
                                    </span>
                                    <span className="text-emerald-400 font-medium">−£{discountAmount.toFixed(2)}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="w-full h-px bg-white/10" />
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-white">Total</span>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-white block">£{finalTotal.toFixed(2)}</span>
                                {hasBundleDiscount && (
                                    <span className="text-xs text-emerald-400">You save £{discountAmount.toFixed(2)}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => onConfirm(baseTotal, {})}
                            className="px-6 py-4 rounded-xl text-sm font-medium text-velo-text-muted hover:text-white transition-colors"
                        >
                            No thanks, just tickets
                        </button>
                        <button
                            onClick={() => onConfirm(finalTotal, quantities)}
                            className="flex-1 bg-gradient-to-r from-velo-violet to-velo-indigo text-white font-bold py-4 rounded-xl shadow-lg shadow-velo-violet/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                        >
                            {addOnTotal > 0 ? 'Add to Order & Pay' : 'Continue to Payment'} <Check size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

