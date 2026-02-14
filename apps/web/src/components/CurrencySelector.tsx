"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useCurrency, Currency } from '../hooks/useCurrency';

export default function CurrencySelector() {
    const { currency, setCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);

    const currencies: { code: Currency, label: string, flag: string }[] = [
        { code: 'GBP', label: 'British Pound', flag: '🇬🇧' },
        { code: 'USD', label: 'US Dollar', flag: '🇺🇸' },
        { code: 'EUR', label: 'Euro', flag: '🇪🇺' },
        { code: 'JPY', label: 'Japanese Yen', flag: '🇯🇵' },
    ];

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs font-medium text-white/80"
            >
                <Globe size={14} className="text-velo-cyan" />
                <span>{currency}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 bottom-full mb-2 w-48 bg-velo-bg-card border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-1"
                        >
                            {currencies.map((c) => (
                                <button
                                    key={c.code}
                                    onClick={() => {
                                        setCurrency(c.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${currency === c.code ? 'bg-velo-cyan/10 text-velo-cyan' : 'text-white/70 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg leading-none">{c.flag}</span>
                                        <span className="font-medium">{c.code}</span>
                                    </div>
                                    {currency === c.code && <Check size={14} />}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
