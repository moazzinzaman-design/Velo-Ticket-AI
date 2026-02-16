import { RealEvent } from '../../data/realEvents';

export interface EventProviderConfig {
    apiKey: string;
    baseUrl: string;
    rateLimit?: {
        requestsPerSecond: number;
        requestsPerDay: number;
    };
}

export interface EventSearchParams {
    city?: string;
    lat?: number;
    lng?: number;
    radius?: number; // miles
    category?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
}

export interface EventProvider {
    name: string;
    search(params: EventSearchParams): Promise<RealEvent[]>;
    getEvent(id: string): Promise<RealEvent | null>;
}

/**
 * Base class for event providers with common utilities
 */
export abstract class BaseEventProvider implements EventProvider {
    abstract name: string;
    protected config: EventProviderConfig;

    constructor(config: EventProviderConfig) {
        this.config = config;
    }

    abstract search(params: EventSearchParams): Promise<RealEvent[]>;

    async getEvent(id: string): Promise<RealEvent | null> {
        return null; // Default implementation
    }

    protected async fetchWithRetry(
        url: string,
        options?: RequestInit,
        retries = 3
    ): Promise<Response> {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options?.headers,
                    },
                });

                if (response.ok) return response;

                // Rate limit hit — wait and retry
                if (response.status === 429 && i < retries - 1) {
                    await this.sleep(1000 * (i + 1));
                    continue;
                }

                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            } catch (error) {
                if (i === retries - 1) throw error;
                await this.sleep(500 * (i + 1));
            }
        }
        throw new Error('Max retries exceeded');
    }

    protected sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    protected categoryMapping: Record<string, string> = {
        music: 'Concerts',
        concert: 'Concerts',
        sports: 'Sports',
        theatre: 'Theatre',
        theater: 'Theatre',
        comedy: 'Comedy',
        festival: 'Festivals',
        exhibition: 'Exhibitions',
    };

    protected normalizeCategory(category: string): string {
        const lower = category.toLowerCase();
        return this.categoryMapping[lower] || 'Concerts';
    }
}
