"use client";

import { motion } from 'framer-motion';
import { Shield, Cpu, Lock, Zap } from 'lucide-react';

interface QuantumShieldProps {
    protocol: string;
    layers: string[];
}

export default function QuantumShield({ protocol, layers }: QuantumShieldProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-black/60 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl"
        >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                        <Shield size={32} className="text-blue-400" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">Quantum Shield Active</h3>
                        <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">{protocol} SECURE</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {layers.map((layer, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/5"
                        >
                            <div className="text-blue-500">
                                {idx === 0 ? <Cpu size={16} /> : idx === 1 ? <Lock size={16} /> : <Zap size={16} />}
                            </div>
                            <span className="text-sm text-gray-300 font-medium">{layer}</span>
                            <div className="ml-auto flex items-center gap-1">
                                <span className="text-[10px] text-green-500 font-mono">ENCRYPTED</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex gap-2">
                        <div className="w-1 h-3 bg-blue-500/40 rounded-full" />
                        <div className="w-1 h-3 bg-blue-500/60 rounded-full" />
                        <div className="w-1 h-3 bg-blue-500/80 rounded-full" />
                    </div>
                    <span className="text-[9px] text-white/30 font-mono uppercase tracking-[0.2em]">Post-Quantum Standard v3.2</span>
                </div>
            </div>

            {/* Hex Scan Effect */}
            <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-blue-500/50 blur-[2px] z-20"
            />
        </motion.div>
    );
}
