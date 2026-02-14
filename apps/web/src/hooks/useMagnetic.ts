"use client";

import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'framer-motion';

interface MagneticOptions {
    strength?: number;     // 0-1, how far elements pull (default 0.3)
    radius?: number;       // px, detection radius (default 150)
    damping?: number;      // spring damping (default 15)
    stiffness?: number;    // spring stiffness (default 150)
}

interface MagneticReturn {
    ref: React.RefObject<HTMLElement | null>;
    x: MotionValue<number>;
    y: MotionValue<number>;
    handleMouseMove: (e: React.MouseEvent) => void;
    handleMouseLeave: () => void;
}

export function useMagnetic(options: MagneticOptions = {}): MagneticReturn {
    const {
        strength = 0.3,
        radius = 150,
        damping = 15,
        stiffness = 150,
    } = options;

    const ref = useRef<HTMLElement | null>(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, { damping, stiffness });
    const y = useSpring(rawY, { damping, stiffness });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < radius) {
            const pull = (1 - distance / radius) * strength;
            rawX.set(deltaX * pull);
            rawY.set(deltaY * pull);
        } else {
            rawX.set(0);
            rawY.set(0);
        }
    }, [strength, radius, rawX, rawY]);

    const handleMouseLeave = useCallback(() => {
        rawX.set(0);
        rawY.set(0);
    }, [rawX, rawY]);

    return { ref, x, y, handleMouseMove, handleMouseLeave };
}
