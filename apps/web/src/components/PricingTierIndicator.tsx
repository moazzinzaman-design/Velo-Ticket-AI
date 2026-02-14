"use client";

import { motion } from 'framer-motion';
import { Clock, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import type { PricingTier } from '../hooks/useDynamicPricing';

interface PricingTierIndicatorProps {
    tier: PricingTier;
    daysRemaining: number;
    nextTierDate: Date | null;
}

export default function PricingTierIndicator({ tier, daysRemaining, nextTierDate }: PricingTierIndicatorProps) {
    const getTierConfig = () => {
        switch (tier) {
            case 'early':
                return {
                    label: 'Early Bird',
                    color: 'text-green-400',
                    bg: 'bg-green-500/10',
                    border: 'border-green-500/20',
                    icon: Calendar,
                    message: `Price rises in ${daysRemaining - 30} days`
                };
            case 'standard':
                return {
                    label: 'Standard Release',
                    color: 'text-blue-400',
                    bg: 'bg-blue-500/10',
                    border: 'border-blue-500/20',
                    icon: TrendingUp,
                    message: nextTierDate ? `Final release in ${daysRemaining - 7} days` : ''
                };
            case 'final':
                return {
                    label: 'Final Release',
                    color: 'text-red-400',
                    bg: 'bg-red-500/10',
                    border: 'border-red-500/20',
                    icon: AlertCircle,
                    message: 'Selling fast! Last few tickets.'
                };
        }
    };

    const config = getTierConfig();
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${config.bg} ${config.border}`}
        >
            <div className={`p-1.5 rounded-full bg-white/5 ${config.color}`}>
                <Icon size={14} />
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
                        {config.label}
                    </span>
                    {tier === 'early' && (
                        <span className="text-[10px] bg-green-500 text-black font-bold px-1.5 rounded-sm">
                            SAVE 20%
                        </span>
                    )}
                </div>
                {config.message && (
                    <p className="text-xs text-velo-text-secondary mt-0.5 flex items-center gap-1.5">
                        <Clock size={10} /> {config.message}
                    </p>
                )}
            </div>
        </motion.div>
    );
}
