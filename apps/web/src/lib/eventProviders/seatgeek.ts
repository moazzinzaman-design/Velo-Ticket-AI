import { BaseEventProvider, EventSearchParams } from './base';
import { RealEvent } from '../../data/realEvents';

interface SeatGeekEvent {
    id: number;
    title: string;
    type: string; // concert, sports, theater
    datetime_local: string;
    venue: {
        name: string;
        city: string;
        address: string;
        location: { lat: number; lon: number };
    };
    performers: Array<{
        name: string;
        image: string;
    }>;
    stats: {
        lowest_price: number;
        average_price: number;
    };
    url: string;
}

interface SeatGeekResponse {
    events: SeatGeekEvent[];
    meta: { total: number };
}

export class SeatGeekProvider extends BaseEventProvider {
    name = 'seatgeek';

    async search(params: EventSearchParams): Promise<RealEvent[]> {
        if (!this.config.apiKey) {
            console.warn('SeatGeek API key not configured');
            return [];
        }

        const url = this.buildSearchUrl(params);

        try {
            const response = await this.fetchWithRetry(url);
            const data: SeatGeekResponse = await response.json();

            if (!data.events) return [];

            return data.events.map((event, index) => this.normalizeEvent(event, index));
        } catch (error) {
            console.error('SeatGeek API error:', error);
            return [];
        }
    }

    private buildSearchUrl(params: EventSearchParams): string {
        const baseUrl = 'https://api.seatgeek.com/2/events';
        const searchParams = new URLSearchParams({
            client_id: this.config.apiKey,
            per_page: String(params.limit || 50),
        });

        if (params.lat && params.lng) {
            searchParams.append('lat', String(params.lat));
            searchParams.append('lon', String(params.lng));
            if (params.radius) {
                searchParams.append('range', `${params.radius}mi`);
            }
        }

        if (params.category) {
            const taxonomyId = this.categoryToTaxonomy(params.category);
            if (taxonomyId) searchParams.append('taxonomies.id', taxonomyId);
        }

        if (params.startDate) {
            searchParams.append('datetime_local.gte', params.startDate);
        }
        if (params.endDate) {
            searchParams.append('datetime_local.lte', params.endDate);
        }

        return `${baseUrl}?${searchParams.toString()}`;
    }

    private categoryToTaxonomy(category: string): string {
        // SeatGeek taxonomy IDs
        const mapping: Record<string, string> = {
            Concerts: '2000000', // Music/Concerts
            Sports: '1000000',   // Sports
            Theatre: '3000000',  // Theater
            Comedy: '3020000',   // Comedy
        };
        return mapping[category] || '';
    }

    private normalizeEvent(event: SeatGeekEvent, index: number): RealEvent {
        const image = event.performers?.[0]?.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819';
        const price = event.stats.lowest_price || event.stats.average_price || 50;

        return {
            id: index + 2000, // Offset to avoid ID collision
            title: event.title,
            venue: event.venue.name,
            location: {
                city: event.venue.city,
                address: event.venue.address,
                coordinates: {
                    lat: event.venue.location.lat,
                    lng: event.venue.location.lon,
                },
            },
            date: this.formatDate(event.datetime_local),
            time: this.extractTime(event.datetime_local),
            price: Math.round(price),
            category: this.normalizeCategory(event.type),
            image,
            tag: this.generateTag(price, event.datetime_local),
            soldPercentage: Math.floor(Math.random() * 50) + 30,
            description: `${event.title} at ${event.venue.name}`,
        };
    }

    private formatDate(datetime: string): string {
        const date = new Date(datetime);
        return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
    }

    private extractTime(datetime: string): string {
        const date = new Date(datetime);
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    }

    private generateTag(price: number, dateStr: string): string {
        const date = new Date(dateStr);
        const now = new Date();
        const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays <= 7) return 'TONIGHT';
        if (price < 30) return 'GREAT DEAL';
        if (price > 150) return 'PREMIUM';
        return 'AVAILABLE';
    }
}
