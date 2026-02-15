"use client";

import { motion } from 'framer-motion';
import { Sparkles, Crown, Zap, Shield, Ticket, Star } from 'lucide-react';
import SubscriptionCard from '../../components/SubscriptionCard';
import LivingBackground from '../../components/LivingBackground';

export default function VeloPlusPage() {
    return (
        <div className="min-h-screen pt-28 pb-20 overflow-hidden">
            {/* Background Effects */}
            <LivingBackground />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <Crown size={12} />
                            The Inner Circle
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Unlock the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
                                Full Experience.
                            </span>
                        </h1>

                        <p className="text-xl text-velo-text-secondary max-w-lg mb-10 leading-relaxed">
                            Join Velo+ to skip the queues, waive the fees, and get treated like a VIP at every event.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: Zap, title: "Priority Access", desc: "Beat the bots. Get tickets 24h before general release." },
                                { icon: Shield, title: "Zero Fees", desc: "Save ~12% on every booking. No hidden charges." },
                                { icon: Ticket, title: "Flexible Returns", desc: "Changed your mind? Get a full refund within 24h." },
                                { icon: Star, title: "VIP Status", desc: "Exclusive badge and priority support." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="flex gap-4"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <item.icon className="w-5 h-5 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-sm text-velo-text-muted">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
                        className="flex justify-center lg:justify-end"
                    >
                        <SubscriptionCard />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
