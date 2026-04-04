const CACHE_NAME = 'eltria-v1';
const PRECACHE = [
  '/',
  '/tools/',
  '/diagrams/',
  '/assets/css/global.css',
  '/assets/js/nav.js',
  '/assets/js/theme.js',
];

// Install: pre-cache core pages
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first with cache fallback
self.addEventListener('fetch', (e) => {
  // Skip non-GET and cross-origin
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;

  // CDN resources: cache-first (they have versioned URLs)
  if (e.request.url.includes('cdn.')) {
    e.respondWith(
      caches.match(e.request).then(cached =>
        cached || fetch(e.request).then(resp => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
          return resp;
        })
      )
    );
    return;
  }

  // Own resources: network-first
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return resp;
      })
      .catch(() => caches.match(e.request))
  );
});
