"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export function SoundToggle() {
    const [muted, setMuted] = useState(true); // Start muted for UX best practice
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <motion.button
                onClick={() => setMuted(!muted)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white/80 hover:border-white/[0.15] transition-all duration-300 shadow-lg shadow-black/20"
                aria-label={muted ? 'Enable sound effects' : 'Mute sound effects'}
                data-sound-muted={muted}
            >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </motion.button>

            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/80 backdrop-blur-sm text-white/70 text-xs px-3 py-1.5 rounded-lg border border-white/[0.08]"
                    >
                        {muted ? 'Enable sound effects' : 'Mute sounds'}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
