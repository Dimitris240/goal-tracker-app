const CACHE_NAME = "goal-tracker-cache-v1";

const urlsToCache = [
  "/goal-tracker-app/",
  "/goal-tracker-app/index.html",
  "/goal-tracker-app/style.css",
  "/goal-tracker-app/script.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});