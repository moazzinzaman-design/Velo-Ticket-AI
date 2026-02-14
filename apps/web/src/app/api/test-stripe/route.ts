import { NextResponse } from 'next/server';

export async function GET() {
    const key = process.env.STRIPE_SECRET_KEY;

    return NextResponse.json({
        keyExists: !!key,
        keyLength: key?.length || 0,
        keyPrefix: key?.substring(0, 7) || 'NOT_SET',
        allEnvKeys: Object.keys(process.env).filter(k => k.includes('STRIPE'))
    });
}
