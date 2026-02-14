"use client";

import { useState, useEffect } from 'react';

export type Currency = 'GBP' | 'USD' | 'EUR' | 'JPY';

const RATES: Record<Currency, number> = {
    GBP: 1,
    USD: 1.30,
    EUR: 1.18,
    JPY: 195.50
};

const SYMBOLS: Record<Currency, string> = {
    GBP: '£',
    USD: '$',
    EUR: '€',
    JPY: '¥'
};

// Simple event bus for cross-component updates without context provider hell
const listeners = new Set<(currency: Currency) => void>();

export function useCurrency() {
    const [currency, setCurrency] = useState<Currency>('GBP');

    useEffect(() => {
        const saved = localStorage.getItem('velo-currency') as Currency;
        if (saved && RATES[saved]) {
            setCurrency(saved);
        }

        const handler = (newCurrency: Currency) => setCurrency(newCurrency);
        listeners.add(handler);
        return () => { listeners.delete(handler); };
    }, []);

    const setGlobalCurrency = (newCurrency: Currency) => {
        localStorage.setItem('velo-currency', newCurrency);
        setCurrency(newCurrency);
        listeners.forEach(l => l(newCurrency));
    };

    const formatPrice = (amountInGBP: number) => {
        const converted = amountInGBP * RATES[currency];
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: currency === 'JPY' ? 0 : 2,
            maximumFractionDigits: currency === 'JPY' ? 0 : 2
        }).format(converted);
    };

    return {
        currency,
        setCurrency: setGlobalCurrency,
        formatPrice,
        symbol: SYMBOLS[currency],
        rate: RATES[currency]
    };
}
