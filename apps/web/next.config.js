/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@velo/agent", "react-map-gl", "mapbox-gl"],
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'd31fr2pwly4c4s.cloudfront.net' },
            { protocol: 'https', hostname: 'd1plawd8huk6hh.cloudfront.net' },
            { protocol: 'https', hostname: 'eocjiduoyhdpcdytpwuk.supabase.co' }
        ]
    },
    serverExternalPackages: ['@react-pdf/renderer', 'qrcode', 'puppeteer-core', '@sparticuz/chromium'],
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
        turbopack: {
            root: '../../',
        },
    }
};

module.exports = nextConfig;
// Force restart: Promoter Console migrated to /promoter
