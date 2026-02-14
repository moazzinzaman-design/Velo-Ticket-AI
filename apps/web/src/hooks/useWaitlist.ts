"use client";

import { useState, useEffect, useCallback } from 'react';

export interface WaitlistEntry {
    eventId: number;
    eventTitle: string;
    email: string;
    joinedAt: string;
    notified: boolean;
}

const STORAGE_KEY = 'velo_waitlist';

export function useWaitlist() {
    const [entries, setEntries] = useState<WaitlistEntry[]>([]);
    const [availableEvents, setAvailableEvents] = useState<number[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setEntries(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse waitlist:', e);
            }
        }
    }, []);

    // Save to localStorage whenever entries change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }, [entries]);

    const joinWaitlist = useCallback((eventId: number, eventTitle: string, email: string) => {
        const newEntry: WaitlistEntry = {
            eventId,
            eventTitle,
            email,
            joinedAt: new Date().toISOString(),
            notified: false,
        };

        setEntries(prev => {
            // Check if already on waitlist
            if (prev.some(e => e.eventId === eventId)) {
                return prev;
            }
            return [...prev, newEntry];
        });

        return true;
    }, []);

    const removeFromWaitlist = useCallback((eventId: number) => {
        setEntries(prev => prev.filter(e => e.eventId !== eventId));
    }, []);

    const isOnWaitlist = useCallback((eventId: number) => {
        return entries.some(e => e.eventId === eventId);
    }, [entries]);

    const markAsNotified = useCallback((eventId: number) => {
        setEntries(prev => prev.map(e =>
            e.eventId === eventId ? { ...e, notified: true } : e
        ));
    }, []);

    // Check if waitlisted events are now available
    // In a real app, this would check against a backend API
    // For now, we'll expose this for manual testing
    const checkAvailability = useCallback((availableEventIds: number[]) => {
        const newlyAvailable = entries
            .filter(e => !e.notified && availableEventIds.includes(e.eventId))
            .map(e => e.eventId);

        if (newlyAvailable.length > 0) {
            setAvailableEvents(newlyAvailable);
            // Mark as notified
            newlyAvailable.forEach(id => markAsNotified(id));
        }
    }, [entries, markAsNotified]);

    const clearNotifications = useCallback(() => {
        setAvailableEvents([]);
    }, []);

    const getWaitlistCount = useCallback(() => {
        return entries.length;
    }, [entries]);

    return {
        entries,
        availableEvents,
        joinWaitlist,
        removeFromWaitlist,
        isOnWaitlist,
        checkAvailability,
        clearNotifications,
        getWaitlistCount,
    };
}
