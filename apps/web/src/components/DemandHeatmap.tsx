"use client";

import { motion } from 'framer-motion';

interface DemandHeatmapProps {
    isSurge: boolean;
}

export default function DemandHeatmap({ isSurge }: DemandHeatmapProps) {
    // Generate a simple grid of seats
    const rows = 5;
    const cols = 8;

    return (
        <div className="w-full bg-gray-900/80 backdrop-blur-md rounded-xl p-4 border border-white/10 relative overflow-hidden">
            <div className="absolute top-2 right-2 flex gap-2">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[10px] text-gray-400">Available</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[10px] text-gray-400">Hot</span>
                </div>
            </div>

            <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Live Venue Density</h3>

            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {Array.from({ length: rows * cols }).map((_, i) => {
                    // Simulate random demand, higher if surge
                    const isHot = isSurge && Math.random() > 0.4;
                    const isSold = Math.random() > 0.8;

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0.5 }}
                            animate={{
                                backgroundColor: isSold ? '#333' : (isHot ? '#EF4444' : '#22C55E'),
                                scale: isHot ? [1, 1.1, 1] : 1
                            }}
                            transition={{
                                duration: 2,
                                repeat: isHot ? Infinity : 0,
                                delay: Math.random() * 1
                            }}
                            className="w-full h-3 rounded-sm"
                        />
                    );
                })}
            </div>

            {/* Stage indicator */}
            <div className="w-full h-1 bg-white/20 mt-4 rounded-full mx-auto" />
            <p className="text-center text-[8px] text-gray-500 mt-1">STAGE</p>
        </div>
    );
}
