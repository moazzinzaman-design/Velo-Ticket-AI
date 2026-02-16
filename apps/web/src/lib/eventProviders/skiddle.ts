import { BaseEventProvider, EventSearchParams } from './base';
import { RealEvent } from '../../data/realEvents';

interface SkiddleEvent {
    id: string;
    eventname: string;
    venue: {
        name: string;
        town: string;
        address: string;
        latitude: string;
        longitude: string;
    };
    date: string;
    openingtimes: { doorsopen: string };
    entryprice: string;
    imageurl: string;
    eventcode: string; // LIVE, CLUB, COMEDY, FEST, SPORT
    description: string;
    link?: string; // Skiddle event page URL
}

interface SkiddleResponse {
    results: SkiddleEvent[];
    totalcount: number;
}

export class SkiddleProvider extends BaseEventProvider {
    name = 'skiddle';

    async search(params: EventSearchParams): Promise<RealEvent[]> {
        if (!this.config.apiKey) {
            console.warn('Skiddle API key not configured');
            return [];
        }

        const url = this.buildSearchUrl(params);

        try {
            const response = await this.fetchWithRetry(url);
            const data: SkiddleResponse = await response.json();

            if (!data.results) return [];

            return data.results.map((event, index) => this.normalizeEvent(event, index));
        } catch (error) {
            console.error('Skiddle API error:', error);
            return [];
        }
    }

    private buildSearchUrl(params: EventSearchParams): string {
        const baseUrl = 'https://www.skiddle.com/api/v1/events/search/';
        const searchParams = new URLSearchParams({
            api_key: this.config.apiKey,
            limit: String(params.limit || 50),
            country: 'GB', // UK focus
        });

        // Geographical search (requires all 3 params)
        if (params.lat && params.lng && params.radius) {
            searchParams.append('latitude', String(params.lat));
            searchParams.append('longitude', String(params.lng));
            searchParams.append('radius', String(params.radius));
        }

        // Event type filter
        if (params.category) {
            const eventcode = this.categoryToEventCode(params.category);
            if (eventcode) searchParams.append('eventcode', eventcode);
        }

        if (params.startDate) {
            searchParams.append('minDate', params.startDate);
        }
        if (params.endDate) {
            searchParams.append('maxDate', params.endDate);
        }

        return `${baseUrl}?${searchParams.toString()}`;
    }

    private categoryToEventCode(category: string): string {
        const mapping: Record<string, string> = {
            Concerts: 'LIVE',
            'Club Nights': 'CLUB',
            Comedy: 'COMEDY',
            Festivals: 'FEST',
            Sports: 'SPORT',
        };
        return mapping[category] || 'LIVE';
    }

    private normalizeEvent(event: SkiddleEvent, index: number): RealEvent {
        const price = this.parsePrice(event.entryprice);

        // Extract Skiddle event URL
        const purchaseUrl = event.link || `https://www.skiddle.com/whats-on/event/${event.id}`;

        // Add affiliate tracking parameter (will be replaced with actual code from Skiddle)
        const affiliateUrl = `${purchaseUrl}${purchaseUrl.includes('?') ? '&' : '?'}affiliate=velo`;

        return {
            id: `skiddle-${event.id}`,
            title: event.eventname,
            venue: event.venue.name,
            location: {
                city: event.venue.town,
                address: event.venue.address,
                coordinates: {
                    lat: parseFloat(event.venue.latitude),
                    lng: parseFloat(event.venue.longitude),
                },
            },
            date: this.formatDate(event.date),
            time: event.openingtimes.doorsopen || '19:00',
            price,
            category: this.eventCodeToCategory(event.eventcode),
            image: event.imageurl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
            tag: this.generateTag(price, event.date),
            soldPercentage: Math.floor(Math.random() * 40) + 30,
            description: event.description || event.eventname,
            // Affiliate fields
            purchaseUrl: affiliateUrl,
            source: 'skiddle',
            affiliateTracking: 'velo'
        };
    }

    private eventCodeToCategory(eventcode: string): string {
        const mapping: Record<string, string> = {
            LIVE: 'Concerts',
            CLUB: 'Nightlife',
            COMEDY: 'Comedy',
            FEST: 'Festivals',
            SPORT: 'Sports',
        };
        return mapping[eventcode] || 'Concerts';
    }

    private parsePrice(priceStr: string): number {
        // Skiddle prices can be "£15", "Free", "£10 - £25"
        if (!priceStr) return 25; // Default if missing

        const lower = priceStr.toLowerCase();
        if (lower.includes('free') || lower.includes('complimentary')) return 0;

        const match = priceStr.match(/(\d+(?:\.\d{2})?)/);
        if (match) {
            const val = parseFloat(match[1]);
            // If parsed as 0 but not marked free, assume data error and set default
            return val > 0 ? val : 20;
        }
        return 25; // Fallback
    }

    private formatDate(isoDate: string): string {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
    }

    private generateTag(price: number, dateStr: string): string {
        if (price === 0) return 'FREE ENTRY';

        const date = new Date(dateStr);
        const now = new Date();
        const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays <= 3) return 'THIS WEEKEND';
        if (diffDays <= 14) return 'SOON';
        return 'POPULAR';
    }
}
