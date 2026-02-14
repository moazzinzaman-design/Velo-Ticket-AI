"use client";

import { motion } from 'framer-motion';
import { useRecommendations, Interest } from '../hooks/useRecommendations';
import { Music, Trophy, Cpu, Palette } from 'lucide-react';

const INTERESTS: { id: Interest; label: string; icon: any }[] = [
    { id: 'Music', label: 'Music', icon: Music },
    { id: 'Sports', label: 'Sports', icon: Trophy },
    { id: 'Tech', label: 'Tech', icon: Cpu },
    { id: 'Arts', label: 'Arts', icon: Palette },
];

export default function InterestSelector() {
    const { interests, toggleInterest } = useRecommendations();

    return (
        <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-sm font-medium text-velo-text-muted mr-2">Personalise your feed:</span>
            {INTERESTS.map((item) => {
                const isActive = interests.includes(item.id);
                return (
                    <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleInterest(item.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${isActive
                                ? 'bg-velo-violet border-velo-violet text-white shadow-lg shadow-velo-violet/20'
                                : 'bg-white/5 border-white/10 text-velo-text-secondary hover:bg-white/10 hover:border-white/20'
                            }`}
                    >
                        <item.icon size={14} />
                        {item.label}
                    </motion.button>
                );
            })}
        </div>
    );
}
