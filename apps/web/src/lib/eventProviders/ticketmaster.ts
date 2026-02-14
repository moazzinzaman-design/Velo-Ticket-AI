import { BaseEventProvider, EventSearchParams } from './base';
import { RealEvent } from '../../data/realEvents';

interface TicketmasterEvent {
    id: string;
    name: string;
    dates: {
        start: { localDate: string; localTime?: string };
    };
    _embedded?: {
        venues?: Array<{
            name: string;
            city: { name: string };
            address?: { line1: string };
            location?: { latitude: string; longitude: string };
        }>;
    };
    images?: Array<{ url: string; width: number; height: number }>;
    classifications?: Array<{
        segment: { name: string };
        genre?: { name: string };
    }>;
    priceRanges?: Array<{ min: number; max: number }>;
    seatmap?: { staticUrl: string };
}

interface TicketmasterResponse {
    _embedded?: { events: TicketmasterEvent[] };
    page: { totalElements: number };
}

export class TicketmasterProvider extends BaseEventProvider {
    name = 'ticketmaster';

    async search(params: EventSearchParams): Promise<RealEvent[]> {
        if (!this.config.apiKey) {
            console.warn('Ticketmaster API key not configured');
            return [];
        }

        const url = this.buildSearchUrl(params);

        try {
            const response = await this.fetchWithRetry(url);
            const data: TicketmasterResponse = await response.json();

            if (!data._embedded?.events) return [];

            return data._embedded.events.map((event, index) => this.normalizeEvent(event, index));
        } catch (error) {
            console.error('Ticketmaster API error:', error);
            return [];
        }
    }

    private buildSearchUrl(params: EventSearchParams): string {
        const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
        const searchParams = new URLSearchParams({
            apikey: this.config.apiKey,
            size: String(params.limit || 50),
        });

        if (params.city) searchParams.append('city', params.city);
        if (params.lat && params.lng && params.radius) {
            searchParams.append('latlong', `${params.lat},${params.lng}`);
            searchParams.append('radius', String(params.radius));
            searchParams.append('unit', 'miles');
        }
        if (params.category) {
            searchParams.append('classificationName', params.category);
        }
        if (params.startDate) {
            searchParams.append('startDateTime', `${params.startDate}T00:00:00Z`);
        }

        return `${baseUrl}?${searchParams.toString()}`;
    }

    private normalizeEvent(event: TicketmasterEvent, index: number): RealEvent {
        const venue = event._embedded?.venues?.[0];
        const image = this.selectBestImage(event.images);
        const category = event.classifications?.[0]?.segment?.name || 'Entertainment';
        const price = event.priceRanges?.[0]?.min || 50;

        return {
            id: index + 1,
            title: event.name,
            venue: venue?.name || 'TBA',
            location: {
                city: venue?.city?.name || 'Unknown',
                address: venue?.address?.line1 || '',
                coordinates: {
                    lat: parseFloat(venue?.location?.latitude || '0'),
                    lng: parseFloat(venue?.location?.longitude || '0'),
                },
            },
            date: this.formatDate(event.dates.start.localDate),
            time: event.dates.start.localTime || '19:00',
            price: Math.round(price),
            category: this.normalizeCategory(category),
            image: image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
            tag: this.generateTag(price, event.dates.start.localDate),
            soldPercentage: Math.floor(Math.random() * 40) + 40, // Mock for now
            description: `${event.name} at ${venue?.name || 'venue TBA'}`,
        };
    }

    private selectBestImage(images?: Array<{ url: string; width: number; height: number }>): string {
        if (!images || images.length === 0) return '';

        // Prefer 16:9 aspect ratio, high res
        const sorted = images.sort((a, b) => {
            const scoreA = a.width * a.height;
            const scoreB = b.width * b.height;
            return scoreB - scoreA;
        });

        return sorted[0].url;
    }

    private formatDate(isoDate: string): string {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
    }

    private generateTag(price: number, dateStr: string): string {
        const date = new Date(dateStr);
        const now = new Date();
        const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays <= 7) return 'TONIGHT';
        if (price > 100) return 'VIP AVAILABLE';
        if (diffDays <= 30) return 'SELLING FAST';
        return 'NEW';
    }
}
