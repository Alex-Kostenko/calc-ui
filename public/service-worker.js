const CACHE_NAME = "image-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/images/image1.jpg", "/images/image2.png"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.destination === "image") {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});
