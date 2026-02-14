"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Plus, Minus, Crown, Car, Shirt, Zap } from 'lucide-react';

export interface AddOn {
    id: string;
    name: string;
    description: string;
    price: number;
    icon: any;
    image: string;
}

const ADD_ONS: AddOn[] = [
    {
        id: 'vip-lounge',
        name: 'VIP Lounge Access',
        description: 'Exclusive bar area, complimentary canapés, and private restrooms.',
        price: 45,
        icon: Crown,
        image: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'fast-track',
        name: 'Fast Track Entry',
        description: 'Skip the queues. Enter via the dedicated Red Carpet lane.',
        price: 15,
        icon: Zap,
        image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'parking',
        name: 'Premium Parking',
        description: 'Guaranteed spot in the secure lot next to the main entrance.',
        price: 25,
        icon: Car,
        image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'tour-shirt',
        name: 'Tour T-Shirt (Pre-order)',
        description: 'Collect your limited edition tour merch at the venue.',
        price: 35,
        icon: Shirt,
        image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop'
    }
];

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

    const addOnTotal = ADD_ONS.reduce((sum, item) => {
        return sum + (item.price * (quantities[item.id] || 0));
    }, 0);

    const finalTotal = baseTotal + addOnTotal;

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
                        <h2 className="text-xl font-bold text-white">Enhance Your Experience</h2>
                        <p className="text-velo-text-secondary text-sm">Exclusive upgrades for your event.</p>
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
                    {ADD_ONS.map((item) => (
                        <div
                            key={item.id}
                            className={`relative rounded-xl border transition-all duration-300 overflow-hidden group ${quantities[item.id]
                                    ? 'bg-white/[0.08] border-velo-violet/50'
                                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                                }`}
                        >
                            <div className="flex gap-4 p-4">
                                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 flex flex-col justify-center">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="font-bold text-white flex items-center gap-2">
                                            {item.name}
                                        </h3>
                                        <span className="font-semibold text-velo-cyan">£{item.price}</span>
                                    </div>
                                    <p className="text-sm text-velo-text-muted mb-4">{item.description}</p>

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
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-black/20">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-velo-text-secondary">Total to Pay</span>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-white block">£{finalTotal.toFixed(2)}</span>
                            {addOnTotal > 0 && (
                                <span className="text-xs text-velo-cyan">+£{addOnTotal} upgrades</span>
                            )}
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
                            Add to Order & Pay <Check size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
