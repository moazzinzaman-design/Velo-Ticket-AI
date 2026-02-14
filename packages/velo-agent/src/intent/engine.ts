import { UserIntent, UserIntentSchema } from './schemas';

export class IntentEngine {
    async predict(query: string): Promise<UserIntent> {
        const lowerQuery = query.toLowerCase();

        // Mock "Last-Mile" Transit Logic
        if (lowerQuery.includes('ride') || lowerQuery.includes('uber') || lowerQuery.includes('lyft') || lowerQuery.includes('drive')) {
            return {
                type: 'RIDE_REQUEST',
                provider: lowerQuery.includes('lyft') ? 'LYFT' : 'UBER',
                destination: this.extractDestination(lowerQuery) || 'The Sphere, London',
            };
        }

        // Mock Ticket Logic
        if (lowerQuery.includes('ticket') || lowerQuery.includes('buy') || lowerQuery.includes('seat')) {
            return {
                type: 'TICKET_PURCHASE',
                event: 'Daft Punk 2026',
                quantity: 2
            }
        }

        // Mock Dining Logic
        if (lowerQuery.includes('dinner') || lowerQuery.includes('eat') || lowerQuery.includes('restaurant') || lowerQuery.includes('reservation') || lowerQuery.includes('table')) {
            const cuisine = this.extractCuisine(lowerQuery);
            const time = this.extractTime(lowerQuery);
            const partySize = this.extractPartySize(lowerQuery);

            return {
                type: 'DINING_RESERVATION',
                cuisine,
                time: time || '7:00 PM',
                partySize: partySize || 2
            }
        }

        // Mock Security/Quantum Logic
        if (lowerQuery.includes('security') || lowerQuery.includes('private') || lowerQuery.includes('quantum') || lowerQuery.includes('safe') || lowerQuery.includes('hack')) {
            return {
                type: 'SECURITY_UPGRADE',
                protocol: lowerQuery.includes('quantum') ? 'KYBER_768' : 'KYBER_768'
            };
        }

        // Mock Churn/Hesitation Logic
        if (lowerQuery.includes('not sure') || lowerQuery.includes('too expensive') || lowerQuery.includes('maybe later') || lowerQuery.includes('wait') || lowerQuery.includes('cancel')) {
            return {
                type: 'CHURN_INTERVENTION',
                reason: lowerQuery.includes('expensive') ? 'PRICING' : 'HESITATION',
                sentiment: lowerQuery.includes('cancel') ? 'FRUSTRATED' : 'HESITANT'
            };
        }

        // Pitch / Investor Demo
        if (lowerQuery.includes('pitch') || lowerQuery.includes('investor') || lowerQuery.includes('demo') || lowerQuery.includes('presentation') || lowerQuery.includes('million')) {
            return {
                type: 'PITCH_PRESENTATION',
            };
        }

        return {
            type: 'UNKNOWN',
            originalQuery: query,
        };
    }

    private extractDestination(query: string): string | undefined {
        if (query.includes('to ')) {
            return query.split('to ')[1]?.split(' ')[0];
        }
        return undefined;
    }

    private extractCuisine(query: string): string | undefined {
        const cuisines = ['italian', 'chinese', 'japanese', 'mexican', 'french', 'indian', 'thai', 'steak'];
        return cuisines.find(c => query.includes(c));
    }

    private extractTime(query: string): string | undefined {
        // Simple regex for time (e.g., 7pm, 8:30)
        const timeRegex = /([0-9]{1,2}(:[0-9]{2})?\s*(am|pm)?)/i;
        const match = query.match(timeRegex);
        return match ? match[0] : undefined;
    }

    private extractPartySize(query: string): number | undefined {
        // Look for "for X" or "X people"
        const sizeRegex = /for (\d+)|(\d+) people/i;
        const match = query.match(sizeRegex);
        if (match) {
            return parseInt(match[1] || match[2]);
        }
        return undefined;
    }
}
