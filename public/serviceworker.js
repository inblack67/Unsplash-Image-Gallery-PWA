const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;  // serviceWorker itself

// Install SW
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    )
})

// Listen for request
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(() => {
            return fetch(e.request).catch(() => caches.match('offline.html'))
        })
    )
})


// Activate the SW
self.addEventListener('activate', e => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    e.waitUntil(
        caches.keys().then(cacheNames => {
            Promise.all(
                cacheNames.map(cn => {
                    if(!cacheWhiteList.includes(cn)){
                        return caches.delete(cacheNames); 
                    }
                })
            )
        })
    )
})