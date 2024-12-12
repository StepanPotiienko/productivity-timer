self.addEventListener('install', function (event) {
    console.log('Service Worker installed')
    event.waitUntil(
        caches.open('my-cache').then(function (cache) {
            return cache.addAll(['/'])
        })
    )
    self.skipWaiting()
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request)
        })
    )
});
