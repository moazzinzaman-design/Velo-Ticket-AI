"use client";

import { motion, HTMLMotionProps } from 'framer-motion';

interface HapticButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'glass';
}

export default function HapticButton({
    children,
    onClick,
    variant = 'primary',
    className = '',
    ...props
}: HapticButtonProps) {

    const triggerHaptic = () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(10); // 10ms light tap
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        triggerHaptic();
        if (onClick) onClick(e);
    };

    const baseStyles = "relative overflow-hidden transition-all duration-200 active:scale-95";
    const variants = {
        primary: "bg-white text-black font-semibold rounded-full hover:bg-gray-100 shadow-lg hover:shadow-xl",
        secondary: "bg-white/10 text-white font-medium rounded-full hover:bg-white/20 backdrop-blur-md border border-white/20",
        glass: "glass-primary text-white font-semibold rounded-full hover:bg-white/10 border border-white/20"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={handleClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}
