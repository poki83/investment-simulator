/* InvestSim – Service Worker: App-Cache & Offline */
const VERSION = 'investsim-v2';

const CORE = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/dashboard.css',
  './css/components.css',
  './css/app.css',
  './css/theme.css',
  './js/gameState.js',
  './js/stocks.js',
  './js/etfs.js',
  './js/crypto.js',
  './js/realEstate.js',
  './js/companies.js',
  './js/luxury.js',
  './js/events.js',
  './js/taxes.js',
  './js/charts.js',
  './js/casino.js',
  './js/leaderboard.js',
  './js/storage.js',
  './js/main.js',
  './js/ui.js',
  './icons/icon-64.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Nur gleiche Domain behandeln (Fonts & Co. bleiben am Netz)
  if (url.origin !== location.origin) return;
  if (event.request.method !== 'GET') return;

  // Seiten-Navigation: erst Netz, sonst Cache (Offline)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(VERSION).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() =>
          caches.match('./index.html').then((r) => r || caches.match('./'))
        )
    );
    return;
  }

  // Statische Assets: stale-while-revalidate (schnell + aktuelle Updates)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(VERSION).then((cache) => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});