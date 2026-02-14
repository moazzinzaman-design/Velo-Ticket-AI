
const CACHE_NAME = 'velo-vault-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/favicon.ico',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            // Fallback or just fail silently for now
            return new Response('Offline');
        })
    );
});
