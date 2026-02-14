"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Lock } from 'lucide-react';

export default function GuaranteedBadge() {
    return (
        <motion.div
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-full px-3 py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
        >
            <div className="relative">
                <ShieldCheck size={14} className="text-emerald-400 relative z-10" />
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-emerald-400/30 rounded-full blur-sm"
                />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-emerald-300 leading-none tracking-wider">
                    Velo Verified
                </span>
                <span className="text-[8px] text-emerald-400/70 leading-none mt-0.5 font-mono">
                    Auth. Guaranteed
                </span>
            </div>
        </motion.div>
    );
}

export function AuthenticityModal({ hash, issuer, onClose }: { hash: string, issuer: string, onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 text-center"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-velo-bg-card border border-white/10 rounded-2xl p-6 w-full max-w-xs shadow-2xl relative overflow-hidden">
                {/* Holographic BG */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />

                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <Lock size={32} className="text-emerald-400" />
                </div>

                <h3 className="text-lg font-bold text-white mb-1">Authenticity Guaranteed</h3>
                <p className="text-xs text-white/50 mb-6">This ticket is cryptographically verified on the Velo Chain.</p>

                <div className="space-y-3 mb-6">
                    <div className="bg-black/40 rounded-lg p-3 text-left">
                        <p className="text-[10px] text-emerald-400 uppercase font-bold mb-1">Verification Hash</p>
                        <p className="text-[9px] text-white/70 font-mono break-all leading-relaxed">{hash}</p>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 text-left flex justify-between items-center">
                        <div>
                            <p className="text-[10px] text-emerald-400 uppercase font-bold">Issuer</p>
                            <p className="text-xs text-white font-medium">{issuer}</p>
                        </div>
                        <ShieldCheck size={16} className="text-emerald-500" />
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors text-sm"
                >
                    Close Verification
                </button>
            </div>
        </motion.div>
    );
}
