const CACHE_NAME = 'circuitjs1-app-cache-v1';
const urlsToCache = [
  './about.html',
  './canvas2svg.js',
  './circuitjs.html',
  './crystal.html',
  './customfunction.html',
  './customlogic.html',
  './customtransformer.html',
  './diodecalc.html',
  './icon512.png',
  './icon128.png',
  './iframe.html',
  './lz-string.min.js',
  './manifest.json',
  './mexle.html',
  './mosfet-beta.html',
  './opampreal.html',
  './split.js',
  './subcircuits.html',
  // put everything else here
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // If the resource is already cached, return it
                return cachedResponse;
            }

            // Otherwise, fetch it from the network and add it to the cache
            return fetch(event.request).then((networkResponse) => {
                // Only cache non-GET requests and responses that aren't errors
                if (
                    event.request.method === 'GET' &&
                    networkResponse.status === 200
                ) {
		    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }

                return networkResponse;
            });
        })
    );
});


// Activate event: cleans up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];  // List of cache versions you want to keep

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);  // Delete old caches that aren't in whitelist
                    }
                })
            );
        })
    );
});
