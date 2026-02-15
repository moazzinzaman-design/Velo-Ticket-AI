'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AuroraBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute inset-0 bg-transparent blur-[80px] opacity-20 will-change-transform translate-z-0">
                {/* Blob 1 - Cyan */}
                <motion.div
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -50, 100, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] rounded-full bg-velo-cyan mix-blend-screen"
                />

                {/* Blob 2 - Violet */}
                <motion.div
                    animate={{
                        x: [0, -100, 50, 0],
                        y: [0, 100, -50, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vh] rounded-full bg-velo-violet mix-blend-screen"
                />

                {/* Blob 3 - Pink (accent) */}
                <motion.div
                    animate={{
                        x: [0, 50, -50, 0],
                        y: [0, 50, -50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                    className="absolute top-[40%] left-[40%] w-[30vw] h-[30vh] rounded-full bg-pink-500/50 mix-blend-screen"
                />
            </div>
            {/* Noise texture overlay for realism */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
    );
}
