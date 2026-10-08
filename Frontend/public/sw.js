// Rangoli Jewellers Service Worker for PWA installation
const CACHE_NAME = 'rangoli-pwa-v1'

self.addEventListener('install', (event) => {
    // Activate worker immediately
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key)
                    }
                })
            )
        )
    )
    self.clients.claim()
})

// Fetch event: Network-first with cache fallback
self.addEventListener('fetch', (event) => {
    // Let browser handle normal requests
    if (event.request.method !== 'GET') return

    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request)
        })
    )
})
