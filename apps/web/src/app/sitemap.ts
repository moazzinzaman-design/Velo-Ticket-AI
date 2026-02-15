import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://velo.live'; // Replace with actual domain

    // Static routes
    const routes = [
        '',
        '/events',
        '/pricing',
        '/api-access',
        '/about',
        '/features',
        '/legal/privacy',
        '/legal/terms',
        '/legal/cookies',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
