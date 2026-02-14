"use client";

import { useState, useCallback, useEffect } from 'react';
import type { CreateGroupParams, GroupBooking, GroupMember } from '../types/group';

const STORAGE_KEY = 'velo_group_bookings';

export function useGroupBooking() {
    const [activeGroup, setActiveGroup] = useState<GroupBooking | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const groups = JSON.parse(stored);
                if (Array.isArray(groups) && groups.length > 0) {
                    setActiveGroup(groups[groups.length - 1]);
                }
            } catch (e) {
                console.error('Failed to parse group bookings:', e);
            }
        }
    }, []);

    const createGroup = useCallback((params: CreateGroupParams): GroupBooking => {
        const inviteCode = 'VELO-' + Math.random().toString(36).substring(2, 6).toUpperCase();

        // Captain is always the first member
        const captainMember: GroupMember = {
            id: 'captain',
            name: params.captainName,
            email: params.captainEmail,
            shareAmount: params.totalAmount / params.seats.length,
            status: 'paid', // Captain pays immediately in this flow
            seatId: params.seats[0],
            joinedAt: new Date().toISOString(),
            paidAt: new Date().toISOString(),
        };

        // Create pending members for other seats
        // status is implicitly 'pending' via type definition but explicitly set here for clarity
        const pendingMembers: GroupMember[] = params.seats.slice(1).map((seatId, index) => ({
            id: Math.random().toString(36).substring(2, 9),
            name: `Friend ${index + 1}`,
            shareAmount: params.totalAmount / params.seats.length,
            status: 'pending',
            seatId: seatId,
        }));

        const newGroup: GroupBooking = {
            id: inviteCode,
            ...params,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 mins expiry
            members: [captainMember, ...pendingMembers],
        };

        // Save to storage
        const existingStored = localStorage.getItem(STORAGE_KEY);
        const existing = existingStored ? JSON.parse(existingStored) : [];
        if (Array.isArray(existing)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, newGroup]));
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([newGroup]));
        }

        setActiveGroup(newGroup);

        return newGroup;
    }, []);

    const getGroup = useCallback((inviteCode: string): GroupBooking | null => {
        if (typeof window === 'undefined') return null;

        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        try {
            const groups = JSON.parse(stored) as GroupBooking[];
            return groups.find(g => g.id === inviteCode) || null;
        } catch (e) {
            console.error('Failed to parse group bookings:', e);
            return null;
        }
    }, []);

    const payShare = useCallback((inviteCode: string, memberId: string, email: string) => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return false;

        try {
            const groups = JSON.parse(stored) as GroupBooking[];
            const groupIndex = groups.findIndex(g => g.id === inviteCode);

            if (groupIndex === -1) return false;

            const group = groups[groupIndex];
            const memberIndex = group.members.findIndex(m => m.id === memberId);

            if (memberIndex === -1) return false;

            // Update member status
            group.members[memberIndex].status = 'paid';
            group.members[memberIndex].email = email;
            group.members[memberIndex].paidAt = new Date().toISOString();

            // Update storage
            groups[groupIndex] = group;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));

            // If this is the active group, update state
            setActiveGroup(prev => {
                if (prev && prev.id === inviteCode) {
                    return group;
                }
                return prev;
            });

            return true;
        } catch (e) {
            console.error('Failed to update payment:', e);
            return false;
        }
    }, []);

    const getProgress = useCallback(() => {
        if (!activeGroup) return 0;
        const paid = activeGroup.members.filter(m => m.status === 'paid').length;
        if (activeGroup.members.length === 0) return 0;
        return (paid / activeGroup.members.length) * 100;
    }, [activeGroup]);

    return {
        activeGroup,
        createGroup,
        getGroup,
        payShare,
        getProgress,
    };
}
