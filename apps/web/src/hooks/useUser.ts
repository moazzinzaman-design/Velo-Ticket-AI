"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    isVeloPlus: boolean;
    toggleVeloPlus: () => void;
    joinVeloPlus: () => void;
    cancelVeloPlus: () => void;
}

export const useUser = create<UserState>()(
    persist(
        (set) => ({
            isVeloPlus: false,
            toggleVeloPlus: () => set((state) => ({ isVeloPlus: !state.isVeloPlus })),
            joinVeloPlus: () => set({ isVeloPlus: true }),
            cancelVeloPlus: () => set({ isVeloPlus: false }),
        }),
        {
            name: 'velo-user-storage',
        }
    )
);
