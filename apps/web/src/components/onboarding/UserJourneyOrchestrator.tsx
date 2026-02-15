"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import OnboardingFlow from './OnboardingFlow';
import AIWalkthrough from './AIWalkthrough';
import { useUser } from '../../hooks/useUser';

export default function UserJourneyOrchestrator() {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showWalkthrough, setShowWalkthrough] = useState(false);
    const { user, loading } = useUser();
    const pathname = usePathname();

    useEffect(() => {
        // Only trigger on client side mount
        if (typeof window === 'undefined') return;

        // Check if onboarding is complete
        const onboardingComplete = localStorage.getItem('velo_onboarding_complete');

        // If not complete and we are on the home page (or general entry), start flow
        // We might want to skip this if the user is ALREADY logged in from a previous session
        // but hasn't "completed" the specific onboarding flow we just built.
        // For this "Journey" demo, we'll force it if the flag isn't set, regardless of auth initially,
        // OR if the user is not logged in.

        if (!onboardingComplete && pathname === '/') {
            // If user is already logged in, maybe just show walkthrough?
            // The prompt says "When they first access... make an account".
            // If they are already logged in, we assume they have an account.
            if (!loading) {
                if (!user) {
                    setShowOnboarding(true);
                } else {
                    // User has account but hasn't done "journey" -> maybe just walkthrough?
                    // Let's check a separate flag for walkthrough
                    const walkthroughComplete = localStorage.getItem('velo_walkthrough_complete');
                    if (!walkthroughComplete) {
                        setShowWalkthrough(true);
                    }
                }
            }
        }
    }, [user, loading, pathname]);

    const handleOnboardingComplete = () => {
        setShowOnboarding(false);
        // User has presumably created an account or selected interests
        // Now trigger walkthrough
        setTimeout(() => setShowWalkthrough(true), 500);
    };

    const handleWalkthroughComplete = () => {
        setShowWalkthrough(false);
        localStorage.setItem('velo_onboarding_complete', 'true');
        localStorage.setItem('velo_walkthrough_complete', 'true');
    };

    if (loading) return null;

    return (
        <>
            {showOnboarding && <OnboardingFlow onComplete={handleOnboardingComplete} />}
            {showWalkthrough && <AIWalkthrough onComplete={handleWalkthroughComplete} />}
        </>
    );
}
