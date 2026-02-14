"use client";

import { motion } from 'framer-motion';
import { CreditCard, Lock, Shield } from 'lucide-react';

interface IdentityVaultProps {
    isUnlocked: boolean;
}

export default function IdentityVault({ isUnlocked }: IdentityVaultProps) {
    if (!isUnlocked) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="w-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4 overflow-hidden"
        >
            <div className="flex items-center gap-2 mb-3 text-green-400">
                <Shield size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Secure Vault Logic</span>
            </div>

            <div className="bg-white/5 rounded-lg p-3 flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded text-blue-400">
                        <CreditCard size={20} />
                    </div>
                    <div>
                        <p className="text-white text-sm font-bold">Velocity Black</p>
                        <p className="text-gray-400 text-xs">•••• •••• •••• 8888</p>
                    </div>
                </div>
                <div className="text-green-500 text-xs font-mono bg-green-900/20 px-2 py-1 rounded">
                    DECRYPTED
                </div>
            </div>
            <p className="text-[10px] text-gray-500 text-center">
                This data never left your device. Zero-Knowledge Proof sent to server.
            </p>
        </motion.div>
    );
}
