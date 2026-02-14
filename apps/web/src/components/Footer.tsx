"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Twitter, Github, Linkedin, Ticket, ArrowRight, Shield, Users } from 'lucide-react';

const footerLinks = {
    product: [
        { label: 'Events', href: '/events' },
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '#' },
        { label: 'API', href: '#' },
    ],
    company: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Press', href: '#' },
    ],
    legal: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Cookies', href: '#' },
    ],
};

const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    return (
        <footer className="relative border-t border-white/[0.04]">
            {/* Gradient divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-velo-violet/50 to-transparent" />

            {/* Social proof strip */}
            <div className="border-b border-white/[0.04]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-xs text-velo-text-muted">
                        <span className="flex items-center gap-2">
                            <Shield size={14} className="text-velo-cyan/60" />
                            <span>Quantum-Secured Transactions</span>
                        </span>
                        <span className="hidden md:block w-px h-4 bg-white/10" />
                        <span className="flex items-center gap-2">
                            <Users size={14} className="text-velo-violet/60" />
                            <span>Trusted by Event Organisers Worldwide</span>
                        </span>
                        <span className="hidden md:block w-px h-4 bg-white/10" />
                        <span className="flex items-center gap-2">
                            <Ticket size={14} className="text-velo-emerald/60" />
                            <span>100% Authenticity Guaranteed</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    {/* Brand column */}
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center">
                                <Ticket className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Velo</span>
                        </div>
                        <p className="text-velo-text-muted text-sm leading-relaxed max-w-xs mb-6">
                            The future of live event ticketing. AI-powered discovery, quantum-secure transactions, and seamless experiences.
                        </p>

                        {/* Newsletter */}
                        {!subscribed ? (
                            <div className="flex gap-2 mb-6">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-velo-text-muted outline-none focus:border-velo-violet/40 transition-colors"
                                />
                                <button
                                    onClick={() => { if (email) setSubscribed(true); }}
                                    className="bg-velo-violet/20 border border-velo-violet/30 text-white text-sm px-4 py-2 rounded-lg hover:bg-velo-violet/30 transition-colors"
                                >
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        ) : (
                            <p className="text-velo-emerald text-sm mb-6">✓ Subscribed!</p>
                        )}

                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-velo-text-muted hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-velo-text-muted mb-4">Product</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-velo-text-secondary hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-velo-text-muted mb-4">Company</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-velo-text-secondary hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-velo-text-muted mb-4">Legal</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-velo-text-secondary hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-velo-text-muted">
                        © {new Date().getFullYear()} Velo Technologies Ltd. All rights reserved.
                    </p>
                    <p className="text-xs text-velo-text-muted">
                        Powered by AI • Secured by Quantum Cryptography
                    </p>
                </div>
            </div>
        </footer>
    );
}
