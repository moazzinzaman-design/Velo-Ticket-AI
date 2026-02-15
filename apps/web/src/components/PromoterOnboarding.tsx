"use client";

import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PromoterOnboarding() {
    const { profile } = useUser();
    const [loading, setLoading] = useState(false);

    const handleConnectStripe = async () => {
        setLoading(true);
        try {
            // 1. Create Express Account
            const createRes = await fetch('/api/stripe/connect', { method: 'POST' });
            const { accountId } = await createRes.json();

            // 2. Get Onboarding Link
            const linkRes = await fetch('/api/stripe/account_link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accountId }),
            });
            const { url } = await linkRes.json();

            // 3. Redirect
            window.location.href = url;
        } catch (error) {
            console.error('Failed to connect Stripe:', error);
            setLoading(false);
        }
    };

    if (profile.stripeAccountId) {
        return (
            <div className="p-6 border border-green-500/20 rounded-xl bg-green-500/5">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Payouts Enabled</h3>
                        <p className="text-sm text-gray-400">Your Stripe account is connected and ready to receive payouts.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 border border-white/10 rounded-xl bg-white/5">
            <h2 className="mb-4 text-2xl font-bold text-white">Become a Promoter</h2>
            <p className="mb-6 text-gray-400">
                To start selling tickets on Velo, you need to connect a Stripe account.
                Velo takes a 10% platform fee, and you receive 90% of ticket sales instantly.
            </p>

            <button
                onClick={handleConnectStripe}
                disabled={loading}
                className="flex items-center justify-center w-full px-6 py-3 font-semibold text-white transition-all duration-200 bg-[#635BFF] rounded-lg hover:bg-[#5851E0] disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        Connect with Stripe
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                )}
            </button>
            <p className="mt-4 text-xs text-center text-gray-500">
                Secure payments powered by Stripe Connect
            </p>
        </div>
    );
}
