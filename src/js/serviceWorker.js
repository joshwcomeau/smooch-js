var config = {
    siteName: 'Smooch Dev',
    siteUrl: 'http://localhost:8282',
    siteIcon: ''
};

self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {
    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function(windowClients) {
        var client = windowClients.find(function(client) {
            return client.focused;
        });

        if (client.url.indexOf(config.siteUrl) === -1) {
            return self.registration.showNotification(config.siteName, {
                body: 'The Message',
                icon: 'images/icon.png'
            });
        }
    }));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function(windowClients) {
        var client = windowClients.reduce(function(p, c) {
            if (!p || p.url !== config.siteUrl) {
                if (c.url.indexOf(config.siteUrl) === 0) {
                    return c;
                }
            }
        }, null);

        if (client && 'focus' in client) {
            return client.focus();
        }

        if (clients.openWindow) {
            return clients.openWindow(config.siteUrl);
        }
    }));
});
