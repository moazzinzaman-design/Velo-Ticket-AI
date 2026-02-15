"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Mail, Twitter, Github, Linkedin, Ticket, ArrowRight,
    Shield, Users, Sparkles, Bot, Star, BarChart3,
    Fingerprint, DollarSign, CheckCircle2, Globe, Zap, Heart
} from 'lucide-react';

const productLinks = [
    { label: 'Events', href: '/events' },
    { label: 'My Tickets', href: '/tickets' },
    { label: 'Velo+', href: '/plus' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Pricing', href: '#' },
    { label: 'API', href: '#' },
];

const featureLinks = [
    { label: 'AI Concierge', href: '/concierge', icon: Bot },
    { label: 'Moments', href: '/moments', icon: Star },
    { label: 'Promoter Hub', href: '/promoter', icon: BarChart3 },
    { label: 'Verify Tickets', href: '/verify', icon: Shield },
    { label: 'Price Protection', href: '/price-protection', icon: DollarSign },
    { label: 'Identity Entry', href: '/entry', icon: Fingerprint },
];

const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'For Promoters', href: '/promoter' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press Kit', href: '#' },
];

const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/privacy' },
];

const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
];

const trustBadges = [
    { icon: Shield, label: 'Quantum-Secured', color: 'text-cyan-400' },
    { icon: Users, label: '2M+ Users', color: 'text-violet-400' },
    { icon: Ticket, label: '100% Authentic', color: 'text-emerald-400' },
    { icon: Globe, label: '40+ Countries', color: 'text-blue-400' },
    { icon: Zap, label: 'Instant Delivery', color: 'text-amber-400' },
];

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    return (
        <footer className="relative border-t border-white/[0.04]">
            {/* Gradient divider */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-velo-violet/50 to-transparent" />

            {/* ─── Trust Bar (scrolling) ─── */}
            <div className="border-b border-white/[0.04] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-5">
                    <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
                        {trustBadges.map((badge, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-white/40 hover:text-white/60 transition-colors">
                                <badge.icon size={14} className={badge.color} />
                                <span className="font-medium">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Newsletter CTA ─── */}
            <div className="border-b border-white/[0.04]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                    <div className="glass-card rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                        {/* Ambient glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-velo-violet/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={16} className="text-velo-violet" />
                                <span className="text-[10px] font-bold text-velo-violet uppercase tracking-[0.2em]">Stay Ahead</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">Get the drop on exclusive events</h3>
                            <p className="text-sm text-white/40">Early access, VIP pre-sales, and insider content. No spam, ever.</p>
                        </div>

                        <div className="relative z-10 w-full md:w-auto">
                            {!subscribed ? (
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 md:w-60 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-velo-violet/40 focus:ring-1 focus:ring-velo-violet/20 transition-all"
                                    />
                                    <button
                                        onClick={() => { if (email) setSubscribed(true); }}
                                        className="btn-magic !rounded-xl !py-3 !px-6 flex items-center gap-2"
                                    >
                                        Subscribe <ArrowRight size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <CheckCircle2 size={18} />
                                    <span className="text-sm font-medium">You&apos;re on the list!</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Promoter CTA ─── */}
            <div className="border-b border-white/[0.04]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-velo-violet/10 via-velo-indigo/5 to-transparent border border-velo-violet/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center shrink-0">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Are you an event promoter?</h3>
                                <p className="text-sm text-white/40">Sell tickets, track analytics, and grow your audience with Velo&apos;s promoter tools.</p>
                            </div>
                        </div>
                        <Link
                            href="/promoter"
                            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-velo-violet to-velo-indigo text-white font-semibold text-sm hover:shadow-lg hover:shadow-velo-violet/20 hover:scale-[1.02] transition-all flex items-center gap-2"
                        >
                            Launch Promoter Hub <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ─── Main Footer Grid ─── */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-14">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center shadow-lg shadow-velo-violet/20">
                                <Ticket className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Velo</span>
                        </div>
                        <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-6">
                            The future of live event ticketing. AI-powered discovery, blockchain-secured transactions, and seamless premium experiences.
                        </p>

                        {/* Social */}
                        <div className="flex gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-lg hover:shadow-velo-violet/5 transition-all duration-300"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Product</h4>
                        <ul className="space-y-3">
                            {productLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Features */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Features</h4>
                        <ul className="space-y-3">
                            {featureLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-2">
                                        <link.icon size={12} className="text-velo-violet/60" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Company</h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Legal</h4>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] text-white/20">
                        <p>© {new Date().getFullYear()} Velo Digital Ltd. Registered in England & Wales #12345678.</p>
                        <p>Registered Address: 123 Tech Lane, London, E1 6AN.</p>
                        <p>Contact: legal@velotickets.com</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/20">
                        <span className="flex items-center gap-1">
                            Built with <Heart size={10} className="text-velo-rose/60 inline" /> by the Velo team
                        </span>
                        <span className="hidden md:inline">•</span>
                        <span>Powered by AI & Blockchain</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
