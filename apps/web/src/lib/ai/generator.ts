import OpenAI from 'openai';

// Initialize OpenAI client only if API key is available
let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
} else {
    console.warn('OPENAI_API_KEY not set. AI features will use fallback responses.');
}

export const AIMessageGenerator = {
    async generateTicketHype(eventName: string, userName: string, venueName: string): Promise<string> {
        if (!openai) {
            return `Get ready for an unforgettable night at ${venueName}! 🎟️✨`;
        }

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4-turbo-preview',
                messages: [
                    {
                        role: 'system',
                        content: `You are the Velo Concierge, an AI assistant for a premium ticketing platform. 
                        Your goal is to generate short, high-energy, personalized "hype" messages for users who just bought tickets.
                        Keep it under 50 words. Use emojis. Be sophisticated but excited.
                        Mention the event, the user (if provided), and the venue.`
                    },
                    {
                        role: 'user',
                        content: `Generate a hype message for ${userName} who just bought tickets to see ${eventName} at ${venueName}.`
                    }
                ],
                temperature: 0.8,
                max_tokens: 100,
            });

            return response.choices[0]?.message?.content || `Get ready for an unforgettable night at ${venueName}! 🎟️✨`;
        } catch (error) {
            console.error('AI Generation Failed:', error);
            // Fallback message if AI fails
            return `You're going to ${eventName}! Get ready for an amazing experience. 🚀`;
        }
    },

    async generateNearbyInsights(eventName: string, venueName: string, ageRestriction?: string): Promise<Array<{ title: string, description: string, type: 'food' | 'drink' | 'activity' | 'transport' | 'accommodation' }>> {
        if (!openai) {
            return [
                { title: 'Local Station', description: 'Nearest transport hub 5 mins walk.', type: 'transport' },
                { title: 'The Velo Lounge', description: 'Exclusive pre-show drinks/snacks.', type: 'drink' },
                { title: 'Quick Bites Co.', description: 'Fast food for a quick energy boost.', type: 'food' },
                { title: 'City Hotel', description: 'Comfortable stay right next door.', type: 'accommodation' }
            ];
        }

        try {
            const ageContext = ageRestriction === '18+'
                ? "The audience is 18+, so bars and nightlife are okay."
                : "The event is All Ages. STRICTLY NO bars, clubs, or 18+ venues. Focus on family-friendly or general public spots.";

            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `You are a local expert. Provide 4 specific recommendations for things to do near ${venueName} before or after ${eventName}.
                        Context: ${ageContext}
                        
                        Return a valid JSON array of objects with keys: 
                        - title
                        - description (max 15 words)
                        - type (strictly one of: 'food', 'drink', 'activity', 'transport', 'accommodation')
                        
                        Include at least one 'transport' option (e.g. nearest tube/station) and one 'accommodation' option if relevant.
                        Do not include markdown formatting.`
                    },
                    {
                        role: 'user',
                        content: `Recommendations for ${venueName}.`
                    }
                ],
                temperature: 0.7,
            });

            const text = response.choices[0]?.message?.content || '[]';
            return JSON.parse(text);

        } catch (error) {
            console.error('AI Insights Failed:', error);
            // Enhanced fallback
            return [
                { title: 'Local Station', description: 'Nearest transport hub 5 mins walk.', type: 'transport' },
                { title: 'The Velo Lounge', description: 'Exclusive pre-show drinks/snacks.', type: 'drink' },
                { title: 'Quick Bites Co.', description: 'Fast food for a quick energy boost.', type: 'food' },
                { title: 'City Hotel', description: 'Comfortable stay right next door.', type: 'accommodation' }
            ];
        }
    },

    async generateEventDescription(title: string, venue: string, date: string): Promise<string> {
        if (!openai) {
            return `Experience ${title} live at ${venue}. Join us on ${date} for a spectacular event.`;
        }

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4-turbo-preview',
                messages: [
                    {
                        role: 'system',
                        content: `You are a high-end event copywriter. 
                        Generate a premium, exciting 2-sentence description for an event. 
                        Focus on the atmosphere, exclusivity, and experience. 
                        Do not mention ticket prices.`
                    },
                    {
                        role: 'user',
                        content: `Event: ${title} at ${venue} on ${date}.`
                    }
                ],
                temperature: 0.8,
                max_tokens: 60,
            });

            return response.choices[0]?.message?.content || `Experience ${title} live at ${venue}. An unforgettable night of entertainment awaits.`;
        } catch (error) {
            console.error('Description Gen Failed:', error);
            return `Experience ${title} live at ${venue}. Join us on ${date} for a spectacular event.`;
        }
    }
};
