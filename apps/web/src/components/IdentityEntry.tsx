"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, ArrowUp, CheckCircle, Fingerprint, Smartphone, RefreshCw } from 'lucide-react';
import HapticButton from './HapticButton';

interface IdentityEntryProps {
    onCancel: () => void;
    ticketId: string;
}

export default function IdentityEntry({ onCancel, ticketId }: IdentityEntryProps) {
    const [status, setStatus] = useState<'searching' | 'detected' | 'authenticating' | 'verified'>('searching');
    const [distance, setDistance] = useState(15); // meters

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (status === 'searching') {
            // Simulate finding signal
            const timer = setTimeout(() => {
                setStatus('detected');
            }, 2500);
            return () => clearTimeout(timer);
        }

        if (status === 'detected') {
            // Simulate walking closer
            interval = setInterval(() => {
                setDistance(prev => {
                    const newDist = Math.max(0, prev - 0.5);
                    if (newDist <= 0.5) {
                        clearInterval(interval);
                        setStatus('authenticating');
                    }
                    return newDist;
                });
            }, 100);
            return () => clearInterval(interval);
        }

        if (status === 'authenticating') {
            const timer = setTimeout(() => {
                setStatus('verified');
            }, 2000);
            return () => clearTimeout(timer);
        }

    }, [status]);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden rounded-2xl bg-black">
            {/* Background Radar Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 3],
                            opacity: [0.3, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "easeOut"
                        }}
                        className={`absolute border border-velo-cyan/30 rounded-full w-24 h-24 ${status === 'verified' ? 'border-green-500/30' : ''}`}
                    />
                ))}
            </div>

            <div className="z-10 flex flex-col items-center text-center w-full px-4">
                <AnimatePresence mode="wait">
                    {status === 'searching' && (
                        <motion.div
                            key="searching"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="mb-6 relative"
                            >
                                <div className="w-24 h-24 rounded-full border-t-2 border-l-2 border-velo-cyan/50 blur-sm absolute inset-0" />
                                <Wifi size={64} className="text-velo-cyan/80 relative z-10" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-white mb-2">Searching for Gate...</h3>
                            <p className="text-xs text-velo-text-muted uppercase tracking-wider">Ultra-Wideband Active</p>
                        </motion.div>
                    )}

                    {status === 'detected' && (
                        <motion.div
                            key="detected"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center"
                        >
                            <div className="mb-6 relative">
                                <motion.div
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ArrowUp size={80} className="text-velo-cyan drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                                </motion.div>
                                <p className="text-4xl font-mono font-bold text-white mt-4">{distance.toFixed(1)}m</p>
                            </div>
                            <h3 className="text-lg font-bold text-white">Move Closer to Reader</h3>
                            <p className="text-xs text-velo-text-muted">Precision Finding Active</p>
                        </motion.div>
                    )}

                    {status === 'authenticating' && (
                        <motion.div
                            key="authenticating"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="mb-6 w-24 h-24 bg-velo-violet/20 rounded-full flex items-center justify-center border border-velo-violet/50"
                            >
                                <Fingerprint size={48} className="text-velo-violet" />
                            </motion.div>
                            <h3 className="text-lg font-bold text-white">Verifying Identity...</h3>
                            <p className="text-xs text-velo-text-muted">Keep device steady</p>
                        </motion.div>
                    )}

                    {status === 'verified' && (
                        <motion.div
                            key="verified"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="mb-6 w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                <CheckCircle size={48} className="text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Access Granted</h3>
                            <p className="text-sm text-green-400 font-mono">ID: {ticketId.slice(-6)}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <button
                onClick={onCancel}
                className="absolute bottom-6 text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2"
            >
                <Smartphone size={14} />
                Switch to QR Code
            </button>
        </div>
    );
}
