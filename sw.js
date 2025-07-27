const CACHE_VERSION = "v1-20250727"; // update this on every deploy!
const CACHE_NAME = `c2yz-cache-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/main.js",
  "/assets/fonts/Coiny-Regular-subset.ttf",
  "/assets/card.png",
  "/assets/mike-czyz.webp",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(
      (cached) =>
        cached ||
        fetch(event.request)
          .then((response) => {
            return response;
          })
          .catch(() => {
            // Optional: fallback response when offline and not cached
            // return caches.match('/offline.html');
          })
    )
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
});
