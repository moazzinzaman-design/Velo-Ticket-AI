"use client";

import { motion } from 'framer-motion';
import { Check, Crown, Zap, Shield, Ticket } from 'lucide-react';
import { useUser } from '../hooks/useUser';

export default function SubscriptionCard() {
    const { isVeloPlus, joinVeloPlus, cancelVeloPlus } = useUser();

    const benefits = [
        { icon: Zap, text: "Priority Acess to Presales" },
        { icon: Shield, text: "Zero Booking Fees (Save ~12%)" },
        { icon: Ticket, text: "Flexible 24h Refunds" },
        { icon: Crown, text: "Exclusive Velo+ Badge" },
    ];

    return (
        <div className="relative w-full max-w-sm mx-auto">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-yellow-500 rounded-3xl blur opacity-30 animate-pulse" />

            <div className="relative bg-black/80 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-8 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Velo+</h3>
                        <p className="text-velo-text-secondary text-sm">The Inner Circle</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                        <Crown className="w-6 h-6 text-black" />
                    </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">£9.99</span>
                        <span className="text-velo-text-muted">/month</span>
                    </div>
                    <p className="text-xs text-yellow-500/80 mt-2 font-medium">
                        Starts today. Cancel anytime.
                    </p>
                </div>

                {/* Benefits */}
                <div className="space-y-4 mb-8">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                                <benefit.icon size={14} className="text-yellow-400" />
                            </div>
                            <span className="text-sm text-white/90">{benefit.text}</span>
                        </div>
                    ))}
                </div>

                {/* Action */}
                {isVeloPlus ? (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={cancelVeloPlus}
                        className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white/60 font-semibold hover:bg-white/10 hover:text-white transition-all mb-3"
                    >
                        Manage Subscription
                    </motion.button>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={joinVeloPlus}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-200 to-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all mb-3 flex items-center justify-center gap-2"
                    >
                        Join Velo+
                    </motion.button>
                )}

                {isVeloPlus && (
                    <p className="text-xs text-center text-green-400 flex items-center justify-center gap-1">
                        <Check size={12} /> Membership Active
                    </p>
                )}
            </div>
        </div>
    );
}
