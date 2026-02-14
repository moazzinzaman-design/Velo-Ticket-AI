"use client";

import { useCallback, useRef, useState, useEffect } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'add' | 'whoosh' | 'ding' | 'select';

// Generate sounds with Web Audio API — no external files needed
function createOscillator(
    ctx: AudioContext,
    type: OscillatorType,
    frequency: number,
    duration: number,
    volume: number = 0.1,
    delay: number = 0
) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
}

const SOUND_CONFIGS: Record<SoundType, (ctx: AudioContext) => void> = {
    click: (ctx) => {
        createOscillator(ctx, 'sine', 800, 0.08, 0.06);
        createOscillator(ctx, 'sine', 1200, 0.05, 0.03, 0.02);
    },
    hover: (ctx) => {
        createOscillator(ctx, 'sine', 600, 0.06, 0.02);
    },
    success: (ctx) => {
        createOscillator(ctx, 'sine', 523, 0.15, 0.08);      // C5
        createOscillator(ctx, 'sine', 659, 0.15, 0.08, 0.1);  // E5
        createOscillator(ctx, 'sine', 784, 0.2, 0.08, 0.2);   // G5
        createOscillator(ctx, 'sine', 1047, 0.3, 0.06, 0.3);  // C6
    },
    add: (ctx) => {
        createOscillator(ctx, 'sine', 440, 0.1, 0.06);
        createOscillator(ctx, 'sine', 660, 0.08, 0.05, 0.05);
    },
    whoosh: (ctx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
    },
    ding: (ctx) => {
        createOscillator(ctx, 'sine', 1047, 0.4, 0.1);  // C6
        createOscillator(ctx, 'sine', 2093, 0.3, 0.04);  // C7 harmonic
    },
    select: (ctx) => {
        createOscillator(ctx, 'triangle', 700, 0.06, 0.04);
        createOscillator(ctx, 'sine', 900, 0.04, 0.03, 0.03);
    },
};

function triggerHaptic(pattern: 'light' | 'medium' | 'heavy' = 'light') {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        const patterns = {
            light: [10],
            medium: [20],
            heavy: [30, 10, 30],
        };
        navigator.vibrate(patterns[pattern]);
    }
}

export function useSoundEffects() {
    const ctxRef = useRef<AudioContext | null>(null);
    const [enabled, setEnabled] = useState(true);
    const [muted, setMuted] = useState(false);

    // Lazy-init AudioContext (requires user gesture)
    const getContext = useCallback(() => {
        if (!ctxRef.current) {
            ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        if (ctxRef.current.state === 'suspended') {
            ctxRef.current.resume();
        }
        return ctxRef.current;
    }, []);

    const play = useCallback((sound: SoundType, haptic?: 'light' | 'medium' | 'heavy') => {
        if (!enabled || muted) return;
        try {
            const ctx = getContext();
            SOUND_CONFIGS[sound](ctx);
            if (haptic) triggerHaptic(haptic);
        } catch {
            // Silently fail if AudioContext not available
        }
    }, [enabled, muted, getContext]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (ctxRef.current) {
                ctxRef.current.close();
            }
        };
    }, []);

    return {
        play,
        enabled,
        muted,
        setEnabled,
        setMuted,
        toggle: () => setMuted(m => !m),
    };
}
