'use client';

import React, { ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HolographicCardProps {
    children: ReactNode;
    className?: string;
}

export default function HolographicCard({ children, className = '' }: HolographicCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        // Calculate percentage from center (-0.5 to 0.5)
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    // Glint overlay
    const sheenGradient = useTransform(
        mouseX,
        [-0.5, 0.5],
        [
            'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 60%, transparent 100%)',
            'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 60%, transparent 100%)'
        ]
    );

    const sheenPosition = useTransform(mouseX, [-0.5, 0.5], ['0% 50%', '100% 50%']);

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            className={`relative group ${className}`}
        >
            <div className="relative z-10 w-full h-full transform-gpu transition-all duration-200 group-hover:shadow-2xl group-hover:shadow-velo-violet/20">
                {children}
            </div>

            {/* Holographic Glint Layer */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl mix-blend-overlay"
                style={{
                    background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 40%, rgba(139, 92, 246, 0.3) 50%, rgba(255,255,255,0.2) 60%, transparent 80%)',
                    filter: 'brightness(1.5) contrast(1.2)',
                }}
            />
        </motion.div>
    );
}
