import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface AffiliateClick {
    eventId: string;
    eventTitle: string;
    platform: 'skiddle' | 'ticketmaster' | 'seatgeek' | 'velo';
    userId?: string;
    purchaseUrl: string;
}

/**
 * Track when a user clicks through to a partner platform
 * Used for analytics and commission attribution
 */
export async function trackAffiliateClick(data: AffiliateClick): Promise<void> {
    try {
        const { error } = await supabase
            .from('affiliate_clicks')
            .insert({
                event_id: data.eventId,
                event_title: data.eventTitle,
                platform: data.platform,
                user_id: data.userId || null,
                referrer: typeof window !== 'undefined' ? document.referrer : null,
                user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
            });

        if (error) {
            console.error('Failed to track affiliate click:', error);
        }

        // Also track in PostHog if available
        if (typeof window !== 'undefined' && (window as any).posthog) {
            (window as any).posthog.capture('affiliate_click', {
                event_id: data.eventId,
                event_title: data.eventTitle,
                platform: data.platform,
                purchase_url: data.purchaseUrl
            });
        }
    } catch (error) {
        // Silently fail - don't block user flow
        console.error('Affiliate tracking error:', error);
    }
}

/**
 * Get affiliate click stats for analytics
 */
export async function getAffiliateStats(timeRange: 'day' | 'week' | 'month' = 'week') {
    try {
        const now = new Date();
        const daysAgo = timeRange === 'day' ? 1 : timeRange === 'week' ? 7 : 30;
        const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

        const { data, error } = await supabase
            .from('affiliate_clicks')
            .select('*')
            .gte('clicked_at', startDate.toISOString());

        if (error) throw error;

        // Aggregate stats
        const stats = {
            totalClicks: data.length,
            byPlatform: {} as Record<string, number>,
            byEvent: {} as Record<string, number>,
            uniqueUsers: new Set(data.filter(d => d.user_id).map(d => d.user_id)).size
        };

        data.forEach(click => {
            stats.byPlatform[click.platform] = (stats.byPlatform[click.platform] || 0) + 1;
            stats.byEvent[click.event_id] = (stats.byEvent[click.event_id] || 0) + 1;
        });

        return stats;
    } catch (error) {
        console.error('Failed to get affiliate stats:', error);
        return null;
    }
}
