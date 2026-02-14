"use client";

import { useRef, useCallback, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    strength?: number;
    as?: 'button' | 'a' | 'div';
}

export default function MagneticButton({
    children,
    className = '',
    href,
    onClick,
    strength = 0.25,
    as = 'button',
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, { damping: 15, stiffness: 200 });
    const y = useSpring(rawY, { damping: 15, stiffness: 200 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        rawX.set(deltaX * strength);
        rawY.set(deltaY * strength);
    }, [strength, rawX, rawY]);

    const handleMouseLeave = useCallback(() => {
        rawX.set(0);
        rawY.set(0);
    }, [rawX, rawY]);

    const Component = motion.div;

    return (
        <Component
            ref={ref}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
        >
            {href ? (
                <a href={href} className={className} onClick={onClick}>
                    {children}
                </a>
            ) : (
                <button className={className} onClick={onClick}>
                    {children}
                </button>
            )}
        </Component>
    );
}
