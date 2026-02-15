"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Percent, ArrowRight } from 'lucide-react';

export default function TakeRateOptimizer() {
    const [demandVelocity, setDemandVelocity] = useState(0);
    const [takeRate, setTakeRate] = useState(1.5);

    useEffect(() => {
        // Simulate fluctuating demand velocity
        const interval = setInterval(() => {
            const newVelocity = Math.random() * 100;
            setDemandVelocity(newVelocity);

            // Algorithm: Base 1.5% + (Velocity / 100) * 3.5% -> Max 5%
            const calculatedRate = 1.5 + (newVelocity / 100) * 3.5;
            setTakeRate(calculatedRate);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10 backdrop-blur-md mt-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-velo-cyan" size={16} />
                    <h3 className="text-white text-xs font-bold uppercase tracking-wider">Autopilot Revenue Engine</h3>
                </div>
                <div className="text-[10px] text-velo-text-secondary font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Algo: v4.0 (Flight Control)
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Velocity Indicator */}
                <div className="flex-1">
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>Demand Velocity</span>
                        <span className="text-white font-mono">{demandVelocity.toFixed(1)}/s</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-500"
                            animate={{ width: `${demandVelocity}%` }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                </div>

                <ArrowRight className="text-gray-600" size={16} />

                {/* Take Rate Output */}
                <div className="bg-black/40 px-3 py-2 rounded-lg border border-white/5 flex flex-col items-center min-w-[80px]">
                    <span className="text-[10px] text-gray-500 uppercase">Current Fee</span>
                    <div className="flex items-center gap-0.5 text-xl font-bold font-mono text-purple-400">
                        <motion.span
                            key={takeRate}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                        >
                            {takeRate.toFixed(2)}
                        </motion.span>
                        <Percent size={12} />
                    </div>
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-green-400 uppercase">Projected Revenue (1h)</p>
                    <p className="text-sm font-bold text-white">
                        ${(takeRate * 1250).toFixed(0)}
                    </p>
                </div>
                <div className="flex-1 bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-blue-400 uppercase">Capture Rate</p>
                    <p className="text-sm font-bold text-white">98.2%</p>
                </div>
            </div>
        </div>
    );
}
