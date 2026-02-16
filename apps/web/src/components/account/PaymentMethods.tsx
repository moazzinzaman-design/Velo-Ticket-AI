"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Trash2, ShieldCheck } from 'lucide-react';

export default function PaymentMethods() {
    // Mock data for saved cards
    const [cards, setCards] = useState([
        { id: 'card_1', brand: 'Visa', last4: '4242', expMonth: 12, expYear: 2025, isDefault: true },
        { id: 'card_2', brand: 'Mastercard', last4: '8899', expMonth: 10, expYear: 2024, isDefault: false },
    ]);

    const removeCard = (id: string) => {
        setCards(cards.filter(c => c.id !== id));
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold text-white mb-1">Payment Methods</h3>
                <p className="text-white/60 text-sm">Manage your saved cards for faster checkout.</p>
            </div>

            <div className="grid gap-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/[0.07] transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-8 rounded bg-white/10 flex items-center justify-center text-white/80">
                                <CreditCard size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-white">•••• {card.last4}</p>
                                    {card.isDefault && (
                                        <span className="text-[10px] bg-velo-violet/20 text-velo-violet px-2 py-0.5 rounded-full font-bold">DEFAULT</span>
                                    )}
                                </div>
                                <p className="text-xs text-white/40">Expires {card.expMonth}/{card.expYear}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => removeCard(card.id)}
                            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            title="Remove card"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <button className="flex items-center gap-2 text-sm font-bold text-velo-cyan hover:text-velo-cyan/80 transition-colors py-2">
                <Plus size={16} />
                Add New Payment Method
            </button>

            <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-velo-emerald/10 border border-velo-emerald/20 text-velo-emerald text-xs">
                <ShieldCheck size={16} />
                <span>Your payment information is heavily encrypted and stored securely by Stripe.</span>
            </div>
        </div>
    );
}
