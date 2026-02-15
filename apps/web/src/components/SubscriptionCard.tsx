"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, Crown, Zap, Shield, Ticket } from 'lucide-react';
import { useUser } from '../hooks/useUser';

export default function SubscriptionCard() {
    const { isVeloPlus, joinVeloPlus, cancelVeloPlus } = useUser();
    const [agreed, setAgreed] = useState(false);

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

                {/* Legal Checkbox */}
                {!isVeloPlus && (
                    <div className="flex items-start gap-3 mb-4 px-1">
                        <div className="relative flex items-center pt-1">
                            <input
                                type="checkbox"
                                id="terms"
                                className="peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-white/30 bg-white/5 checked:border-amber-400 checked:bg-amber-400 transition-all"
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 text-black w-3 h-3 font-bold" />
                        </div>
                        <label htmlFor="terms" className="text-xs text-white/50 cursor-pointer select-none">
                            I agree to the <span className="text-white hover:underline">Terms of Service</span> and acknowledge that my subscription starts immediately, waiving my 14-day right to cancel.
                        </label>
                    </div>
                )}

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
                        disabled={!agreed}
                        whileHover={agreed ? { scale: 1.02 } : {}}
                        whileTap={agreed ? { scale: 0.98 } : {}}
                        onClick={async () => {
                            if (!agreed) return;

                            // Haptics
                            if (navigator.vibrate) navigator.vibrate(20);

                            try {
                                const res = await fetch('/api/checkout/subscribe', { method: 'POST' });
                                const data = await res.json();
                                if (data.url) window.location.href = data.url;
                            } catch (err) {
                                console.error('Subscription failed:', err);
                            }
                        }}
                        className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all mb-3 flex items-center justify-center gap-2 ${agreed
                            ? 'bg-gradient-to-r from-amber-200 to-yellow-500 text-black shadow-yellow-500/20 hover:shadow-yellow-500/40 cursor-pointer'
                            : 'bg-white/5 text-white/20 cursor-not-allowed shadow-none border border-white/5'
                            }`}
                    >
                        {agreed ? 'Subscribe & Pay £9.99' : 'Agree to Terms to Join'}
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
