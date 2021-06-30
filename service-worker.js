const CACHE_NAME = "aplikasiSepakBola-v5";
const urlsToCache = [
    //folder assets
    "/assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "/assets/instagram.jpg",
    "/assets/twitter.jpg",
    "/assets/whatsapp.jpg",
    "/assets/profil.jpg",
    "/assets/icon-app-512.png",
    "/assets/icon-app-192.png",
    "/assets/icon-app-192-apple.png",
    "/assets/favicon-16.png",
    "/assets/foto-liga-inggris.jpg",
    "/assets/foto-liga-italia.jpg",

    // folder css
    "/css/materialize.min.css",
    "/css/style.css",

    // folder js
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/idb.js",
    "/js/db.js",

    // folder pages
    "/pages/standingEngland.html",
    "/pages/standingItaly.html",
    "/pages/saved.html",
    "/pages/home.html",

    // not in folder
    "/",
    "/push.js",
    "/nav.html",
    "/index.html",
    "/article.html",
    "/manifest.json",
    "/service-worker.js"
];

self.addEventListener("install", function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function (event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { 'ignoreSearch': true }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});