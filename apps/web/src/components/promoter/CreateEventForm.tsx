'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Image as ImageIcon, ChevronRight, Check } from 'lucide-react';
import MagneticButton from '../visuals/MagneticButton';

const steps = [
    { number: 1, label: 'Event Details', icon: Calendar },
    { number: 2, label: 'Venue', icon: MapPin },
    { number: 3, label: 'Pricing', icon: DollarSign },
    { number: 4, label: 'Assets', icon: ImageIcon },
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

                        {/* Placeholder for other steps to keep code concise for now */}
                        {currentStep >= 3 && (
                            <div className="text-center py-20">
                                <p className="text-white/50">Additional steps (Pricing & Assets) would go here.</p>
                                <p className="text-sm mt-2 text-velo-cyan">Click 'Next' to simulate completion.</p>
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
