const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = ['/', '/index.html', '/styles.css', '/app.js', '/logo.png'];

const installEvent = () => {
  self.addEventListener('install', (event) => {
    console.log('Service worker installed');
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
    );
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith('my-app-cache-') && cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              return caches.delete(cacheName);
            })
        );
      })
    );
  });
};
activateEvent();

const fetchEvent = () => {
  self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          console.log('Found in cache:', event.request.url);
          return response;
        }
        console.log('Not found in cache. Fetching from network:', event.request.url);
        return fetch(event.request).then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
  });
};
fetchEvent();

self.addEventListener('beforeinstallprompt', (event) => {
  console.log('Before install prompt fired');
  event.preventDefault();
  const deferredPrompt = event;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    console.log(choiceResult.outcome);
    if (choiceResult.outcome === 'dismissed') {
      console.log('User cancelled installation');
    } else {
      console.log('User added to home screen');
    }
  });
});
