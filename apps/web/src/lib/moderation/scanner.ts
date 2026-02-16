import OpenAI from 'openai';

// Initialize OpenAI instance only if API key is available
let openaiInstance: OpenAI | null = null;

function getOpenAIInstance(): OpenAI | null {
    if (openaiInstance) return openaiInstance;

    if (process.env.OPENAI_API_KEY) {
        openaiInstance = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        return openaiInstance;
    }

    console.warn('OPENAI_API_KEY not set. Content moderation will be disabled.');
    return null;
}

export async function scanContent(content: string): Promise<{ isSafe: boolean; reason?: string }> {
    const openai = getOpenAIInstance();

    // If no OpenAI instance, skip moderation (allow content)
    if (!openai) {
        return { isSafe: true };
    }

    try {
        const response = await openai.moderations.create({
            input: content,
        });

        const result = response.results[0];
        if (result.flagged) {
            const categories = Object.entries(result.categories)
                .filter(([_, value]) => value)
                .map(([key]) => key)
                .join(', ');
            return { isSafe: false, reason: categories };
        }

        return { isSafe: true };
    } catch (error) {
        console.error('Moderation API error:', error);
        // Fail open - allow content if moderation fails
        return { isSafe: true };
    }
}
