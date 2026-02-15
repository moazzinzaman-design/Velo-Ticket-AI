'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Code2, Zap, Shield, Globe, ArrowRight, Copy, Check,
    Rocket, Lock, BarChart3, Webhook, Database, Key
} from 'lucide-react';
import Link from 'next/link';

const API_TIERS = [
    {
        name: 'Developer',
        price: 0,
        rateLimit: '1,000 requests/day',
        badge: 'Free',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        features: [
            'Event search & discovery',
            'Public event metadata',
            'Venue information',
            'Basic webhooks',
            'Community support',
        ],
    },
    {
        name: 'Growth',
        price: 99,
        rateLimit: '50,000 requests/day',
        badge: 'Popular',
        badgeColor: 'bg-velo-violet/10 text-velo-violet border-velo-violet/20',
        features: [
            'Everything in Developer',
            'Ticket inventory & pricing',
            'Real-time availability',
            'Booking API (create orders)',
            'Advanced webhooks',
            'Email support (24h SLA)',
        ],
    },
    {
        name: 'Scale',
        price: 499,
        rateLimit: '500,000 requests/day',
        badge: 'Enterprise',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        features: [
            'Everything in Growth',
            'White-label checkout',
            'Bulk ticket operations',
            'Revenue analytics API',
            'Custom SLA (99.9%)',
            'Dedicated account manager',
            'Priority support (1h SLA)',
        ],
    },
];

const ENDPOINTS = [
    { method: 'GET', path: '/v1/events', desc: 'Search and discover events', color: 'text-emerald-400' },
    { method: 'GET', path: '/v1/events/:id', desc: 'Get full event details', color: 'text-emerald-400' },
    { method: 'GET', path: '/v1/events/:id/availability', desc: 'Real-time seat availability', color: 'text-emerald-400' },
    { method: 'POST', path: '/v1/orders', desc: 'Create a ticket order', color: 'text-blue-400' },
    { method: 'GET', path: '/v1/orders/:id', desc: 'Retrieve order status', color: 'text-emerald-400' },
    { method: 'POST', path: '/v1/webhooks', desc: 'Register webhook endpoints', color: 'text-blue-400' },
    { method: 'GET', path: '/v1/venues', desc: 'Browse venue catalogue', color: 'text-emerald-400' },
    { method: 'GET', path: '/v1/analytics/sales', desc: 'Sales & revenue reports', color: 'text-emerald-400' },
];

const CODE_EXAMPLE = `import Velo from '@velo/sdk';

const velo = new Velo({
  apiKey: 'velo_live_sk_...',
  version: '2026-02-01',
});

// Search for events
const events = await velo.events.search({
  query: 'concerts in London',
  dateRange: { from: '2026-03-01', to: '2026-06-01' },
  limit: 10,
});

// Create a ticket order
const order = await velo.orders.create({
  eventId: events.data[0].id,
  tickets: [{ section: 'VIP', quantity: 2 }],
  customer: { email: 'fan@example.com' },
});

console.log(order.confirmationUrl);`;

