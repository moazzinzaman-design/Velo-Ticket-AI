"use client";

import { useMemo } from 'react';

export type PricingTier = 'early' | 'standard' | 'final';

interface UseDynamicPricingProps {
    basePrice: number;
    eventDate: Date;
    mockCurrentDate?: Date; // For time travel debugging
}

export function useDynamicPricing({ basePrice, eventDate, mockCurrentDate }: UseDynamicPricingProps) {
    return useMemo(() => {
        const now = mockCurrentDate || new Date();
        const eventTime = eventDate.getTime();
        const timeDiff = eventTime - now.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

        let tier: PricingTier;
        let price: number;
        let nextTierDate: Date | null;

        // Fallback for invalid dates
        if (isNaN(daysRemaining)) {
            return { price: basePrice, tier: 'standard' as PricingTier, daysRemaining: 0, nextTierDate: null };
        }

        if (daysRemaining > 30) {
            tier = 'early';
            price = basePrice * 0.8;
            // Next tier (Standard) starts at 30 days out
            const standardDate = new Date(eventDate);
            standardDate.setDate(eventDate.getDate() - 30);
            nextTierDate = standardDate;
        } else if (daysRemaining >= 7) {
            tier = 'standard';
            price = basePrice;
            // Next tier (Final) starts at 7 days out
            const finalDate = new Date(eventDate);
            finalDate.setDate(eventDate.getDate() - 7);
            nextTierDate = finalDate;
        } else {
            tier = 'final';
            price = basePrice * 1.2;
            nextTierDate = null;
        }

        return { price, tier, daysRemaining, nextTierDate };
    }, [basePrice, eventDate.getTime(), mockCurrentDate?.getTime()]);
}
