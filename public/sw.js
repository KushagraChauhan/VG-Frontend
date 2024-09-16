const CACHE_NAME = 'vibe-gurukul-cache-v1';
const OFFLINE_URL = '/offline.html';

// Files to cache
const FILES_TO_CACHE = [
  '/',
  '/offline.html',
  '/icons/logo192.png',
  '/icons/logo512.png',
];

// Install Service Worker and Cache Assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing.');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate the Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event handler for offline support
self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match(OFFLINE_URL);
        });
      })
  );
});

// Listen for push events
self.addEventListener('push', (event) => {
  let data = {};
  try {
      data = event.data.json();
  } catch (e) {
      data = { body: event.data.text() };
  }

  const options = {
      body: data.body || 'You have a new notification!',
      icon: '/icons/logo192.png',
      badge: '/icons/logo192.png',
      actions: [
          { action: 'open', title: 'Open App' },
          { action: 'dismiss', title: 'Dismiss' }
      ]
  };

  event.waitUntil(
      self.registration.showNotification('Vibe Gurukul', options)
  );
});

// Handle notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
      event.waitUntil(clients.openWindow('/'));
  }
});



// // Periodic Background Sync
// self.addEventListener('periodicsync', (event) => {
//   if (event.tag === 'sync-videos') {
//     event.waitUntil(syncVideos());
//   }
// });

// async function syncVideos() {
//   console.log('Syncing videos...');
//   // Add code to fetch new videos or perform any background sync tasks
//   // Example: Fetch latest videos or updates from the server.
// }

// // Periodic Sync Registration
// self.addEventListener('sync', (event) => {
//   if (event.tag === 'sync-data') {
//     event.waitUntil(syncData());
//   }
// });

// async function syncData() {
//   console.log('Syncing data in the background...');
//   // Add logic to perform background sync tasks
//   // Example: Sync user data, posts, or any other resources with the server.
// }
