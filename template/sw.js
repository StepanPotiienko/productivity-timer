self.addEventListener('install', function (event) {
    try {
        console.log('Service Worker installed')
        event.waitUntil(
            caches.open('my-cache').then(function (cache) {
                return cache.addAll(['/index.html', 'css/index.css', './js/index.js', './js/notification.js']).
                    catch(function (error) {
                        console.log("An error occured while caching files: ", error)
                    })
            })
        )
    } catch (error) {
        console.log(error)
    }
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request)
        })
    )
})
