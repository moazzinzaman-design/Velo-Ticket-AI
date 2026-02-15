"use client";

import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';

interface LocationSelectorProps {
    onLocationChange: (location: { city?: string; lat?: number; lng?: number }) => void;
    onRequestGeolocation: () => void;
    currentCity?: string;
    isLoadingLocation?: boolean;
}

const UK_CITIES = [
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Manchester', lat: 53.4808, lng: -2.2426 },
    { name: 'Birmingham', lat: 52.4862, lng: -1.8904 },
    { name: 'Leeds', lat: 53.8008, lng: -1.5491 },
    { name: 'Glasgow', lat: 55.8642, lng: -4.2518 },
    { name: 'Bristol', lat: 51.4545, lng: -2.5879 },
    { name: 'Liverpool', lat: 53.4084, lng: -2.9916 },
    { name: 'Edinburgh', lat: 55.9533, lng: -3.1883 },
    { name: 'Cardiff', lat: 51.4816, lng: -3.1791 },
    { name: 'Newcastle', lat: 54.9783, lng: -1.6178 },
];

export default function LocationSelector({
    onLocationChange,
    onRequestGeolocation,
    currentCity = 'London',
    isLoadingLocation = false,
}: LocationSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleCitySelect = (city: typeof UK_CITIES[0]) => {
        onLocationChange({
            city: city.name,
            lat: city.lat,
            lng: city.lng,
        });
        setIsOpen(false);
    };

    return (
        <div className="flex items-center gap-3">
            {/* Near Me Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRequestGeolocation}
                disabled={isLoadingLocation}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-velo-violet/10 hover:bg-velo-violet/20 border border-velo-violet/30 text-velo-violet transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoadingLocation ? (
                    <div className="w-4 h-4 border-2 border-velo-violet/30 border-t-velo-violet rounded-full animate-spin" />
                ) : (
                    <Navigation className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">Near Me</span>
            </motion.button>

            {/* City Selector */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors"
                >
                    <MapPin className="w-4 h-4 text-velo-cyan" />
                    <span className="text-sm font-medium">{currentCity}</span>
                    <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        {/* Dropdown Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full mt-2 left-0 z-20 w-48 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden"
                        >
                            <div className="p-2 space-y-1">
                                {UK_CITIES.map((city) => (
                                    <button
                                        key={city.name}
                                        onClick={() => handleCitySelect(city)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentCity === city.name
                                                ? 'bg-velo-violet/20 text-velo-violet'
                                                : 'hover:bg-white/5 text-white/80 hover:text-white'
                                            }`}
                                    >
                                        {city.name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
}
