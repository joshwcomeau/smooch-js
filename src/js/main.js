require('../stylesheets/main.less');
var Smooch = require('smooch.jsx').Smooch;

module.exports = new Smooch();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(reg) {
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            console.log('endpoint:', sub.endpoint);
        });
    }).catch(function() {});
}
