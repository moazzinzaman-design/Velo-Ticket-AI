"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, ShieldCheck, Search, Fingerprint, Lock,
    ArrowLeft, Sparkles, CheckCircle2, XCircle, Hash,
    Scan, AlertTriangle, Clock, Ticket
} from 'lucide-react';
import Link from 'next/link';
import HapticButton from '../../components/HapticButton';

type VerifyState = 'idle' | 'scanning' | 'validating' | 'verified' | 'failed';

const MOCK_TICKET = {
    id: 'VLO-2026-DP-8847',
    event: 'Daft Punk 2026',
    venue: 'The Sphere, London',
    date: 'Mar 15, 2026',
    section: 'Floor Standing',
    gate: 'A3',
    owner: 'Moazzin Z.',
    hash: '0x7a3f...e91b',
    blockchain: 'Velo Ledger (L2)',
    issuedAt: '2026-02-10T14:30:00Z',
};

function ScanRing({ active }: { active: boolean }) {
    return (
        <div className="relative w-48 h-48 mx-auto">
            {/* Outer rotating ring */}
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-velo-violet/30"
                animate={active ? { rotate: 360 } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            {/* Middle pulsing ring */}
            <motion.div
                className="absolute inset-4 rounded-full border border-velo-cyan/20"
                animate={active ? { scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Inner glow */}
            <motion.div
                className="absolute inset-8 rounded-full bg-gradient-to-br from-velo-violet/10 to-velo-cyan/10"
                animate={active ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    animate={active ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <Fingerprint size={48} className="text-velo-violet/60" />
                </motion.div>
            </div>

            {/* Scanning beam */}
            {active && (
                <motion.div
                    className="absolute inset-x-6 h-0.5 bg-gradient-to-r from-transparent via-velo-cyan to-transparent"
                    initial={{ top: '20%' }}
                    animate={{ top: ['20%', '80%', '20%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
            )}

            {/* Floating particles */}
            {active && Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-velo-violet"
                    style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                />
            ))}
        </div>
    );
}

function VerificationStep({ label, status, delay = 0 }: { label: string; status: 'pending' | 'active' | 'done' | 'failed'; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex items-center gap-3"
        >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${status === 'done' ? 'bg-emerald-500/20 text-emerald-500' :
                    status === 'active' ? 'bg-velo-violet/20 text-velo-violet' :
                        status === 'failed' ? 'bg-red-500/20 text-red-500' :
                            'bg-white/5 text-white/20'
                }`}>
                {status === 'done' && <CheckCircle2 size={14} />}
                {status === 'active' && <motion.div className="w-2 h-2 rounded-full bg-velo-violet" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />}
                {status === 'failed' && <XCircle size={14} />}
                {status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-white/20" />}
            </div>
            <span className={`text-sm transition-colors ${status === 'done' ? 'text-emerald-400' :
                    status === 'active' ? 'text-white' :
                        status === 'failed' ? 'text-red-400' :
                            'text-white/30'
                }`}>
                {label}
            </span>
        </motion.div>
    );
}

export default function VerifyPage() {
    const [ticketId, setTicketId] = useState('');
    const [state, setState] = useState<VerifyState>('idle');
    const [steps, setSteps] = useState<('pending' | 'active' | 'done' | 'failed')[]>(['pending', 'pending', 'pending', 'pending']);

    const startVerification = () => {
        if (!ticketId.trim()) return;
        setState('scanning');
        setSteps(['active', 'pending', 'pending', 'pending']);

        // Step 1: Scanning (1s)
        setTimeout(() => {
            setSteps(['done', 'active', 'pending', 'pending']);
        }, 1200);

        // Step 2: Hash Verification (2s)
        setTimeout(() => {
            setSteps(['done', 'done', 'active', 'pending']);
            setState('validating');
        }, 2600);

        // Step 3: Blockchain Lookup (3.5s)
        setTimeout(() => {
            setSteps(['done', 'done', 'done', 'active']);
        }, 3800);

        // Step 4: Complete (4.5s)
        setTimeout(() => {
            const isValid = ticketId.toUpperCase().includes('VLO') || ticketId.length > 5;
            if (isValid) {
                setSteps(['done', 'done', 'done', 'done']);
                setState('verified');
            } else {
                setSteps(['done', 'done', 'done', 'failed']);
                setState('failed');
            }
        }, 5000);
    };

    const reset = () => {
        setState('idle');
        setSteps(['pending', 'pending', 'pending', 'pending']);
        setTicketId('');
    };

    return (
        <div className="min-h-screen bg-velo-bg-deep relative overflow-hidden">
            <div className="absolute inset-0 mesh-background pointer-events-none" />

            {/* Ambient glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-velo-violet/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-velo-cyan/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto px-6 pt-28 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.1 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center mx-auto mb-6 shadow-lg shadow-velo-violet/20"
                    >
                        <Shield size={32} className="text-white" />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Ticket <span className="holographic-text">Authenticity</span>
                    </h1>
                    <p className="text-lg text-white/50 max-w-md mx-auto">
                        Every Velo ticket is cryptographically verified. Enter your ticket ID to confirm.
                    </p>
                </motion.div>

                {/* Input & Scanner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 glass-card rounded-3xl p-8 relative overflow-hidden"
                >
                    {/* Shimmer border effect */}
                    <div className="absolute inset-0 rounded-3xl shimmer-border pointer-events-none" />

                    {state === 'idle' && (
                        <div className="space-y-6">
                            <ScanRing active={false} />
                            <div>
                                <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block text-center">Ticket ID or Order Reference</label>
                                <div className="relative">
                                    <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type="text"
                                        placeholder="e.g. VLO-2026-DP-8847"
                                        value={ticketId}
                                        onChange={(e) => setTicketId(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && startVerification()}
                                        className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-center text-lg font-mono focus:outline-none focus:border-velo-violet/40 focus:ring-1 focus:ring-velo-violet/20 transition-all"
                                    />
                                </div>
                            </div>
                            <HapticButton
                                variant="primary"
                                className="w-full !py-4 !rounded-xl flex items-center justify-center gap-2 !text-base"
                                onClick={startVerification}
                                disabled={!ticketId.trim()}
                            >
                                <Scan size={18} />
                                Verify Ticket
                            </HapticButton>
                        </div>
                    )}

                    {(state === 'scanning' || state === 'validating') && (
                        <div className="space-y-8">
                            <ScanRing active={true} />
                            <div className="space-y-3">
                                <VerificationStep label="Scanning ticket barcode" status={steps[0]} delay={0} />
                                <VerificationStep label="Verifying cryptographic hash" status={steps[1]} delay={0.1} />
                                <VerificationStep label="Blockchain ledger lookup" status={steps[2]} delay={0.2} />
                                <VerificationStep label="Confirming ownership record" status={steps[3]} delay={0.3} />
                            </div>
                            <p className="text-center text-xs text-white/30 animate-pulse">Verifying on Velo Ledger (L2)...</p>
                        </div>
                    )}

                    {state === 'verified' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            {/* Success Badge */}
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', delay: 0.1 }}
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/30"
                                >
                                    <ShieldCheck size={40} className="text-white" />
                                </motion.div>
                                <h2 className="text-2xl font-bold text-emerald-400 mb-1">Velo Verified ✓</h2>
                                <p className="text-sm text-white/50">This ticket is authentic and untampered</p>
                            </div>

                            {/* Ticket Details */}
                            <div className="space-y-3 p-5 bg-white/[0.03] rounded-2xl border border-emerald-500/10">
                                {[
                                    { label: 'Event', value: MOCK_TICKET.event },
                                    { label: 'Venue', value: MOCK_TICKET.venue },
                                    { label: 'Date', value: MOCK_TICKET.date },
                                    { label: 'Section', value: `${MOCK_TICKET.section} • Gate ${MOCK_TICKET.gate}` },
                                    { label: 'Owner', value: MOCK_TICKET.owner },
                                    { label: 'Hash', value: MOCK_TICKET.hash },
                                    { label: 'Ledger', value: MOCK_TICKET.blockchain },
                                ].map(row => (
                                    <div key={row.label} className="flex items-center justify-between">
                                        <span className="text-xs text-white/40">{row.label}</span>
                                        <span className="text-sm font-medium text-white font-mono">{row.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Verification steps (all done) */}
                            <div className="space-y-2 pt-4 border-t border-white/5">
                                <VerificationStep label="Barcode scanned" status="done" />
                                <VerificationStep label="Cryptographic hash valid" status="done" />
                                <VerificationStep label="Blockchain record confirmed" status="done" />
                                <VerificationStep label="Ownership verified" status="done" />
                            </div>

                            <button onClick={reset} className="w-full text-center text-sm text-white/40 hover:text-white transition-colors py-2">
                                Verify another ticket
                            </button>
                        </motion.div>
                    )}

                    {state === 'failed' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring' }}
                                className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-red-500/30"
                            >
                                <AlertTriangle size={40} className="text-white" />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-red-400">Verification Failed</h2>
                            <p className="text-sm text-white/50 max-w-sm mx-auto">
                                This ticket ID could not be verified on the Velo Ledger. It may be invalid, counterfeit, or expired.
                            </p>
                            <HapticButton variant="primary" className="!rounded-xl" onClick={reset}>
                                Try Again
                            </HapticButton>
                        </motion.div>
                    )}
                </motion.div>

                {/* Trust Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <div className="flex items-center justify-center gap-6 text-white/20">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                            <Lock size={10} />
                            End-to-End Encrypted
                        </div>
                        <div className="w-[1px] h-3 bg-white/10" />
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                            <Fingerprint size={10} />
                            Zero-Knowledge Proof
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
