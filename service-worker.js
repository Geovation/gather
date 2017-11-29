/**
 * Check out https://googlechrome.github.io/sw-toolbox/api.html for
 * more info on how to use sw-toolbox to custom configure your service worker.
 *
 * https://googlechrome.github.io/sw-toolbox/usage.html#regular-expression-routes
 *
 */

(global => {
    'use strict';

    // Load the sw-toolbox library.
    importScripts('./sw-toolbox.js');

    global.toolbox.options.debug = false;

    // pre-cache our key assets
    global.toolbox.precache(
        [
            'index.html',
            'manifest.json'
        ]);

    /***** CACHE FIRST *****/
    // The images don't change to much. So there is not need to retrieve them everytime
    // https://free.tilehosting.com/data/v3/13/4936/4123.pbf.pict?key=whjiogsLFRP3LYUHRMdF
    global.toolbox.router.any(/^https:\/\/free\.tilehosting\.com\/.*/, self.toolbox.cacheFirst);
    global.toolbox.router.any(/^http:\/\/maps\.worldpop\.org\.uk\/.*/, self.toolbox.cacheFirst);

    /***** FASTEST *****/
    // all the rest will get from cache or network, whatever is faster
    global.toolbox.router.default = global.toolbox.fastest;

    /***** OTHER CONFIG *****/
    // Ensure that our service worker takes control of the page as soon as possible.
    global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
