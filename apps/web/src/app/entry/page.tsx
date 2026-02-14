"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Scan, ShieldCheck, XCircle, User, Ticket, Clock,
    Crown, ArrowLeft, Fingerprint, Wifi, QrCode, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

type EntryState = 'waiting' | 'scanning' | 'processing' | 'approved' | 'denied';

const MOCK_ATTENDEE = {
    name: 'Moazzin Z.',
    ticketType: 'VIP',
    section: 'Floor Standing',
    gate: 'A3',
    event: 'Daft Punk 2026',
    ticketId: 'VLO-2026-DP-8847',
};

function PulseRadar({ active }: { active: boolean }) {
    return (
        <div className="relative w-64 h-64 mx-auto">
            {/* Concentric rings */}
            {[0, 1, 2, 3].map(i => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-velo-violet/10"
                    style={{
                        inset: `${i * 16}%`,
                    }}
                    animate={active ? {
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.02, 1],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
            ))}

            {/* Central scanner */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="w-32 h-32 rounded-3xl bg-gradient-to-br from-velo-bg-card to-velo-bg-elevated border border-white/10 flex items-center justify-center shadow-2xl"
                    animate={active ? { boxShadow: ['0 0 0px rgba(124,58,237,0)', '0 0 60px rgba(124,58,237,0.3)', '0 0 0px rgba(124,58,237,0)'] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <QrCode size={48} className={`transition-colors duration-500 ${active ? 'text-velo-violet' : 'text-white/20'}`} />
                </motion.div>
            </div>

            {/* Sweep line */}
            {active && (
                <motion.div
                    className="absolute inset-0 origin-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-velo-violet/60 to-transparent origin-left" />
                </motion.div>
            )}

            {/* Corner markers */}
            {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
                <div key={i} className={`absolute ${pos}`}>
                    <div className={`w-6 h-6 ${i < 2 ? 'border-t-2' : 'border-b-2'} ${i % 2 === 0 ? 'border-l-2' : 'border-r-2'} border-velo-violet/30 ${i === 0 ? 'rounded-tl-lg' : i === 1 ? 'rounded-tr-lg' : i === 2 ? 'rounded-bl-lg' : 'rounded-br-lg'}`} />
                </div>
            ))}
        </div>
    );
}

function EntryCounter({ count }: { count: number }) {
    return (
        <div className="flex items-center gap-6">
            <div className="text-center">
                <p className="text-3xl font-bold font-mono text-white">{count.toLocaleString()}</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Scanned Today</p>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="text-center">
                <p className="text-3xl font-bold font-mono text-emerald-400">{Math.round(count * 0.97).toLocaleString()}</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Approved</p>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="text-center">
                <p className="text-3xl font-bold font-mono text-red-400">{Math.round(count * 0.03)}</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Denied</p>
            </div>
        </div>
    );
}

export default function EntryPage() {
    const [state, setState] = useState<EntryState>('waiting');
    const [scanCount, setScanCount] = useState(4827);

    const simulateScan = () => {
        setState('scanning');

        setTimeout(() => {
            setState('processing');
        }, 1500);

        setTimeout(() => {
            setState('approved');
            setScanCount(c => c + 1);
        }, 3000);

        setTimeout(() => {
            setState('waiting');
        }, 6000);
    };

    // Auto-demo: trigger a scan every 8 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            if (state === 'waiting') {
                simulateScan();
            }
        }, 8000);
        return () => clearInterval(timer);
    }, [state]);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Ambient glow based on state */}
            <AnimatePresence>
                {state === 'approved' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-emerald-500/5 pointer-events-none"
                    />
                )}
                {state === 'denied' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-red-500/5 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10">

                {/* Venue Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-[0.2em]">Gate A3 — Live</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">{MOCK_ATTENDEE.event}</h1>
                    <p className="text-sm text-white/30 mt-1">The Sphere, London</p>
                </motion.div>

                {/* Scanner Area */}
                <motion.div
                    className="relative mb-8"
                    animate={state === 'approved' ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    <PulseRadar active={state === 'scanning' || state === 'processing'} />

                    {/* Overlay states */}
                    <AnimatePresence>
                        {state === 'approved' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="w-32 h-32 rounded-3xl bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                                    <ShieldCheck size={56} className="text-emerald-400" />
                                </div>
                            </motion.div>
                        )}
                        {state === 'denied' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="w-32 h-32 rounded-3xl bg-red-500/20 backdrop-blur-xl border border-red-500/30 flex items-center justify-center shadow-2xl shadow-red-500/20">
                                    <XCircle size={56} className="text-red-400" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Status Text */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={state}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center mb-8 h-24"
                    >
                        {state === 'waiting' && (
                            <>
                                <p className="text-xl text-white/30 font-medium">Ready to Scan</p>
                                <p className="text-xs text-white/15 mt-2">Present QR code or tap NFC</p>
                            </>
                        )}
                        {state === 'scanning' && (
                            <>
                                <p className="text-xl text-velo-violet font-medium animate-pulse">Scanning...</p>
                                <p className="text-xs text-white/30 mt-2">Reading ticket data</p>
                            </>
                        )}
                        {state === 'processing' && (
                            <>
                                <p className="text-xl text-velo-cyan font-medium">Verifying Identity</p>
                                <p className="text-xs text-white/30 mt-2 flex items-center justify-center gap-2">
                                    <Fingerprint size={12} />
                                    Checking biometric record
                                </p>
                            </>
                        )}
                        {state === 'approved' && (
                            <div className="space-y-3">
                                <p className="text-2xl text-emerald-400 font-bold">✓ ENTRY APPROVED</p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                    <User size={14} className="text-white/50" />
                                    <span className="text-sm text-white font-medium">{MOCK_ATTENDEE.name}</span>
                                    {MOCK_ATTENDEE.ticketType === 'VIP' && (
                                        <span className="flex items-center gap-1 text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
                                            <Crown size={10} />
                                            VIP
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-white/30">{MOCK_ATTENDEE.section} • Gate {MOCK_ATTENDEE.gate}</p>
                            </div>
                        )}
                        {state === 'denied' && (
                            <>
                                <p className="text-2xl text-red-400 font-bold">✗ ENTRY DENIED</p>
                                <p className="text-xs text-red-400/60 mt-2">Invalid or expired ticket. Please see staff.</p>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Manual Scan Button */}
                {state === 'waiting' && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={simulateScan}
                        className="px-8 py-4 rounded-2xl bg-velo-violet/10 border border-velo-violet/30 text-velo-violet font-bold text-sm hover:bg-velo-violet/20 transition-all flex items-center gap-3 mb-12"
                    >
                        <Scan size={18} />
                        Simulate Scan
                    </motion.button>
                )}

                {state !== 'waiting' && <div className="h-[68px] mb-12" />}

                {/* Entry Counter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card rounded-2xl p-6"
                >
                    <EntryCounter count={scanCount} />
                </motion.div>

                {/* Lane indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex items-center gap-4"
                >
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/5 rounded-xl border border-amber-500/10">
                        <Crown size={12} className="text-amber-400" />
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">VIP Lane</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                        <Ticket size={12} className="text-white/40" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">General</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                        <Wifi size={12} className="text-white/40" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">NFC Active</span>
                    </div>
                </motion.div>

                {/* Bottom nav */}
                <div className="mt-12">
                    <Link href="/" className="text-xs text-white/20 hover:text-white/40 transition-colors flex items-center gap-2">
                        <ArrowLeft size={12} />
                        Exit Kiosk Mode
                    </Link>
                </div>
            </div>
        </div>
    );
}
