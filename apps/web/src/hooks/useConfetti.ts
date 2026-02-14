"use client";

import { useEffect, useRef, useCallback } from 'react';

interface ConfettiParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    width: number;
    height: number;
    color: string;
    opacity: number;
    gravity: number;
    friction: number;
    shape: 'rect' | 'circle' | 'star';
}

const CONFETTI_COLORS = [
    '#8B5CF6', // violet
    '#06B6D4', // cyan
    '#F43F5E', // rose
    '#10B981', // emerald
    '#F59E0B', // amber
    '#6366F1', // indigo
    '#EC4899', // pink
    '#FFFFFF', // white
];

function createParticle(canvasWidth: number, canvasHeight: number): ConfettiParticle {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 8 + 4;
    return {
        x: canvasWidth / 2 + (Math.random() - 0.5) * 200,
        y: canvasHeight * 0.4,
        vx: Math.cos(angle) * velocity * (Math.random() * 0.5 + 0.5),
        vy: Math.sin(angle) * velocity - Math.random() * 6 - 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        width: Math.random() * 8 + 4,
        height: Math.random() * 6 + 2,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        opacity: 1,
        gravity: 0.15 + Math.random() * 0.05,
        friction: 0.98,
        shape: ['rect', 'circle', 'star'][Math.floor(Math.random() * 3)] as ConfettiParticle['shape'],
    };
}

export function useConfetti() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number>();
    const particlesRef = useRef<ConfettiParticle[]>([]);

    const fire = useCallback(() => {
        // Create or get canvas
        let canvas = canvasRef.current;
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;';
            document.body.appendChild(canvas);
            canvasRef.current = canvas;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create burst of particles
        const newParticles = Array.from({ length: 120 }, () =>
            createParticle(canvas!.width, canvas!.height)
        );
        particlesRef.current = [...particlesRef.current, ...newParticles];

        // Second burst delayed
        setTimeout(() => {
            const burst2 = Array.from({ length: 80 }, () =>
                createParticle(canvas!.width, canvas!.height)
            );
            particlesRef.current = [...particlesRef.current, ...burst2];
        }, 200);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height);
            const particles = particlesRef.current;

            particles.forEach((p) => {
                p.vy += p.gravity;
                p.vx *= p.friction;
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;
                p.opacity -= 0.005;

                if (p.opacity <= 0) return;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillStyle = p.color;

                if (p.shape === 'rect') {
                    ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
                } else if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Star
                    drawStar(ctx, 0, 0, 5, p.width / 2, p.width / 4);
                }

                ctx.restore();
            });

            // Remove dead particles
            particlesRef.current = particles.filter(p => p.opacity > 0 && p.y < canvas!.height + 50);

            if (particlesRef.current.length > 0) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                // Cleanup
                if (canvas && canvas.parentNode) {
                    canvas.parentNode.removeChild(canvas);
                    canvasRef.current = null;
                }
            }
        };

        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animate();
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (canvasRef.current?.parentNode) {
                canvasRef.current.parentNode.removeChild(canvasRef.current);
            }
        };
    }, []);

    return { fire };
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerR: number, innerR: number) {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerR);
    ctx.closePath();
    ctx.fill();
}
