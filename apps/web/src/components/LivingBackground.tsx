"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LivingBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-[#0A0A0A]" />

            {/* Moving Orbs */}
            <motion.div
                animate={{
                    x: mousePosition.x * 0.05,
                    y: mousePosition.y * 0.05,
                }}
                className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-velo-violet/20 rounded-full blur-[120px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    x: mousePosition.x * -0.05,
                    y: mousePosition.y * -0.05,
                }}
                className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-velo-cyan/10 rounded-full blur-[100px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    x: mousePosition.x * 0.02,
                    y: mousePosition.y * 0.08,
                }}
                className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[80px] mix-blend-screen"
            />

            {/* Noise Overlay for Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
