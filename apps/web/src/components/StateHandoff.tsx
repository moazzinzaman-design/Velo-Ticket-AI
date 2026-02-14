"use client";

import { motion } from 'framer-motion';
import { BrainCircuit, RefreshCw } from 'lucide-react';

interface StateHandoffProps {
    targetDevice: 'web' | 'mobile' | 'carplay';
}

export default function StateHandoff({ targetDevice }: StateHandoffProps) {
    const deviceName = {
        web: 'Desktop Intelligence',
        mobile: 'iPhone 16 Pro',
        carplay: 'Velo Auto'
    }[targetDevice];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-8"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-8 relative"
            >
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                <BrainCircuit size={80} className="text-blue-500 relative z-10" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-20px] border-2 border-dashed border-blue-500/30 rounded-full"
                />
            </motion.div>

            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-white mb-2"
            >
                Synchronizing Session
            </motion.h2>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-blue-400 font-mono text-sm tracking-widest mb-12"
            >
                TRANSFERRING TO {deviceName.toUpperCase()}...
            </motion.p>

            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-2 text-white/40 text-xs font-medium"
            >
                <RefreshCw size={12} className="animate-spin" />
                <span>Encrypting State Vault...</span>
            </motion.div>
        </motion.div>
    );
}
