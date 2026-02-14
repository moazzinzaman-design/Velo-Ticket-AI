"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Interest = 'Music' | 'Sports' | 'Tech' | 'Arts';

interface RecommendationState {
    interests: Interest[];
    toggleInterest: (interest: Interest) => void;
    clearInterests: () => void;
}

export const useRecommendations = create<RecommendationState>()(
    persist(
        (set) => ({
            interests: [],
            toggleInterest: (interest) => set((state) => ({
                interests: state.interests.includes(interest)
                    ? state.interests.filter(i => i !== interest)
                    : [...state.interests, interest]
            })),
            clearInterests: () => set({ interests: [] }),
        }),
        {
            name: 'velo-recommendations-storage',
        }
    )
);
