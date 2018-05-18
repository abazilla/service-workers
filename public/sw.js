var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/stylesheets/style.css',
  '/images/tokyo.png',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           console.log('woot, found in cache!', response)
//           return response;
//         }
        
//         // IMPORTANT: Clone the request. A request is a stream and
//         // can only be consumed once. Since we are consuming this
//         // once by cache and once by the browser for fetch, we need
//         // to clone the response.
//         var fetchRequest = event.request.clone();
        
//         return fetch(fetchRequest).then(
//           function(response) {
//             // Check if we received a valid response
//             if(!response || response.status !== 200 || response.type !== 'basic') {
//               console.log('valid yay', response)
//               return response;
//             }
            
//             // IMPORTANT: Clone the response. A response is a stream
//             // and because we want the browser to consume the response
//             // as well as the cache consuming the response, we need
//             // to clone it so we have two streams.
//             var responseToCache = response.clone();
            
//             caches.open(CACHE_NAME)
//             .then(function(cache) {
//               cache.put(event.request, responseToCache);
//             });
            
//             console.log('bayadk', response)
//             return response;
//           }
//         );
//       })
//     );
// });

self.addEventListener('fetch', function(event) {
  console.log('event', event)
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      // resp can be undefined if it is not found in the cache
      return resp || fetch(event.request).then(function(response) {
        console.log('lol', resp, response)
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});
