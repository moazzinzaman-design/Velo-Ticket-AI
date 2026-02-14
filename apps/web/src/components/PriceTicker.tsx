"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PriceTickerProps {
    basePrice: number;
    isSurge: boolean;
}

export default function PriceTicker({ basePrice, isSurge }: PriceTickerProps) {
    const [currentPrice, setCurrentPrice] = useState(basePrice);

    useEffect(() => {
        if (isSurge) {
            const interval = setInterval(() => {
                setCurrentPrice(prev => Math.min(prev + Math.random() * 5, basePrice * 1.5));
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCurrentPrice(basePrice);
        }
    }, [isSurge, basePrice]);

    return (
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Current Price</span>
                <div className="flex items-center gap-1">
                    <span className="text-xl font-bold font-mono text-white">
                        ${currentPrice.toFixed(2)}
                    </span>
                    <AnimatePresence mode='wait'>
                        {isSurge && (
                            <motion.div
                                key="surge-icon"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="text-red-500"
                            >
                                <TrendingUp size={16} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {isSurge && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-bold rounded uppercase"
                >
                    High Demand
                </motion.div>
            )}
        </div>
    );
}
