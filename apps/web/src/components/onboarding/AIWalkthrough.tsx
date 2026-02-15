"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, X, ChevronRight, Map, Ticket, Lock, Zap } from 'lucide-react';

interface AIWalkthroughProps {
    onComplete: () => void;
}

const steps = [
    {
        target: 'nav-events', // hypothetical IDs
        title: "Discover Events",
        text: "Browse our curated feed of quantum-secure events. Filter by mood, location, or let me recommend something.",
        icon: Map
    },
    {
        target: 'nav-wallet',
        title: "Smart Wallet",
        text: "Your tickets live here. Flip them to see details, sell them on the verified market, or access venue entry codes.",
        icon: Ticket
    },
    {
        target: 'agent-trigger',
        title: "I'm Your Concierge",
        text: "Tap the floating button anytime. I can book rides, find dinner spots, or answer questions about the event.",
        icon: BrainCircuit
    },
    {
        target: 'profile-access',
        title: "Access Center",
        text: "Manage your identity, security settings, and Velo Black membership status here.",
        icon: Lock
    }
];

export default function AIWalkthrough({ onComplete }: AIWalkthroughProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isMinimizing, setIsMinimizing] = useState(false);

    const stepData = steps[currentStep];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleFinish();
        }
    };

    const handleFinish = () => {
        setIsMinimizing(true);
        setTimeout(onComplete, 800);
    };

    return (
        <AnimatePresence>
            {!isMinimizing && (
                <div className="fixed inset-0 z-[110] pointer-events-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 pointer-events-auto"
                        onClick={handleFinish}
                    />

                    {/* 3D Hologram Agent Container */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            layout
                            className="relative w-[500px] h-[600px] pointer-events-auto"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0, opacity: 0, y: 200 }}
                            transition={{ type: "spring", damping: 20 }}
                        >
                            {/* The Hologram Visual */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="relative w-40 h-40">
                                    <div className="absolute inset-0 bg-velo-violet/30 rounded-full blur-xl animate-pulse" />
                                    <div className="w-full h-full rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.5)]">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-velo-violet/20 via-transparent to-velo-cyan/20 animate-spin-slow" />
                                        <BrainCircuit size={64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] relative z-10" />

                                        {/* Holographic rings */}
                                        <div className="absolute inset-0 border border-white/20 rounded-full scale-[0.8] animate-ping" style={{ animationDuration: '3s' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Dialogue Card */}
                            <div className="mt-20 bg-[#0F0F0F] border border-white/10 rounded-3xl p-8 pt-16 shadow-2xl relative overflow-hidden text-center backdrop-blur-xl">
                                {/* Glass shine */}
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="relative z-10"
                                >
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 mb-4 text-velo-cyan">
                                        <stepData.icon size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{stepData.title}</h3>
                                    <p className="text-white/70 text-lg leading-relaxed mb-8 min-h-[80px]">
                                        {stepData.text}
                                    </p>
                                </motion.div>

                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        onClick={handleFinish}
                                        className="text-white/40 hover:text-white text-sm font-medium px-4 py-2 transition-colors"
                                    >
                                        Skip Tour
                                    </button>

                                    <div className="flex gap-1">
                                        {steps.map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-white' : 'w-1.5 bg-white/20'}`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        className="bg-white text-black font-bold rounded-xl px-6 py-3 flex items-center gap-2 hover:bg-velo-cyan transition-colors"
                                    >
                                        {currentStep === steps.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
