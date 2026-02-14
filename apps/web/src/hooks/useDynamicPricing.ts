"use client";

import { useState, useEffect } from 'react';

export type PricingTier = 'early' | 'standard' | 'final';

interface UseDynamicPricingProps {
    basePrice: number;
    eventDate: Date;
    mockCurrentDate?: Date; // For time travel debugging
}

export function useDynamicPricing({ basePrice, eventDate, mockCurrentDate }: UseDynamicPricingProps) {
    const [price, setPrice] = useState(basePrice);
    const [tier, setTier] = useState<PricingTier>('standard');
    const [daysRemaining, setDaysRemaining] = useState(0);
    const [nextTierDate, setNextTierDate] = useState<Date | null>(null);

    useEffect(() => {
        const now = mockCurrentDate || new Date();
        const timeDiff = eventDate.getTime() - now.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

        setDaysRemaining(days);

        if (days > 30) {
            setTier('early');
            setPrice(basePrice * 0.8);
            // Next tier (Standard) starts at 30 days out
            const standardDate = new Date(eventDate);
            standardDate.setDate(eventDate.getDate() - 30);
            setNextTierDate(standardDate);
        } else if (days >= 7) {
            setTier('standard');
            setPrice(basePrice);
            // Next tier (Final) starts at 7 days out
            const finalDate = new Date(eventDate);
            finalDate.setDate(eventDate.getDate() - 7);
            setNextTierDate(finalDate);
        } else {
            setTier('final');
            setPrice(basePrice * 1.2);
            setNextTierDate(null);
        }
    }, [basePrice, eventDate, mockCurrentDate]);

    return {
        price,
        tier,
        daysRemaining,
        nextTierDate
    };
}
