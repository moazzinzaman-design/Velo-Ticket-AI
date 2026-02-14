"use client";

import { useState, useCallback } from 'react';
import type { Seat, Section } from '../types/venue';

interface UseVenueSelectionReturn {
    selectedSeats: Seat[];
    selectSeat: (seat: Seat) => boolean;
    deselectSeat: (seatId: string) => void;
    clearSelection: () => void;
    getTotalPrice: (basePrice: number) => number;
    getSelectedSections: () => Section[];
    isSelected: (seatId: string) => boolean;
    canSelectMore: () => boolean;
}

const MAX_SEATS = 10;

export function useVenueSelection(sections: Section[]): UseVenueSelectionReturn {
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    const selectSeat = useCallback((seat: Seat): boolean => {
        if (selectedSeats.length >= MAX_SEATS) {
            return false; // Max seats reached
        }

        if (seat.status !== 'available') {
            return false; // Seat not available
        }

        if (selectedSeats.find(s => s.id === seat.id)) {
            return false; // Already selected
        }

        setSelectedSeats(prev => [...prev, { ...seat, status: 'selected' }]);
        return true;
    }, [selectedSeats]);

    const deselectSeat = useCallback((seatId: string) => {
        setSelectedSeats(prev => prev.filter(s => s.id !== seatId));
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedSeats([]);
    }, []);

    const getTotalPrice = useCallback((basePrice: number): number => {
        return selectedSeats.reduce((total, seat) => {
            const section = sections
                .flatMap(s => s)
                .find(s => s.seats.some(st => st.id === seat.id));
            const multiplier = section?.priceMultiplier ?? 1.0;
            return total + (basePrice * multiplier);
        }, 0);
    }, [selectedSeats, sections]);

    const getSelectedSections = useCallback((): Section[] => {
        const sectionIds = new Set(
            selectedSeats.map(seat => {
                const section = sections.find(s => s.seats.some(st => st.id === seat.id));
                return section?.id;
            }).filter(Boolean)
        );
        return sections.filter(s => sectionIds.has(s.id));
    }, [selectedSeats, sections]);

    const isSelected = useCallback((seatId: string): boolean => {
        return selectedSeats.some(s => s.id === seatId);
    }, [selectedSeats]);

    const canSelectMore = useCallback((): boolean => {
        return selectedSeats.length < MAX_SEATS;
    }, [selectedSeats]);

    return {
        selectedSeats,
        selectSeat,
        deselectSeat,
        clearSelection,
        getTotalPrice,
        getSelectedSections,
        isSelected,
        canSelectMore,
    };
}
