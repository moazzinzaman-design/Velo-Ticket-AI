import { NextResponse } from 'next/server';

export async function GET() {
    const key = process.env.STRIPE_SECRET_KEY;

    // Get list of all env keys (names only) for debugging
    // This is safe because we are only returning the keys, not values
    const allEnvKeys = Object.keys(process.env).filter(k =>
        !k.startsWith('VERCEL_') &&
        !k.startsWith('AWS_') &&
        !k.startsWith('npm_')
    );

    return NextResponse.json({
        status: 'debug_check_v2',
        timestamp: new Date().toISOString(),
        env_check: {
            STRIPE_SECRET_KEY_EXISTS: !!key,
            STRIPE_SECRET_KEY_LENGTH: key ? key.length : 0,
            STRIPE_SECRET_KEY_PREFIX: key ? key.substring(0, 7) : 'N/A',
            NODE_ENV: process.env.NODE_ENV,
            NEXT_PUBLIC_STRIPE_KEY_EXISTS: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        },
        available_env_keys: allEnvKeys,
        message: 'If STRIPE_SECRET_KEY is not in available_env_keys, it is not set in Vercel for this environment.'
    });
}
