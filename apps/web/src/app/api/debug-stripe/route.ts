import { NextResponse } from 'next/server';

export async function GET() {
    const key = process.env.STRIPE_SECRET_KEY;

    return NextResponse.json({
        status: 'debug_check',
        timestamp: new Date().toISOString(),
        env_check: {
            STRIPE_SECRET_KEY_EXISTS: !!key,
            STRIPE_SECRET_KEY_LENGTH: key ? key.length : 0,
            STRIPE_SECRET_KEY_PREFIX: key ? key.substring(0, 7) : 'N/A',
            NODE_ENV: process.env.NODE_ENV,
        },
        message: 'If STRIPE_SECRET_KEY_EXISTS is false, you need to add it to Vercel Env Vars.'
    });
}
