"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Shield, Globe, BarChart3, Zap, Users, Lock, Smartphone, Mic, Eye, Bot, Fingerprint, ChevronRight } from 'lucide-react';
import Link from 'next/link';

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}

const coreFeatures = [
    {
        icon: Bot,
        title: 'AI Concierge Agent',
        description: 'Chat naturally with our AI to discover events, book tickets, reserve dining, and coordinate your ride — all in one conversation.',
        gradient: 'from-velo-violet to-velo-indigo',
        details: ['Natural language intent recognition', 'Full-evening orchestration', 'Predictive suggestions based on preferences'],
    },
    {
        icon: Shield,
        title: 'Quantum-Safe Security',
        description: 'Every transaction protected by post-quantum cryptographic protocols. Lattice-based encryption and zero-knowledge proofs keep your data private.',
        gradient: 'from-cyan-500 to-blue-600',
        details: ['KYBER-768 key encapsulation', 'Dilithium digital signatures', 'Zero-knowledge vault sync'],
    },
    {
        icon: Globe,
        title: 'Multi-Platform Sync',
        description: 'Start on your browser, continue on your phone, and finish on CarPlay. Your session state syncs seamlessly across every device.',
        gradient: 'from-velo-emerald to-teal-500',
        details: ['Real-time state handoff', 'CarPlay integration', 'Progressive Web App support'],
    },
    {
        icon: BarChart3,
        title: 'Smart Dynamic Pricing',
        description: 'AI-driven pricing engine with live demand heatmaps. Anti-scalping protocols ensure fair access with cryptographically capped resale.',
        gradient: 'from-velo-rose to-velo-violet',
        details: ['Demand surge visualization', 'Resale price locks at 110% face value', 'Real-time market analytics'],
    },
];

const additionalFeatures = [
    { icon: Fingerprint, title: 'Biometric Auth', description: 'Face ID and fingerprint-based identity vault.' },
    { icon: Mic, title: 'Voice Control', description: 'Hands-free event browsing with voice commands.' },
    { icon: Eye, title: 'AR Preview', description: 'See your view from the seat before you buy.' },
    { icon: Smartphone, title: 'Offline Mode', description: 'Full access to tickets and info without a connection.' },
    { icon: Users, title: 'Churn Intervention', description: 'AI detects hesitation and offers personalized incentives.' },
    { icon: Zap, title: 'Haptic Feedback', description: 'Physical button feel for every digital interaction.' },
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen pt-28 pb-20">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                        <Sparkles size={14} className="text-velo-violet" />
                        <span className="text-xs font-medium text-velo-text-secondary">20 Stages of Innovation</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Built Different.<br />
                        <span className="gradient-text">By Design.</span>
                    </h1>
                    <p className="text-velo-text-secondary text-lg max-w-2xl mx-auto">
                        Velo isn't just a ticketing platform — it's a fully orchestrated event experience powered by cutting-edge AI, quantum cryptography, and seamless multi-platform sync.
                    </p>
                </motion.div>
            </div>

            {/* Core Features */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
                <div className="space-y-8">
                    {coreFeatures.map((feature, i) => (
                        <Reveal key={feature.title} delay={i * 0.1}>
                            <div className="glass-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 group hover:border-white/10 transition-all duration-500">
                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-velo-text-secondary leading-relaxed mb-5">{feature.description}</p>
                                    <div className="flex flex-wrap gap-3">
                                        {feature.details.map((detail) => (
                                            <span key={detail} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-velo-text-muted border border-white/5">
                                                {detail}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Additional Features Grid */}
            <section className="section-padding relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-velo-violet/5 to-transparent" />
                <div className="max-w-7xl mx-auto relative">
                    <Reveal>
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">And So Much More</h2>
                    </Reveal>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {additionalFeatures.map((feature, i) => (
                            <Reveal key={feature.title} delay={i * 0.05}>
                                <div className="glass-card rounded-2xl p-6 group hover:border-white/10 transition-all duration-500">
                                    <feature.icon className="w-8 h-8 text-velo-violet mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-velo-text-secondary">{feature.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6 md:px-12 mt-10">
                <Reveal>
                    <div className="text-center glass-card rounded-3xl p-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Try It?</h2>
                        <p className="text-velo-text-secondary mb-8 max-w-md mx-auto">Experience the future of event ticketing for yourself.</p>
                        <Link href="/events" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
                            Browse Events <ChevronRight size={18} />
                        </Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
