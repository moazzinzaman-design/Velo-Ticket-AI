"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type EventCategory = 'concerts' | 'sports' | 'theatre' | 'comedy' | 'nightlife' | 'festivals' | 'default';

interface ThemeColors {
    primary: string;
    secondary: string;
    glow: string;
    gradient: string;
    accent: string;
}

const CATEGORY_THEMES: Record<EventCategory, ThemeColors> = {
    concerts: {
        primary: '270, 80%, 60%',    // warm purple
        secondary: '280, 70%, 50%',
        glow: 'rgba(139, 92, 246, 0.15)',
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)',
        accent: '#8B5CF6',
    },
    sports: {
        primary: '200, 80%, 55%',    // electric blue
        secondary: '190, 75%, 45%',
        glow: 'rgba(59, 130, 246, 0.15)',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%)',
        accent: '#3B82F6',
    },
    theatre: {
        primary: '280, 80%, 45%',    // deep purple
        secondary: '320, 60%, 50%',
        glow: 'rgba(124, 58, 237, 0.15)',
        gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C084FC 100%)',
        accent: '#7C3AED',
    },
    comedy: {
        primary: '40, 90%, 55%',     // warm amber
        secondary: '25, 85%, 50%',
        glow: 'rgba(245, 158, 11, 0.15)',
        gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #F97316 100%)',
        accent: '#F59E0B',
    },
    nightlife: {
        primary: '330, 80%, 55%',    // neon pink
        secondary: '290, 75%, 50%',
        glow: 'rgba(236, 72, 153, 0.15)',
        gradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #06B6D4 100%)',
        accent: '#EC4899',
    },
    festivals: {
        primary: '160, 70%, 45%',    // emerald
        secondary: '145, 65%, 40%',
        glow: 'rgba(16, 185, 129, 0.15)',
        gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 50%, #8B5CF6 100%)',
        accent: '#10B981',
    },
    default: {
        primary: '270, 80%, 60%',
        secondary: '200, 75%, 55%',
        glow: 'rgba(124, 58, 237, 0.1)',
        gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #06B6D4 100%)',
        accent: '#7C3AED',
    },
};

interface DynamicThemeContextType {
    category: EventCategory;
    theme: ThemeColors;
    setCategory: (cat: EventCategory) => void;
}

const DynamicThemeContext = createContext<DynamicThemeContextType>({
    category: 'default',
    theme: CATEGORY_THEMES.default,
    setCategory: () => { },
});

export function DynamicThemeProvider({ children }: { children: ReactNode }) {
    const [category, setCategory] = useState<EventCategory>('default');
    const theme = CATEGORY_THEMES[category];

    // Apply CSS custom properties for smooth transition
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--theme-primary', theme.primary);
        root.style.setProperty('--theme-secondary', theme.secondary);
        root.style.setProperty('--theme-glow', theme.glow);
        root.style.setProperty('--theme-gradient', theme.gradient);
        root.style.setProperty('--theme-accent', theme.accent);
        root.style.setProperty('--theme-transition', '0.6s ease');
    }, [theme]);

    return (
        <DynamicThemeContext.Provider value={{ category, theme, setCategory }}>
            {children}
        </DynamicThemeContext.Provider>
    );
}

export function useDynamicTheme() {
    return useContext(DynamicThemeContext);
}

export function getCategoryFromString(cat: string): EventCategory {
    const lower = cat.toLowerCase();
    if (lower.includes('concert') || lower.includes('music') || lower.includes('tour')) return 'concerts';
    if (lower.includes('sport') || lower.includes('football') || lower.includes('rugby') || lower.includes('formula') || lower.includes('tennis') || lower.includes('cricket')) return 'sports';
    if (lower.includes('theatre') || lower.includes('theater') || lower.includes('musical') || lower.includes('opera') || lower.includes('ballet')) return 'theatre';
    if (lower.includes('comedy') || lower.includes('standup') || lower.includes('stand-up')) return 'comedy';
    if (lower.includes('night') || lower.includes('club') || lower.includes('party') || lower.includes('dj')) return 'nightlife';
    if (lower.includes('festival') || lower.includes('fest')) return 'festivals';
    return 'default';
}

// Themed glow component for backgrounds
export function ThemedGlow({ className = '' }: { className?: string }) {
    const { theme } = useDynamicTheme();
    return (
        <div
            className={`absolute rounded-full blur-[120px] pointer-events-none transition-all duration-700 ${className}`}
            style={{ background: theme.glow, width: '400px', height: '400px' }}
        />
    );
}
