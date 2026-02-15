import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function scanContent(text: string): Promise<{ flagged: boolean; reason?: string }> {
    if (!process.env.OPENAI_API_KEY) {
        console.warn('OPENAI_API_KEY not set. Skipping moderation.');
        return { flagged: false };
    }

    try {
        const response = await openai.moderations.create({
            input: text,
        });

        const result = response.results[0];
        if (result.flagged) {
            const categories = Object.entries(result.categories)
                .filter(([_, value]) => value)
                .map(([key]) => key)
                .join(', ');
            return { flagged: true, reason: categories };
        }

        return { flagged: false };
    } catch (error) {
        console.error('Moderation API error:', error);
        // Fail open or closed? Let's fail open for prototype, but log it.
        return { flagged: false };
    }
}
