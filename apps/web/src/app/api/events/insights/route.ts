import { NextResponse } from 'next/server';
import { AIMessageGenerator } from '../../../../lib/ai/generator';

export async function POST(req: Request) {
    try {
        const { eventName, venueName } = await req.json();

        if (!eventName || !venueName) {
            return new NextResponse('Missing parameters', { status: 400 });
        }

        const insights = await AIMessageGenerator.generateNearbyInsights(eventName, venueName);
        return NextResponse.json({ insights });
    } catch (error) {
        console.error('Insights API Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
