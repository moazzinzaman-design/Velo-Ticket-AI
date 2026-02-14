"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, TrendingUp, Users, Shield, Zap, Eye,
    CheckCircle2, ChevronRight, ChevronLeft, Rocket,
    Globe, DollarSign, BarChart3, Target
} from 'lucide-react';
import HapticButton from './HapticButton';

interface Stage {
    id: number;
    name: string;
    status: string;
}

interface Phase {
    name: string;
    stages: Stage[];
}

interface Metrics {
    tam: string;
    takeRate: string;
    projectedARR: string;
    userBase: string;
}

interface PitchDeckProps {
    title: string;
    phases: Phase[];
    metrics: Metrics;
    message: string;
}

const phaseIcons = [Eye, Zap, Users, DollarSign, Globe];
const phaseGradients = [
    'from-purple-500/20 to-blue-500/20',
    'from-blue-500/20 to-cyan-500/20',
    'from-cyan-500/20 to-green-500/20',
    'from-amber-500/20 to-orange-500/20',
    'from-pink-500/20 to-purple-500/20',
];
const phaseAccents = [
    'text-purple-400 border-purple-500/30',
    'text-blue-400 border-blue-500/30',
    'text-cyan-400 border-cyan-500/30',
    'text-amber-400 border-amber-500/30',
    'text-pink-400 border-pink-500/30',
];

export default function PitchDeck({ title, phases, metrics, message }: PitchDeckProps) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const totalSlides = phases.length + 2; // intro + phases + metrics

    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(timer);
    }, [autoPlay, totalSlides]);

    const next = () => { setAutoPlay(false); setActiveSlide(prev => (prev + 1) % totalSlides); };
    const prev = () => { setAutoPlay(false); setActiveSlide(prev => (prev - 1 + totalSlides) % totalSlides); };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-black/70 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
        >
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            {/* Top Bar */}
            <div className="relative z-10 p-1 bg-gradient-to-r from-purple-600 via-blue-500 via-cyan-400 via-amber-500 to-pink-500" />

            <div className="relative z-10 p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Rocket size={18} className="text-white" />
                        <span className="text-xs font-mono text-white/50 tracking-[0.2em] uppercase">{title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalSlides }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setAutoPlay(false); setActiveSlide(i); }}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeSlide ? 'bg-white w-4' : 'bg-white/20'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Slides */}
                <AnimatePresence mode="wait">
                    {/* Slide 0: Intro */}
                    {activeSlide === 0 && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.3 }}
                            className="min-h-[220px] flex flex-col justify-center items-center text-center py-6"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="mb-4 relative"
                            >
                                <Sparkles size={48} className="text-yellow-400" />
                                <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Project Million</h3>
                            <p className="text-gray-400 text-sm max-w-[260px] leading-relaxed">
                                20 stages. 5 phases. One complete agentic event concierge platform.
                            </p>
                            <div className="flex gap-4 mt-4">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-white">20</div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-wider">Stages</div>
                                </div>
                                <div className="w-px bg-white/10" />
                                <div className="text-center">
                                    <div className="text-lg font-bold text-green-400">100%</div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-wider">Complete</div>
                                </div>
                                <div className="w-px bg-white/10" />
                                <div className="text-center">
                                    <div className="text-lg font-bold text-blue-400">{metrics.projectedARR}</div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-wider">ARR Target</div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Phase slides (1 through 5) */}
                    {activeSlide > 0 && activeSlide <= phases.length && (() => {
                        const phaseIdx = activeSlide - 1;
                        const phase = phases[phaseIdx];
                        const Icon = phaseIcons[phaseIdx];
                        return (
                            <motion.div
                                key={`phase-${phaseIdx}`}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                                className={`min-h-[220px] rounded-xl bg-gradient-to-br ${phaseGradients[phaseIdx]} p-4`}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <div className={`p-1.5 rounded-lg border ${phaseAccents[phaseIdx]} bg-black/30`}>
                                        <Icon size={16} />
                                    </div>
                                    <h4 className="text-sm font-bold text-white tracking-tight">{phase.name}</h4>
                                </div>
                                <div className="space-y-2">
                                    {phase.stages.map((stage, sIdx) => (
                                        <motion.div
                                            key={stage.id}
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: sIdx * 0.08 }}
                                            className="flex items-center gap-3 bg-black/20 rounded-lg p-2.5 border border-white/5"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 size={14} className="text-green-400" />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-xs text-white font-medium">Stage {stage.id}</span>
                                                <span className="text-xs text-gray-400 ml-2">{stage.name}</span>
                                            </div>
                                            <span className="text-[9px] text-green-500 font-mono uppercase tracking-wider">LIVE</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })()}

                    {/* Metrics slide (last) */}
                    {activeSlide === totalSlides - 1 && (
                        <motion.div
                            key="metrics"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.3 }}
                            className="min-h-[220px] py-4"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <BarChart3 size={16} className="text-emerald-400" />
                                <h4 className="text-sm font-bold text-white">Investment Metrics</h4>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                                    <Target size={16} className="text-blue-400 mx-auto mb-1" />
                                    <div className="text-lg font-bold text-white">{metrics.tam}</div>
                                    <div className="text-[9px] text-white/40 uppercase tracking-wider">TAM (UK Events)</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                                    <TrendingUp size={16} className="text-green-400 mx-auto mb-1" />
                                    <div className="text-lg font-bold text-white">{metrics.takeRate}</div>
                                    <div className="text-[9px] text-white/40 uppercase tracking-wider">Dynamic Take-Rate</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                                    <DollarSign size={16} className="text-amber-400 mx-auto mb-1" />
                                    <div className="text-lg font-bold text-white">{metrics.projectedARR}</div>
                                    <div className="text-[9px] text-white/40 uppercase tracking-wider">Projected ARR</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                                    <Users size={16} className="text-pink-400 mx-auto mb-1" />
                                    <div className="text-lg font-bold text-white">{metrics.userBase}</div>
                                    <div className="text-[9px] text-white/40 uppercase tracking-wider">Target Users Y1</div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                                <span className="text-xs text-green-400 font-mono tracking-wider">ALL 20 STAGES OPERATIONAL</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <button onClick={prev} className="p-1.5 text-white/30 hover:text-white transition-colors">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-[9px] text-white/20 font-mono tracking-[0.3em] uppercase">
                        {activeSlide + 1} / {totalSlides}
                    </span>
                    <button onClick={next} className="p-1.5 text-white/30 hover:text-white transition-colors">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Scanning Line Effect */}
            <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent z-20"
            />
        </motion.div>
    );
}
