"use client";

import { useState, useEffect } from 'react';

export interface EventReview {
    id: string;
    eventId: string;
    eventName: string;
    venueName: string;
    rating: number; // 1-5
    headline: string;
    body: string;
    atmosphere: number; // 1-5
    value: number; // 1-5
    venueQuality: number; // 1-5
    highlightMoment?: string;
    createdAt: string;
    userName: string;
    userAvatar?: string;
    photoUrl?: string; // User-uploaded memory
}

const STORAGE_KEY = 'velo_reviews';

export function useReviews() {
    const [reviews, setReviews] = useState<EventReview[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setReviews(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load reviews', e);
            }
        }
    }, []);

    const saveReviews = (updated: EventReview[]) => {
        setReviews(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const addReview = (review: Omit<EventReview, 'id' | 'createdAt'>) => {
        const newReview: EventReview = {
            ...review,
            id: `rev-${Date.now()}`,
            createdAt: new Date().toISOString(),
        };
        saveReviews([newReview, ...reviews]);
        return newReview;
    };

    const getReviewsForEvent = (eventId: string) =>
        reviews.filter(r => r.eventId === eventId);

    const getAverageRating = (eventId: string) => {
        const eventReviews = getReviewsForEvent(eventId);
        if (eventReviews.length === 0) return 0;
        return eventReviews.reduce((sum, r) => sum + r.rating, 0) / eventReviews.length;
    };

    return {
        reviews,
        addReview,
        getReviewsForEvent,
        getAverageRating,
    };
}
