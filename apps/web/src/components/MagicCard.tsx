'use client';

import React from 'react';

interface MagicCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'shimmer' | 'glow';
    onClick?: () => void;
}

export default function MagicCard({
    children,
    className = '',
    variant = 'default',
    onClick
}: MagicCardProps) {
    const variantClasses = {
        default: 'glass-card-hover',
        shimmer: 'shimmer-border',
        glow: 'magic-glow-card'
    };

    return (
        <div
            className={`${variantClasses[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
