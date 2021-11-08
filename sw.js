// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-7-starter';

// Once the service worker has been installed, feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  /**
   * TODO - Part 2 Step 2
   * Create a function as outlined above
   */
  let CACHE_NAME = 'recipe-cache';
  let urlsToCache = [
    '/index.html',
    '/assets/scripts/main.js',
    '/assets/scripts/Router.js',
    '/assets/components/RecipeCard.js',
    '/assets/components/RecipeExpand.js',
    '/assets/images/icons/0-star.svg',
    '/assets/images/icons/1-star.svg',
    '/assets/images/icons/2-star.svg',
    '/assets/images/icons/3-star.svg',
    '/assets/images/icons/4-star.svg',
    '/assets/images/icons/5-star.svg',
    '/assets/images/icons/arrow-down.png',
    '/styles/main.css'
  ];
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

/**
 * Once the service worker 'activates', this makes it so clients loaded
 * in the same scope do not need to be reloaded before their fetches will
 * go through this service worker
 */
self.addEventListener('activate', function (event) {
  /**
   * TODO - Part 2 Step 3
   * Create a function as outlined above, it should be one line
   */
   let cacheAllowlist = ['recipe-cache'];

   event.waitUntil(
     caches.keys().then(function(cacheNames) {
       return Promise.all(
         cacheNames.map(function(cacheName) {
           if (cacheAllowlist.indexOf(cacheName) === -1) {
             return caches.delete(cacheName);
           }
         })
       );
     })
   );
});

// Intercept fetch requests and store them in the cache
self.addEventListener('fetch', function (event) {
  /**
   * TODO - Part 2 Step 4
   * Create a function as outlined above
   */
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});