"use client";

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    hue: number;
    baseOpacity: number;
    pulseSpeed: number;
    pulseOffset: number;
}

export default function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // More particles, varied sizes
        const count = Math.min(100, Math.floor(window.innerWidth / 15));
        particlesRef.current = Array.from({ length: count }, () => {
            const baseOpacity = Math.random() * 0.4 + 0.15;
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2.5 + 0.5,
                opacity: baseOpacity,
                baseOpacity,
                hue: [270, 190, 320, 210][Math.floor(Math.random() * 4)], // violet, cyan, rose, blue
                pulseSpeed: Math.random() * 0.003 + 0.001,
                pulseOffset: Math.random() * Math.PI * 2,
            };
        });

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
        };
        const handleMouseLeave = () => {
            mouseRef.current = { ...mouseRef.current, active: false };
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        const animate = () => {
            timeRef.current += 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            particles.forEach((p) => {
                // Pulsing opacity
                p.opacity = p.baseOpacity + Math.sin(timeRef.current * p.pulseSpeed + p.pulseOffset) * 0.15;

                // Mouse interaction — gentle ATTRACTION near cursor (magnetic feel)
                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200 && dist > 30) {
                        const force = (200 - dist) / 200 * 0.015;
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                    } else if (dist <= 30) {
                        // Repel when too close
                        const force = 0.05;
                        p.vx -= (dx / dist) * force;
                        p.vy -= (dy / dist) * force;
                    }
                }

                // Drift
                p.x += p.vx;
                p.y += p.vy;

                // Damping
                p.vx *= 0.985;
                p.vy *= 0.985;

                // Wrap
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle with glow
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${p.opacity})`);
                gradient.addColorStop(0.4, `hsla(${p.hue}, 80%, 60%, ${p.opacity * 0.5})`);
                gradient.addColorStop(1, `hsla(${p.hue}, 80%, 50%, 0)`);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 90%, 80%, ${p.opacity * 1.5})`;
                ctx.fill();
            });

            // Draw constellation connections with gradient
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 140;
                    if (dist < maxDist) {
                        const alpha = 0.12 * (1 - dist / maxDist);
                        const lineGradient = ctx.createLinearGradient(
                            particles[i].x, particles[i].y,
                            particles[j].x, particles[j].y
                        );
                        lineGradient.addColorStop(0, `hsla(${particles[i].hue}, 70%, 65%, ${alpha})`);
                        lineGradient.addColorStop(1, `hsla(${particles[j].hue}, 70%, 65%, ${alpha})`);

                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = lineGradient;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            // Mouse cursor glow
            if (mouse.active) {
                const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
                cursorGlow.addColorStop(0, 'hsla(270, 80%, 60%, 0.04)');
                cursorGlow.addColorStop(0.5, 'hsla(270, 60%, 50%, 0.02)');
                cursorGlow.addColorStop(1, 'hsla(270, 60%, 50%, 0)');
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
                ctx.fillStyle = cursorGlow;
                ctx.fill();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.7 }}
        />
    );
}
