var $CACHE_STORE;
var $FILES = [
  '/',
  '/index.html',
  '/map.html',
  '/src/css/styles.css',
  '/src/js/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open($CACHE_STORE)
    .then(cache => {
      return cache.addAll($FILES);
    })
    .then(() => {
      return self.skipWaiting();
    })
  );
});


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.open($CACHE_STORE)
    .then(cache => {
      return cache.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return $FILES.indexOf(cacheName) === -1;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      });
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    let url = event.request.url.indexOf(self.location.origin) !== -1 ?
    event.request.url.split(`${self.location.origin}/`)[1] :
    event.request.url;
    let isFileCached = $FILES.indexOf(url) !== -1;

    if (isFileCached) {
      event.respondWith(
        caches.open($CACHE_STORE)
        .then(cache => {
          return cache.match(url)
          .then(response => {
            if (response) {
              return response;
            }
            throw Error('There is not response for such request', url);
          });
        })
        .catch(error => {
          return fetch(event.request);
        })
      );
    }
  }
});
