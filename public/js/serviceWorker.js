const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
    '/',
    './index.html',
    '/index.js',
    '/serviceWorker.js',
    '/database.js',
    "./manifest.webmanifest",
    "./css/styles.css",
    "./icons/icon-192x192.png",
    "./icons/icon-512x512.png"
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
    track.waitUntil
})