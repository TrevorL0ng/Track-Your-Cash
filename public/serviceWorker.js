const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/index.js',
    '/serviceWorker.js',
    '/database.js',
    "/manifest.webmanifest",
    "/styles.css",
    "/icon-192x192.png",
    "/icon-512x512.png"
];

self.addEventListener("install", function(track){
    track.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Pre-cache success");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.skipWaiting();

self.addEventListener("activate", function(track){
    track.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME){
                        console.log("Old cache key removed", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
            self.clients.claim();
});

self.addEventListener ("fetch", function(track){
    if (track.request.url.includes("/api")) {
        track.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
                return fetch(track.request)
                    .then(response => {
                        if (response.status === 200) {
                            cache.put(track.request.url, response.clone());
                        }
                        return response;
                    })
                    .catch(err => {
                        return cache.match(track.request);
                    });
            }).catch (err => console.log(err))
        );
        return;
    }
    track.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(track.request).then(response => {
                return response || fetch(track.request);
            });
        })
    );
});