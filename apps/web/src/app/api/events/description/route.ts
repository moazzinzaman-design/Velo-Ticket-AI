import { NextResponse } from 'next/server';
import { AIMessageGenerator } from '../../../../lib/ai/generator';

export async function POST(req: Request) {
    try {
        const { title, venue, date } = await req.json();

        if (!title || !venue || !date) {
            return new NextResponse('Missing parameters', { status: 400 });
        }

        const description = await AIMessageGenerator.generateEventDescription(title, venue, date);
        return NextResponse.json({ description });
    } catch (error) {
        console.error('Description API Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
