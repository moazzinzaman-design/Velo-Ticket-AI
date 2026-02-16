'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Image as ImageIcon, ChevronRight, Check, Award } from 'lucide-react';
import MagneticButton from '../visuals/MagneticButton';

const steps = [
    { number: 1, label: 'Event Details', icon: Calendar },
    { number: 2, label: 'Venue', icon: MapPin },
    { number: 3, label: 'Listing Tier', icon: Award },
    { number: 4, label: 'Pricing', icon: DollarSign },
    { number: 5, label: 'Assets', icon: ImageIcon },
];

export default function CreateEventForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Music',
        date: '',
        time: '',
        venue: '',
        address: '',
        capacity: '',
        tier: 'starter',
        priceStandard: '',
        priceVIP: '',
    });

    const handleNext = () => {
        if (currentStep < steps.length) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Stepper */}
            <div className="mb-12 relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -z-10" />
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-velo-cyan -z-10 transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />

                <div className="flex justify-between">
                    {steps.map((step) => (
                        <div key={step.number} className="flex flex-col items-center gap-2 bg-black px-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step.number
                                    ? 'bg-velo-cyan text-black shadow-lg shadow-velo-cyan/25'
                                    : 'bg-white/10 text-white/40'
                                    }`}
                            >
                                {currentStep > step.number ? <Check size={18} /> : <step.icon size={18} />}
                            </div>
                            <span className={`text-xs font-medium ${currentStep >= step.number ? 'text-white' : 'text-white/40'}`}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6">Event Details</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">Event Title</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-velo-cyan transition-colors"
                                            placeholder="e.g. Neon Nights Festival 2026"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-white/60 mb-2">Date</label>
                                            <input
                                                type="date"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-velo-cyan transition-colors"
                                                value={formData.date}
                                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white/60 mb-2">Time</label>
                                            <input
                                                type="time"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-velo-cyan transition-colors"
                                                value={formData.time}
                                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">Description</label>
                                        <textarea
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-velo-cyan transition-colors h-32"
                                            placeholder="Tell potential attendees what to expect..."
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6">Venue Location</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">Venue Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-velo-cyan transition-colors"
                                            placeholder="e.g. The O2 Arena"
                                            value={formData.venue}
                                            onChange={e => setFormData({ ...formData, venue: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">Address</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-velo-cyan transition-colors"
                                            placeholder="Full street address"
                                            value={formData.address}
                                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">Capacity</label>
                                        <input
                                            type="number"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-velo-cyan transition-colors"
                                            placeholder="Total tickets available"
                                            value={formData.capacity}
                                            onChange={e => setFormData({ ...formData, capacity: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6">Select Listing Tier</h2>
                                <p className="text-white/60 mb-8">Choose the right package for your event size and needs.</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Starter Tier */}
                                    <div
                                        onClick={() => setFormData({ ...formData, tier: 'starter' })}
                                        className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${formData.tier === 'starter'
                                            ? 'bg-white/10 border-velo-cyan shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                                            : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-bold text-xl">Starter</h3>
                                            {formData.tier === 'starter' && <div className="w-6 h-6 rounded-full bg-velo-cyan flex items-center justify-center"><Check size={14} className="text-black" /></div>}
                                        </div>
                                        <div className="text-3xl font-bold mb-1">Free</div>
                                        <div className="text-sm text-white/40 mb-6">Per event</div>

                                        <ul className="space-y-3 text-sm text-white/70">
                                            <li className="flex items-center gap-2"><Check size={14} className="text-velo-cyan" /> Basic Listing</li>
                                            <li className="flex items-center gap-2"><Check size={14} className="text-velo-cyan" /> Up to 100 Tickets</li>
                                            <li className="flex items-center gap-2"><Check size={14} className="text-velo-cyan" /> Standard Support</li>
                                        </ul>
                                    </div>

                                    {/* Pro Tier */}
                                    <div
                                        onClick={() => setFormData({ ...formData, tier: 'pro' })}
                                        className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${formData.tier === 'pro'
                                            ? 'bg-white/10 border-velo-violet shadow-[0_0_30px_rgba(139,92,246,0.15)]'
                                            : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
                                            }`}
                                    >
                                        {formData.tier === 'pro' && <div className="absolute top-0 right-0 px-3 py-1 bg-velo-violet text-xs font-bold rounded-bl-xl">SELECTED</div>}
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-bold text-xl text-velo-violet">Pro</h3>
                                            {formData.tier === 'pro' && <div className="w-6 h-6 rounded-full bg-velo-violet flex items-center justify-center"><Check size={14} className="text-white" /></div>}
                                        </div>
                                        <div className="text-3xl font-bold mb-1">£49</div>
                                        <div className="text-sm text-white/40 mb-6">Per event</div>

                                        <ul className="space-y-3 text-sm text-white/70">
                                            <li className="flex items-center gap-2"><Check size={14} className="text-velo-violet" /> Featured Placement</li>
                                            <li className="flex items-center gap-2"><Check size={14} className="text-velo-violet" /> Up to 5,000 Tickets</li>
                                            <li className="flex items-center gap-2"><Check size={14} className="text-velo-violet" /> Basic Analytics</li>
                                            <li className="flex items-center gap-2"><Check size={14} className="text-velo-violet" /> Email Support</li>
                                        </ul>
                                    </div>

                                    {/* Enterprise Tier */}
                                    <div
                                        onClick={() => setFormData({ ...formData, tier: 'enterprise' })}
                                        className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${formData.tier === 'enterprise'
                                            ? 'bg-white/10 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.15)]'
                                            : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-bold text-xl text-amber-400">Enterprise</h3>
                                            {formData.tier === 'enterprise' && <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center"><Check size={14} className="text-black" /></div>}
                                        </div>
                                        <div className="text-3xl font-bold mb-1">£199</div>
                                        <div className="text-sm text-white/40 mb-6">Per event</div>

                                        <ul className="space-y-3 text-sm text-white/70">
                                            <li className="flex items-center gap-2"><Check size={14} className="text-amber-400" /> Top Listing Priority</li>
                                            <li className="flex items-center gap-2"><Check size={14} className="text-amber-400" /> Unlimited Tickets</li>
                                            <li className="flex items-center gap-2"><Check size={14} className="text-amber-400" /> Dedicated Account Mgr</li>
                                            <li className="flex items-center gap-2"><Check size={14} className="text-amber-400" /> API Access</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6">Pricing Strategy</h2>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">Standard Ticket Price (£)</label>
                                        <input
                                            type="number"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-velo-cyan transition-colors"
                                            placeholder="50.00"
                                            value={formData.priceStandard}
                                            onChange={e => setFormData({ ...formData, priceStandard: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">VIP Ticket Price (£)</label>
                                        <input
                                            type="number"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-velo-cyan transition-colors"
                                            placeholder="150.00"
                                            value={formData.priceVIP}
                                            onChange={e => setFormData({ ...formData, priceVIP: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-white mb-2">Revenue Projection</h4>
                                    <p className="text-sm text-white/60">Based on {formData.capacity || '0'} capacity:</p>
                                    <div className="text-2xl font-bold text-velo-emerald mt-2">
                                        £{((parseInt(formData.capacity) || 0) * (parseInt(formData.priceStandard) || 0)).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="text-center py-20">
                                <ImageIcon size={48} className="mx-auto text-white/20 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Upload Event Assets</h3>
                                <p className="text-white/50 mb-8">Drag and drop your event poster and banner images here.</p>
                                <button className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
                                    Choose Files
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`px-6 py-3 rounded-xl font-medium transition-colors ${currentStep === 1 ? 'text-white/20 cursor-not-allowed' : 'text-white hover:bg-white/5'
                            }`}
                    >
                        Back
                    </button>

                    <div onClick={handleNext}>
                        <MagneticButton className="bg-white text-black font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2">
                            {currentStep === steps.length ? 'Publish Event' : 'Next Step'}
                            <ChevronRight size={18} />
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
