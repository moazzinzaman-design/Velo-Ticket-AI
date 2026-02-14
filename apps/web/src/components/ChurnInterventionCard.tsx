"use client";

import { motion } from 'framer-motion';
import { Sparkles, X, Gift, ShieldCheck } from 'lucide-react';
import HapticButton from './HapticButton';

interface ChurnInterventionCardProps {
    title: string;
    message: string;
    offerType: 'DISCOUNT' | 'VIP_UPGRADE';
    onAccept: () => void;
    onDecline: () => void;
}

export default function ChurnInterventionCard({
    title,
    message,
    offerType,
    onAccept,
    onDecline
}: ChurnInterventionCardProps) {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
        >
            <div className="p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="p-6 relative">
                <div className="absolute top-4 right-4 text-white/20">
                    <Sparkles size={40} className="animate-pulse" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/10 rounded-lg text-yellow-400">
                        {offerType === 'DISCOUNT' ? <Gift size={24} /> : <ShieldCheck size={24} />}
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                </div>

                <p className="text-gray-200 text-sm leading-relaxed mb-6">
                    "{message}"
                </p>

                <div className="flex gap-3">
                    <HapticButton
                        onClick={onAccept}
                        variant="primary"
                        className="flex-1 !bg-white !text-black hover:!bg-gray-100 font-bold py-3"
                    >
                        Accept Offer
                    </HapticButton>
                    <button
                        onClick={onDecline}
                        className="px-4 py-2 text-white/50 hover:text-white text-xs transition-colors"
                    >
                        Maybe later
                    </button>
                </div>
            </div>

            <div className="bg-black/40 px-6 py-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Predictive Intervention Active</span>
                <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '200ms' }} />
                </div>
            </div>
        </motion.div>
    );
}
