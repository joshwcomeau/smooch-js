export function getSubscription() {
    if ('serviceWorker' in navigator) {
        // Are Notifications supported in the service worker?
        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
            console.warn('Notifications aren\'t supported.');
            return Promise.resolve();
        }

        // Check the current Notification permission.
        // If its denied, it's a permanent block until the
        // user changes the permission
        if (Notification.permission === 'denied') {
            return Promise.resolve();
        }

        // Check if push messaging is supported
        if (!('PushManager' in window)) {
            console.warn('Push messaging isn\'t supported.');
            return Promise.resolve();
        }

        return navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            return serviceWorkerRegistration.pushManager.getSubscription();
        });
    }

    return Promise.resolve();
}

export function extractPushToken(endpointUrl) {
    return endpointUrl.replace('https://android.googleapis.com/gcm/send/', '');
}
