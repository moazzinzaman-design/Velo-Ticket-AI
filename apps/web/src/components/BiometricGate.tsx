"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Fingerprint, ScanFace } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BiometricGateProps {
    isOpen: boolean;
    onVerify: () => void;
    onCancel: () => void;
    actionName: string; // e.g., "Purchase Ticket", "Access Vault"
}

export default function BiometricGate({ isOpen, onVerify, onCancel, actionName }: BiometricGateProps) {
    const [state, setState] = useState<'idle' | 'scanning' | 'verified'>('idle');

    useEffect(() => {
        if (isOpen) {
            setState('scanning');
            // Simulate scan delay
            const timer = setTimeout(() => {
                setState('verified');
                setTimeout(() => {
                    onVerify();
                    // Reset after closing
                    setTimeout(() => setState('idle'), 500);
                }, 1000);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onVerify]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
                >
                    <div className="relative mb-8">
                        {/* Scanning Ring */}
                        {state === 'scanning' && (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 border-2 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full"
                            />
                        )}

                        {/* Status Icon */}
                        <div className={`p-4 rounded-full transition-colors duration-500 ${state === 'verified' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                            {state === 'verified' ? (
                                <ShieldCheck size={48} />
                            ) : (
                                <ScanFace size={48} />
                            )}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                        {state === 'verified' ? 'Identity Verified' : 'Verifying Identity'}
                    </h3>
                    <p className="text-sm text-gray-400 mb-8">
                        {state === 'verified'
                            ? 'Zero-Knowledge Proof Generated'
                            : `Requesting secure access for: ${actionName}`}
                    </p>

                    {/* ZK Visualizer (Math converging) */}
                    <div className="h-12 flex items-center justify-center gap-2 font-mono text-xs opacity-50">
                        {state === 'scanning' && (
                            <motion.span
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                0x7F...3A9 • ZK-SNARK • VALIDATING
                            </motion.span>
                        )}
                        {state === 'verified' && (
                            <span className="text-green-500">ACCESS GRANTED</span>
                        )}
                    </div>

                    <button
                        onClick={onCancel}
                        className="mt-8 text-sm text-gray-500 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
