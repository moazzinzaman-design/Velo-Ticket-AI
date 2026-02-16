'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function DemoModeBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="relative w-full bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 border-b border-yellow-500/50 backdrop-blur-sm"
        >
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">🚧</span>
                        <div>
                            <p className="text-yellow-100 font-semibold text-sm md:text-base">
                                DEMO MODE
                            </p>
                            <p className="text-yellow-200/80 text-xs md:text-sm">
                                Events shown are for demonstration only. No real tickets will be issued.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-2 hover:bg-yellow-500/20 rounded-lg transition-colors text-yellow-200 hover:text-yellow-100"
                        aria-label="Dismiss demo warning"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
