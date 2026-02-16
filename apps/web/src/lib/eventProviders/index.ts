import { TicketmasterProvider } from './ticketmaster';
import { SkiddleProvider } from './skiddle';
import { SeatGeekProvider } from './seatgeek';
import { EventProvider, EventSearchParams } from './base';
import { RealEvent } from '../../data/realEvents';

/**
 * Unified event aggregator — fetches from all providers and deduplicates
 */
export class EventAggregator {
    private providers: EventProvider[] = [];

    constructor() {
        // Initialize providers with API keys from environment
        if (process.env.TICKETMASTER_API_KEY) {
            this.providers.push(new TicketmasterProvider({
                apiKey: process.env.TICKETMASTER_API_KEY,
                baseUrl: 'https://app.ticketmaster.com/discovery/v2',
                rateLimit: { requestsPerSecond: 5, requestsPerDay: 5000 },
            }));
        }

        if (process.env.SKIDDLE_API_KEY) {
            this.providers.push(new SkiddleProvider({
                apiKey: process.env.SKIDDLE_API_KEY,
                baseUrl: 'https://www.skiddle.com/api/v1',
            }));
        }

        if (process.env.SEATGEEK_CLIENT_ID) {
            this.providers.push(new SeatGeekProvider({
                apiKey: process.env.SEATGEEK_CLIENT_ID,
                baseUrl: 'https://api.seatgeek.com/2',
            }));
        }

        if (this.providers.length === 0) {
            console.warn('No event provider API keys configured. Using mock data only.');
        }
    }

    async searchEvents(params: EventSearchParams): Promise<RealEvent[]> {
        if (this.providers.length === 0) {
            console.warn('No event provider API keys configured. Returning empty list (Real Data Strict Mode).');
            return [];
        }

        // Fetch from all providers in parallel
        const results = await Promise.allSettled(
            this.providers.map(provider => provider.search(params))
        );

        // Combine and deduplicate
        const allEvents: RealEvent[] = [];
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                allEvents.push(...result.value);
            } else {
                console.error('Provider search failed:', result.reason);
            }
        });

        const deduplicated = this.deduplicateEvents(allEvents);

        // Sort by relevance (proximity if location provided, otherwise by date)
        const sorted = this.sortEventsByRelevance(deduplicated, params);

        return sorted.slice(0, params.limit || 50);
    }

    /**
     * Deduplicate events based on title + venue + date
     */
    private deduplicateEvents(events: RealEvent[]): RealEvent[] {
        const seen = new Set<string>();
        const unique: RealEvent[] = [];

        for (const event of events) {
            const key = this.generateEventKey(event);
            if (!seen.has(key)) {
                seen.add(key);
                unique.push(event);
            }
        }

        return unique;
    }

    private generateEventKey(event: RealEvent): string {
        // Normalize title (lowercase, remove special chars)
        const title = event.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        const venue = event.venue.toLowerCase().replace(/[^a-z0-9]/g, '');
        const date = event.date;
        return `${title}|${venue}|${date}`;
    }

    /**
     * Sort events by relevance
     */
    private sortEventsByRelevance(events: RealEvent[], params: EventSearchParams): RealEvent[] {
        if (params.lat && params.lng) {
            // Sort by proximity
            return events.sort((a, b) => {
                const distA = this.calculateDistance(
                    params.lat!,
                    params.lng!,
                    a.location.coordinates.lat,
                    a.location.coordinates.lng
                );
                const distB = this.calculateDistance(
                    params.lat!,
                    params.lng!,
                    b.location.coordinates.lat,
                    b.location.coordinates.lng
                );
                return distA - distB;
            });
        }

        // Sort by date (soonest first)
        return events.sort((a, b) => {
            const dateA = this.parseEventDate(a.date);
            const dateB = this.parseEventDate(b.date);
            return dateA.getTime() - dateB.getTime();
        });
    }

    /**
     * Haversine formula for distance calculation
     */
    private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
        const R = 3959; // Earth's radius in miles
        const dLat = this.toRadians(lat2 - lat1);
        const dLng = this.toRadians(lng2 - lng1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(lat1)) *
            Math.cos(this.toRadians(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private toRadians(degrees: number): number {
        return (degrees * Math.PI) / 180;
    }

    private parseEventDate(dateStr: string): Date {
        // Handle various date formats from providers
        const now = new Date();
        const currentYear = now.getFullYear();

        // Try parsing "Aug 22", "Mar 15, 2026", etc.
        try {
            const withYear = dateStr.includes(',') ? dateStr : `${dateStr}, ${currentYear}`;
            return new Date(withYear);
        } catch {
            return now;
        }
    }

    getConfiguredProviders(): string[] {
        return this.providers.map(p => p.name);
    }
}

// Singleton instance
export const eventAggregator = new EventAggregator();
