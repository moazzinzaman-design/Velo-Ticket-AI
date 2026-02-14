'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
    particleCount?: number;
    className?: string;
}

export default function ParticleBackground({
    particleCount = 30,
    className = ''
}: ParticleBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const particles: HTMLDivElement[] = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * -20}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;

            containerRef.current.appendChild(particle);
            particles.push(particle);
        }

        return () => {
            particles.forEach(p => p.remove());
        };
    }, [particleCount]);

    return (
        <div
            ref={containerRef}
            className={`floating-particles ${className}`}
            aria-hidden="true"
        />
    );
}
