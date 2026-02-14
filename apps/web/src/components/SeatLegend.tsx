"use client";

import type { Section } from '../types/venue';

interface SeatLegendProps {
    sections: Section[];
    basePrice: number;
}

export default function SeatLegend({ sections, basePrice }: SeatLegendProps) {
    // Get unique sections (some venues have duplicate section names)
    const uniqueSections = sections.reduce((acc, section) => {
        if (!acc.find(s => s.name === section.name)) {
            acc.push(section);
        }
        return acc;
    }, [] as Section[]);

    const getAvailableCount = (section: Section): number => {
        return section.seats.filter(s => s.status === 'available').length;
    };

    return (
        <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-velo-text-muted mb-3">
                Section Pricing
            </h4>

            <div className="space-y-2">
                {uniqueSections.map((section, i) => (
                    <div
                        key={`${section.id}-${i}`}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
                    >
                        <div className="flex items-center gap-2.5 flex-1">
                            <div
                                className="w-4 h-4 rounded-sm border border-white/20"
                                style={{ backgroundColor: section.color }}
                            />
                            <span className="text-sm text-white font-medium">{section.name}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs text-velo-text-muted">
                                {getAvailableCount(section)} left
                            </span>
                            <span className="text-sm font-bold text-velo-cyan">
                                £{Math.round(basePrice * section.priceMultiplier)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend for seat status */}
            <div className="pt-3 border-t border-white/[0.05]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-velo-text-muted mb-2">
                    Seat Status
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-velo-text-secondary">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-600" />
                        <span className="text-velo-text-secondary">Taken</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
