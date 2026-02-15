"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, Ticket, Search, ChevronDown, Sparkles,
    Shield, BarChart3, Fingerprint, DollarSign, Star,
    Bot, Bell, User
} from 'lucide-react';
import VeloPlusBadge from './VeloPlusBadge';
import { useUser } from '../hooks/useUser';

const mainLinks = [
    { label: 'Events', href: '/events' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'API', href: '/api-access' },
    { label: 'My Velo', href: '/account' },
    { label: 'Velo+', href: '/plus' },
];

const featureDropdown = [
    { label: 'AI Concierge', href: '/concierge', icon: Bot, description: 'Pre-event intelligence', color: 'text-cyan-400' },
    { label: 'Moments', href: '/moments', icon: Star, description: 'Reviews & social sharing', color: 'text-amber-400' },
    { label: 'Promoter Hub', href: '/promoter', icon: BarChart3, description: 'Demand forecasting', color: 'text-blue-400' },
    { label: 'Verify Ticket', href: '/verify', icon: Shield, description: 'Authenticity guarantee', color: 'text-emerald-400' },
    { label: 'Price Protection', href: '/price-protection', icon: DollarSign, description: 'Best price guarantee', color: 'text-pink-400' },
    { label: 'Identity Entry', href: '/entry', icon: Fingerprint, description: 'Biometric venue entry', color: 'text-violet-400' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [featuresOpen, setFeaturesOpen] = useState(false);
    const pathname = usePathname();
    const { isVeloPlus } = useUser();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setFeaturesOpen(false);
            }
        };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, []);

    const handleDropdownEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setFeaturesOpen(true);
    };

    const handleDropdownLeave = () => {
        timeoutRef.current = setTimeout(() => setFeaturesOpen(false), 200);
    };

    const isFeaturePage = featureDropdown.some(f => pathname === f.href);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled
                ? 'bg-black/60 backdrop-blur-3xl border-b border-white/[0.06] shadow-2xl shadow-black/40'
                : 'bg-transparent'
                }`}
        >
            {/* Top accent line — holographic gradient */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-velo-violet/40 to-transparent opacity-60" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                {/* ─── Logo ─── */}
                <Link href="/" className="flex items-center gap-3 group relative">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center shadow-lg group-hover:shadow-velo-violet/40 transition-all duration-500 group-hover:scale-110">
                            <Ticket className="w-5 h-5 text-white" />
                        </div>
                        {/* Glow on hover */}
                        <div className="absolute inset-0 rounded-xl bg-velo-violet/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-xl font-bold tracking-tight text-white">Velo</span>
                        {isVeloPlus && <VeloPlusBadge />}
                    </div>
                </Link>

                {/* ─── Desktop Nav ─── */}
                <nav className="hidden md:flex items-center gap-1">
                    {mainLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                                    ? 'text-white text-shadow-glow'
                                    : 'text-white/50 hover:text-white'
                                    }`}
                            >
                                <span className="relative z-10">{link.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-white/[0.07] rounded-lg border border-white/[0.1]"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                            </Link>
                        );
                    })}

                    {/* Features Mega-Dropdown */}
                    <div
                        ref={dropdownRef}
                        className="relative"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button
                            className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${featuresOpen || isFeaturePage ? 'text-white' : 'text-white/50 hover:text-white'
                                }`}
                            onClick={() => setFeaturesOpen(!featuresOpen)}
                        >
                            <Sparkles size={13} className={featuresOpen ? 'text-velo-violet' : ''} />
                            <span>Features</span>
                            <ChevronDown size={12} className={`transition-transform duration-300 ${featuresOpen ? 'rotate-180' : ''}`} />
                            {isFeaturePage && !featuresOpen && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-white/[0.07] rounded-lg border border-white/[0.1]"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                        </button>

                        <AnimatePresence>
                            {featuresOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                    className="absolute top-full right-0 mt-2 w-80 rounded-2xl overflow-hidden"
                                >
                                    {/* Dropdown card */}
                                    <div className="bg-black/80 backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 p-2">
                                        {/* Header */}
                                        <div className="px-3 pt-2 pb-3 border-b border-white/[0.04]">
                                            <p className="text-[10px] font-bold text-velo-violet uppercase tracking-[0.2em]">Platform Features</p>
                                        </div>

                                        {/* Links */}
                                        <div className="py-1">
                                            {featureDropdown.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setFeaturesOpen(false)}
                                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${pathname === item.href
                                                        ? 'bg-white/[0.06]'
                                                        : 'hover:bg-white/[0.04]'
                                                        }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center ${item.color} group-hover:bg-white/[0.08] transition-colors`}>
                                                        <item.icon size={16} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-white">{item.label}</p>
                                                        <p className="text-[11px] text-white/30">{item.description}</p>
                                                    </div>
                                                    {pathname === item.href && (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-velo-violet" />
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>

                {/* ─── Right Actions ─── */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <button
                        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.12] text-sm text-white/40 hover:text-white/70 transition-all duration-300 group"
                    >
                        <Search size={14} />
                        <span className="text-xs">Search</span>
                        <div className="flex gap-0.5 text-[10px] font-mono opacity-40 bg-white/[0.04] px-1.5 py-0.5 rounded-md">
                            <span>⌘</span>
                            <span>K</span>
                        </div>
                    </button>

                    {/* Account */}
                    <Link
                        href="/account"
                        className="hidden md:flex relative w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] items-center justify-center text-white/40 hover:text-white transition-all duration-300 group"
                    >
                        <User size={16} />
                    </Link>

                    {/* CTA */}
                    <Link
                        href="/events"
                        className="hidden md:inline-flex btn-magic text-sm gap-2 !py-2.5 !px-5 !rounded-xl"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Sparkles size={14} />
                            Explore Events
                        </span>
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* ─── Mobile Menu ─── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="md:hidden bg-black/90 backdrop-blur-3xl border-t border-white/[0.06] overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
                            {/* Main Links */}
                            {mainLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`text-lg font-medium py-3 px-4 rounded-xl transition-all ${isActive
                                            ? 'text-white bg-white/[0.06]'
                                            : 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}

                            {/* Features section */}
                            <div className="mt-4 pt-4 border-t border-white/[0.04]">
                                <p className="text-[10px] font-bold text-velo-violet uppercase tracking-[0.2em] px-4 mb-3">Features</p>
                                {featureDropdown.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${pathname === item.href
                                            ? 'text-white bg-white/[0.06]'
                                            : 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                                            }`}
                                    >
                                        <item.icon size={18} className={item.color} />
                                        <div>
                                            <p className="text-sm font-medium">{item.label}</p>
                                            <p className="text-[11px] text-white/30">{item.description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile CTA */}
                            <Link
                                href="/events"
                                onClick={() => setMobileOpen(false)}
                                className="btn-magic text-center mt-6 !rounded-xl"
                            >
                                <Sparkles size={16} className="inline mr-2" />
                                Explore Events
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
