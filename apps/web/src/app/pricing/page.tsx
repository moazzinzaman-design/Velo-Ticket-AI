'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Building2, Sparkles, ArrowRight, Shield, Users, Globe, Ticket } from 'lucide-react';
import Link from 'next/link';

const PLANS = [
    {
        id: 'free',
        name: 'Starter',
        description: 'Perfect for casual event-goers',
        price: { monthly: 0, annual: 0 },
        badge: null,
        gradient: 'from-white/5 to-white/[0.02]',
        border: 'border-white/10',
        cta: 'Get Started Free',
        ctaStyle: 'bg-white/10 hover:bg-white/15 text-white',
        features: [
            'Browse & discover events',
            'Standard ticket purchasing',
            'Digital ticket wallet',
            'Email confirmations',
            'QR code entry',
            'Basic event notifications',
        ],
    },
    {
        id: 'plus',
        name: 'Velo Plus',
        description: 'For superfans who want the best experience',
        price: { monthly: 9.99, annual: 7.99 },
        badge: 'Most Popular',
        gradient: 'from-velo-violet/20 to-velo-indigo/10',
        border: 'border-velo-violet/30',
        cta: 'Upgrade to Plus',
        ctaStyle: 'bg-gradient-to-r from-velo-violet to-velo-indigo text-white shadow-lg shadow-velo-violet/20',
        features: [
            'Everything in Starter',
            'Priority queue access',
            '5% off service fees',
            'Exclusive presale access',
            'AI Concierge — Velo Agent',
            'Price protection alerts',
            'Velo Black digital badge',
            'Priority customer support',
        ],
    },
    {
        id: 'promoter',
        name: 'Promoter Pro',
        description: 'For event organisers and venues',
        price: { monthly: 49, annual: 39 },
        badge: 'For Business',
        gradient: 'from-amber-500/10 to-orange-500/5',
        border: 'border-amber-500/20',
        cta: 'Start Selling',
        ctaStyle: 'bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold shadow-lg shadow-amber-500/20',
        features: [
            'List up to 50 events/month',
            'Promoter analytics dashboard',
            'Dynamic surge pricing engine',
            'Automated email campaigns',
            'Custom event branding',
            'Real-time sales tracking',
            'Group booking support',
            'Dedicated account manager',
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'Custom solutions for large venues & festivals',
        price: { monthly: null, annual: null },
        badge: null,
        gradient: 'from-emerald-500/10 to-teal-500/5',
        border: 'border-emerald-500/20',
        cta: 'Contact Sales',
        ctaStyle: 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20',
        features: [
            'Everything in Promoter Pro',
            'Unlimited events',
            'White-label ticketing',
            'Full API access',
            'Custom integrations',
            'SLA guarantee (99.9%)',
            'Dedicated success engineer',
            'On-site support available',
        ],
    },
];

const TRUST_STATS = [
    { label: 'Live Events', value: '500+', icon: Ticket },
    { label: 'Verified Tickets', value: '100%', icon: Shield },
    { label: 'UK & EU Coverage', value: '2 Regions', icon: Globe },
    { label: 'Uptime SLA', value: '99.9%', icon: Users },
];

export default function PricingPage() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

    return (
        <div className="min-h-screen bg-velo-bg-deep pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-velo-violet/10 border border-velo-violet/20 text-velo-violet text-xs font-bold mb-6">
                        <Sparkles size={12} /> Simple, Transparent Pricing
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-velo-cyan to-velo-violet">Velo Plan</span>
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        Whether you&apos;re a fan, a promoter, or a venue — we have a plan that scales with you.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={`text-sm ${billing === 'monthly' ? 'text-white font-semibold' : 'text-white/40'}`}>Monthly</span>
                        <button
                            onClick={() => setBilling(b => b === 'monthly' ? 'annual' : 'monthly')}
                            className="relative w-14 h-7 rounded-full bg-white/10 border border-white/10"
                        >
                            <motion.div
                                layout
                                className="absolute top-0.5 w-6 h-6 rounded-full bg-velo-violet shadow-lg"
                                style={{ left: billing === 'monthly' ? '2px' : 'calc(100% - 26px)' }}
                            />
                        </button>
                        <span className={`text-sm ${billing === 'annual' ? 'text-white font-semibold' : 'text-white/40'}`}>
                            Annual <span className="text-emerald-400 text-xs font-bold ml-1">Save 20%</span>
                        </span>
                    </div>
                </motion.div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative rounded-2xl bg-gradient-to-b ${plan.gradient} border ${plan.border} p-6 flex flex-col`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-velo-violet text-white text-[10px] font-bold uppercase tracking-wider">
                                    {plan.badge}
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                                <p className="text-xs text-white/40">{plan.description}</p>
                            </div>

                            <div className="mb-6">
                                {plan.price.monthly !== null ? (
                                    <>
                                        <span className="text-4xl font-bold text-white">
                                            £{billing === 'monthly' ? plan.price.monthly : plan.price.annual}
                                        </span>
                                        <span className="text-white/40 text-sm ml-1">/mo</span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold text-white">Custom</span>
                                )}
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                                        <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] ${plan.ctaStyle}`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
                >
                    {TRUST_STATS.map((stat) => (
                        <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <stat.icon size={24} className="text-velo-cyan mx-auto mb-3" />
                            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                            <p className="text-xs text-white/40">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: 'What is the Velo Service Fee?', a: 'A transparent 10% fee applied at checkout. It covers secure payment processing, digital ticket delivery, fraud protection, and platform maintenance.' },
                            { q: 'Can I cancel Velo Plus anytime?', a: 'Yes — cancel anytime from your account settings. Your Plus benefits remain active until the end of your billing period.' },
                            { q: 'How does the Promoter Pro plan work?', a: 'List events, set pricing, and track sales from your Promoter Dashboard. Velo handles ticketing, payments, and customer communications.' },
                            { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, Apple Pay, Google Pay, and bank transfers via Stripe. Split payments with friends available for group bookings.' },
                            { q: 'Do you offer refunds?', a: 'Refund policies are set by individual event promoters. Velo Plus members receive priority processing on all refund requests.' },
                        ].map((faq) => (
                            <details key={faq.q} className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                                <summary className="text-white font-semibold cursor-pointer flex items-center justify-between text-sm">
                                    {faq.q}
                                    <ArrowRight size={14} className="text-white/30 group-open:rotate-90 transition-transform" />
                                </summary>
                                <p className="text-white/50 text-sm mt-3 leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-20"
                >
                    <p className="text-white/40 text-sm mb-4">Need a custom solution for your organisation?</p>
                    <Link
                        href="/api-access"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                    >
                        <Building2 size={16} /> Explore the Velo API
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
