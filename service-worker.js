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

    // pre-cache our key assets
    global.toolbox.precache(
        [
            'index.html',
            'manifest.json'
        ]);

    /***** FASTEST *****/
    // all the rest will get from cache or network, whatever is faster
    global.toolbox.router.default = global.toolbox.fastest;

    /***** OTHER CONFIG *****/
    // Ensure that our service worker takes control of the page as soon as possible.
    global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
