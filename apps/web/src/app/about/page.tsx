"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Heart, Lightbulb, Shield, ArrowRight } from 'lucide-react';
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

const values = [
    {
        icon: Target,
        title: 'Innovation First',
        description: 'We push boundaries with AI, quantum cryptography, and multi-platform engineering to build what others think is impossible.',
        color: 'text-velo-violet',
    },
    {
        icon: Shield,
        title: 'Trust & Security',
        description: 'Every transaction is quantum-safe. Every identity is biometrically verified. Security isn\'t a feature — it\'s our foundation.',
        color: 'text-velo-cyan',
    },
    {
        icon: Heart,
        title: 'Fan Experience',
        description: 'Events should be magical. We obsess over every micro-interaction to ensure the journey from browse to encore is seamless.',
        color: 'text-velo-rose',
    },
    {
        icon: Lightbulb,
        title: 'Fair Access',
        description: 'Anti-scalping protocols, dynamic fair pricing, and intelligent distribution ensure real fans get real tickets at real prices.',
        color: 'text-velo-emerald',
    },
];

const milestones = [
    { year: '2024', title: 'Founded', description: 'Velo Technologies Ltd. was founded with a mission to revolutionise live event ticketing.' },
    { year: '2024', title: 'Seed Funding', description: 'Raised our seed round to build the foundational AI concierge and ticketing engine.' },
    { year: '2025', title: 'Platform Launch', description: 'Launched the Velo platform with quantum-secure ticketing and AI-powered discovery.' },
    { year: '2025', title: 'Project Million', description: 'Completed all 20 stages of Project Million — the most ambitious event-tech initiative ever.' },
    { year: '2026', title: '2.4M Users', description: 'Crossed 2.4 million active users with expansion into major European markets.' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-28 pb-20">
            {/* Hero */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        We're Building the<br />
                        <span className="gradient-text">Future of Live Events</span>
                    </h1>
                    <p className="text-velo-text-secondary text-lg leading-relaxed">
                        Velo was born from a simple belief: attending live events should be effortless, secure, and unforgettable. We're a team of engineers, designers, and event lovers building the technology to make that a reality.
                    </p>
                </motion.div>
            </div>

            {/* Mission Statement */}
            <section className="section-padding relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-velo-violet/5 to-transparent" />
                <div className="max-w-5xl mx-auto relative">
                    <Reveal>
                        <div className="glass-card rounded-3xl p-10 md:p-16 text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-velo-violet mb-6">Our Mission</p>
                            <h2 className="text-2xl md:text-4xl font-bold text-white leading-relaxed">
                                To make every live event experience seamless, secure, and magical — from the moment you discover it to the moment the lights come on.
                            </h2>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">What We Stand For</h2>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((value, i) => (
                            <Reveal key={value.title} delay={i * 0.1}>
                                <div className="glass-card rounded-2xl p-8 group hover:border-white/10 transition-all duration-500">
                                    <value.icon className={`w-8 h-8 ${value.color} mb-5 group-hover:scale-110 transition-transform`} />
                                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                    <p className="text-sm text-velo-text-secondary leading-relaxed">{value.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>




            {/* Leadership */}
            <section className="section-padding relative overflow-hidden mb-24">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <Reveal>
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">Meet the Founder</h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="glass-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                            <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full bg-gradient-to-br from-velo-violet via-velo-indigo to-velo-cyan p-1">
                                <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">MZ</div>
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-white mb-2">Moazzin Zaman</h3>
                                <p className="text-velo-violet font-medium mb-4">Founder & CEO</p>
                                <p className="text-velo-text-secondary leading-relaxed mb-6">
                                    "As a Data Analyst and Student Pilot, I've always been obsessed with systems that require absolute precision and clarity. Velo applies that same rigor to live events—eliminating chaos, ensuring fairness, and putting fans back in control."
                                </p>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/70">West Yorkshire, UK</span>
                                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/70">Aviation & Data Science</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6 md:px-12">
                <Reveal>
                    <div className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-velo-violet via-velo-indigo to-velo-cyan opacity-90" />
                        <div className="relative z-10 px-8 md:px-16 py-14 text-center">
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Join the Revolution</h2>
                            <p className="text-white/80 max-w-md mx-auto mb-8">Be part of the future. Discover events, book securely, and experience something extraordinary.</p>
                            <Link href="/events" className="bg-white text-velo-indigo font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors inline-flex items-center gap-2">
                                Get Started <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
