"use client";

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { VenueLayout, Section, Seat } from '../types/venue';

interface VenueMapProps {
    layout: VenueLayout;
    onSeatClick: (seat: Seat) => void;
    isSelected: (seatId: string) => boolean;
    basePrice: number;
}

export default function VenueMap({ layout, onSeatClick, isSelected, basePrice }: VenueMapProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);
    const [hoveredSection, setHoveredSection] = useState<Section | null>(null);
    const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // Zoom with mouse wheel
    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY * -0.001;
        const newScale = Math.min(Math.max(0.5, transform.scale + delta), 3);
        setTransform(prev => ({ ...prev, scale: newScale }));
    }, [transform.scale]);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;
        svg.addEventListener('wheel', handleWheel, { passive: false });
        return () => svg.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    // Pan with drag
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return; // Only left click
        setIsDragging(true);
        setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setTransform(prev => ({
            ...prev,
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        }));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const getSeatColor = (seat: Seat, section: Section): string => {
        if (isSelected(seat.id)) return '#3b82f6'; // Blue for selected
        if (seat.status === 'taken') return '#6b7280'; // Gray for taken
        if (seat.status === 'reserved') return '#eab308'; // Yellow for reserved
        return section.color; // Section color for available
    };

    const getSectionPrice = (section: Section): string => {
        return `£${Math.round(basePrice * section.priceMultiplier)}`;
    };

    return (
        <div className="relative w-full h-full bg-velo-bg-card rounded-2xl overflow-hidden border border-white/10">
            {/* Controls overlay */}
            <div className="absolute top-4 right-4 z-20 bg-velo-bg-deep/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                <p className="text-xs text-velo-text-muted">
                    Zoom: {Math.round(transform.scale * 100)}% | Scroll to zoom, drag to pan
                </p>
            </div>

            {/* Tooltip */}
            {hoveredSeat && hoveredSection && (
                <div className="absolute top-4 left-4 z-20 bg-velo-bg-deep/95 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10 shadow-xl">
                    <div className="text-sm font-semibold text-white mb-1">
                        {hoveredSection.name}
                    </div>
                    <div className="text-xs text-velo-text-secondary">
                        Seat {hoveredSeat.row}-{hoveredSeat.number}
                    </div>
                    <div className="text-sm font-bold text-velo-cyan mt-1">
                        {getSectionPrice(hoveredSection)}
                    </div>
                </div>
            )}

            <svg
                ref={svgRef}
                viewBox={`0 0 ${layout.width} ${layout.height}`}
                className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                    transform: `scale(${transform.scale}) translate(${transform.x / transform.scale}px, ${transform.y / transform.scale}px)`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
            >
                {/* Background */}
                <rect x="0" y="0" width={layout.width} height={layout.height} fill="#0a0a0f" />

                {/* Stage */}
                {layout.stage && (
                    <g>
                        <polygon
                            points={layout.stage.map(p => `${p.x},${p.y}`).join(' ')}
                            fill="#1e293b"
                            stroke="#475569"
                            strokeWidth="2"
                        />
                        <text
                            x={(layout.stage[0].x + layout.stage[1].x) / 2}
                            y={(layout.stage[0].y + layout.stage[2].y) / 2 + 8}
                            textAnchor="middle"
                            fill="#94a3b8"
                            fontSize="14"
                            fontWeight="600"
                        >
                            STAGE
                        </text>
                    </g>
                )}

                {/* Sections */}
                {layout.sections.map((section) => (
                    <g key={section.id}>
                        {/* Section polygon background */}
                        <polygon
                            points={section.polygon.map(p => `${p.x},${p.y}`).join(' ')}
                            fill={section.color}
                            fillOpacity="0.1"
                            stroke={section.color}
                            strokeWidth="1"
                            strokeOpacity="0.3"
                            onMouseEnter={() => setHoveredSection(section)}
                            onMouseLeave={() => setHoveredSection(null)}
                            className="pointer-events-auto"
                        />

                        {/* Seats */}
                        {section.seats.map((seat) => (
                            <circle
                                key={seat.id}
                                cx={seat.x}
                                cy={seat.y}
                                r="4"
                                fill={getSeatColor(seat, section)}
                                stroke={isSelected(seat.id) ? '#60a5fa' : 'none'}
                                strokeWidth={isSelected(seat.id) ? '2' : '0'}
                                opacity={seat.status === 'taken' ? 0.3 : 1}
                                className={`transition-all duration-200 ${seat.status === 'available' ? 'cursor-pointer hover:r-6' : 'cursor-not-allowed'
                                    }`}
                                onClick={() => seat.status === 'available' && onSeatClick(seat)}
                                onMouseEnter={() => setHoveredSeat(seat)}
                                onMouseLeave={() => setHoveredSeat(null)}
                            />
                        ))}

                        {/* Section label */}
                        <text
                            x={section.polygon.reduce((sum, p) => sum + p.x, 0) / section.polygon.length}
                            y={section.polygon.reduce((sum, p) => sum + p.y, 0) / section.polygon.length}
                            textAnchor="middle"
                            fill="white"
                            fontSize="12"
                            fontWeight="600"
                            opacity="0.6"
                            pointerEvents="none"
                        >
                            {section.name.toUpperCase()}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}
