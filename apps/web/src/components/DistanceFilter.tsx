"use client";

import { motion } from 'framer-motion';
import { Ruler } from 'lucide-react';

interface DistanceFilterProps {
    distance: number;
    onDistanceChange: (distance: number) => void;
    disabled?: boolean;
}

const DISTANCES = [
    { value: 5, label: '5 miles' },
    { value: 15, label: '15 miles' },
    { value: 50, label: '50 miles' },
];

export default function DistanceFilter({
    distance,
    onDistanceChange,
    disabled = false,
}: DistanceFilterProps) {
    return (
        <div className="flex items-center gap-3">
            <Ruler className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/60">Within:</span>
            <div className="flex items-center gap-2">
                {DISTANCES.map((d) => (
                    <motion.button
                        key={d.value}
                        whileHover={!disabled ? { scale: 1.05 } : {}}
                        whileTap={!disabled ? { scale: 0.95 } : {}}
                        onClick={() => !disabled && onDistanceChange(d.value)}
                        disabled={disabled}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${distance === d.value
                                ? 'bg-velo-violet text-white'
                                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
                            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {d.label}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
