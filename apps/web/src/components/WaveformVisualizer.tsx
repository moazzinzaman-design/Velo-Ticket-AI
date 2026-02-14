"use client";

import { motion } from 'framer-motion';

interface WaveformVisualizerProps {
    isListening: boolean;
}

export default function WaveformVisualizer({ isListening }: WaveformVisualizerProps) {
    if (!isListening) return null;

    return (
        <div className="flex items-center justify-center gap-1 h-8">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1 bg-blue-400 rounded-full"
                    animate={{
                        height: [8, 24, 8],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}
