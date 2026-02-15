import OpenAI from 'openai';

let openaiInstance: OpenAI | null = null;

function getOpenAI() {
    if (!process.env.OPENAI_API_KEY) {
        return null;
    }
    if (!openaiInstance) {
        openaiInstance = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openaiInstance;
}

export async function scanContent(text: string): Promise<{ flagged: boolean; reason?: string }> {
    const openai = getOpenAI();

    if (!openai) {
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
