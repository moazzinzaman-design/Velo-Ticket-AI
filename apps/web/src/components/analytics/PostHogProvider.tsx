'use client';
import { Suspense, useEffect } from 'react';
import posthog from 'posthog-js';
import { usePathname, useSearchParams } from 'next/navigation';
import { POSTHOG_KEY, POSTHOG_HOST } from '../../lib/analytics/posthog';

function PostHogPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (POSTHOG_KEY && pathname) {
            let url = window.origin + pathname;
            if (searchParams && searchParams.toString()) {
                url = url + `?${searchParams.toString()}`;
            }
            posthog.capture('$pageview', {
                '$current_url': url,
            });
        }
    }, [pathname, searchParams]);

    return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (POSTHOG_KEY) {
            posthog.init(POSTHOG_KEY, {
                api_host: POSTHOG_HOST || 'https://app.posthog.com',
                capture_pageview: false, // We track manually
            });
        }
    }, []);

    return (
        <>
            <Suspense fallback={null}>
                <PostHogPageView />
            </Suspense>
            {children}
        </>
    );
}
