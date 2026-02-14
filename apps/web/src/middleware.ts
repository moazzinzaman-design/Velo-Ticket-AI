import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Hardcoded for prototype simplicity. In production, check database/env.
// Hardcoded for prototype simplicity. In production, check database/env.
const VALID_API_KEYS = new Set(['velo_partner_test_key', 'vp_live_123456789', 'vp_test_987654321']);

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Only apply to /api/partner and /api/partners routes
    if (path.startsWith('/api/partner') || path.startsWith('/api/partners')) {
        const apiKey = request.headers.get('x-api-key');

        if (!apiKey || !VALID_API_KEYS.has(apiKey)) {
            return NextResponse.json(
                { error: 'Unauthorized', message: 'Invalid or missing API Key' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/partner/:path*', '/api/partners/:path*'],
};
