"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReferralState {
    referralCode: string;
    earnings: number;
    referralCount: number;
    addMockReferral: () => void;
    claimEarnings: () => void;
}

export const useReferral = create<ReferralState>()(
    persist(
        (set) => ({
            referralCode: `VELO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            earnings: 0,
            referralCount: 0,
            addMockReferral: () => set((state) => ({
                earnings: state.earnings + 5,
                referralCount: state.referralCount + 1
            })),
            claimEarnings: () => set({ earnings: 0 }),
        }),
        {
            name: 'velo-referral-storage',
        }
    )
);