export default function APIAccessPage() {
    const [copiedCode, setCopiedCode] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(CODE_EXAMPLE);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    return (
        <div className="min-h-screen bg-velo-bg-deep pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6">
                        <Code2 size={12} /> Velo Developer Platform
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
                        Build on <span className="text-transparent bg-clip-text bg-gradient-to-r from-velo-cyan to-velo-violet">Velo</span>
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
                        Integrate live event ticketing into your app, platform, or marketplace. One API to search events, check availability, and process orders.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center gap-2">
                            <Key size={16} /> Get API Key
                        </button>
                        <a href="#docs" className="px-8 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                            View Docs <ArrowRight size={14} />
                        </a>
                    </div>
                </motion.div>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {[
                        { icon: Zap, title: 'Real-Time Data', desc: 'Live inventory, pricing, and availability updated every second.', color: 'from-velo-cyan/20 to-blue-500/10' },
                        { icon: Shield, title: 'Enterprise Security', desc: 'OAuth 2.0, rate limiting, IP whitelisting, and PCI DSS compliance.', color: 'from-emerald-500/20 to-teal-500/10' },
                        { icon: Webhook, title: 'Webhooks & Events', desc: 'Subscribe to order updates, refunds, and inventory changes in real-time.', color: 'from-velo-violet/20 to-indigo-500/10' },
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-6 rounded-2xl bg-gradient-to-b ${feature.color} border border-white/5`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                                <feature.icon size={22} className="text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-white/50">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Code Example + Endpoints */}
                <div id="docs" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    {/* Code Example */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white">Quick Start</h3>
                            <button
                                onClick={handleCopyCode}
                                className="text-xs text-white/40 hover:text-white flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg transition-colors"
                            >
                                {copiedCode ? <><Check size={12} className="text-emerald-400" /> Copied</> : <><Copy size={12} /> Copy</>}
                            </button>
                        </div>
                        <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 overflow-x-auto">
                            <pre className="text-sm font-mono leading-relaxed">
                                <code className="text-white/80">
                                    {CODE_EXAMPLE.split('\n').map((line, i) => (
                                        <div key={i} className="flex">
                                            <span className="text-white/20 w-8 shrink-0 select-none text-right pr-4">{i + 1}</span>
                                            <span>{highlightSyntax(line)}</span>
                                        </div>
                                    ))}
                                </code>
                            </pre>
                        </div>
                    </motion.div>

                    {/* Endpoints */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-lg font-bold text-white mb-4">API Endpoints</h3>
                        <div className="space-y-2">
                            {ENDPOINTS.map((ep) => (
                                <div key={ep.path} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                        {ep.method}
                                    </span>
                                    <code className="text-sm text-white/70 font-mono flex-1">{ep.path}</code>
                                    <span className="text-xs text-white/30 hidden md:block group-hover:text-white/50 transition-colors">{ep.desc}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* API Pricing Tiers */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-3">API Pricing</h2>
                        <p className="text-white/40 max-w-xl mx-auto">Pay only for what you use. Start free and scale as your integration grows.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {API_TIERS.map((tier, i) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${tier.badgeColor}`}>
                                        {tier.badge}
                                    </span>
                                </div>

                                <div className="mb-1">
                                    <span className="text-3xl font-bold text-white">
                                        {tier.price === 0 ? 'Free' : `£${tier.price}`}
                                    </span>
                                    {tier.price > 0 && <span className="text-white/40 text-sm ml-1">/mo</span>}
                                </div>
                                <p className="text-xs text-white/30 mb-6">{tier.rateLimit}</p>

                                <ul className="space-y-2.5 mb-8 flex-1">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                                            <Check size={14} className="text-velo-cyan mt-0.5 shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] ${i === 1
                                        ? 'bg-gradient-to-r from-velo-violet to-velo-indigo text-white shadow-lg shadow-velo-violet/20'
                                        : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                                    }`}>
                                    {tier.price === 0 ? 'Start Building' : 'Subscribe'}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Integration Partners */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Trusted by developers at</p>
                    <div className="flex items-center justify-center gap-12 text-white/20 flex-wrap">
                        {['Spotify', 'Uber', 'Airbnb', 'Deliveroo', 'Monzo'].map((name) => (
                            <span key={name} className="text-lg font-bold tracking-wide">{name}</span>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <div className="inline-flex flex-col items-center gap-4 p-10 rounded-3xl bg-gradient-to-b from-velo-violet/10 to-transparent border border-velo-violet/10">
                        <Rocket className="text-velo-violet" size={32} />
                        <h3 className="text-2xl font-bold text-white">Ready to integrate?</h3>
                        <p className="text-white/40 text-sm max-w-md">Get your API key in seconds. No credit card required for the free tier.</p>
                        <div className="flex gap-3 mt-2">
                            <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all">
                                Create Free Account
                            </button>
                            <Link
                                href="/pricing"
                                className="px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
                            >
                                View All Plans
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Simple syntax highlighter for the code block
function highlightSyntax(line: string): React.ReactNode {
    // Keywords
    const highlighted = line
        .replace(/(import|from|const|await|new)/g, '<kw>$1</kw>')
        .replace(/('.*?')/g, '<str>$1</str>')
        .replace(/(\/\/.*)/g, '<cmt>$1</cmt>');

    if (highlighted === line) return line;

    return (
        <span dangerouslySetInnerHTML={{
            __html: highlighted
                .replace(/<kw>/g, '<span class="text-purple-400">')
                .replace(/<\/kw>/g, '</span>')
                .replace(/<str>/g, '<span class="text-emerald-400">')
                .replace(/<\/str>/g, '</span>')
                .replace(/<cmt>/g, '<span class="text-white/30 italic">')
                .replace(/<\/cmt>/g, '</span>')
        }} />
    );
}
