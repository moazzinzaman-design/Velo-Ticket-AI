import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const AIMessageGenerator = {
    async generateTicketHype(eventName: string, userName: string, venueName: string): Promise<string> {
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

    async generateNearbyInsights(eventName: string, venueName: string): Promise<Array<{ title: string, description: string, type: 'food' | 'drink' | 'activity' }>> {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `You are a local expert. Provide 3 specific recommendations for things to do near ${venueName} before a ${eventName} event.
                        Return a valid JSON array of objects with keys: title, description (max 15 words), type ('food', 'drink', or 'activity').
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
            // Simple parsing, assuming GPT returns clean JSON as requested. 
            // In production, use structured output or zod validation.
            return JSON.parse(text);

        } catch (error) {
            console.error('AI Insights Failed:', error);
            return [];
        }
    }
};
