navigator.serviceWorker.register('/sw.js');

// TODO: Fix 'Thank you' notification appearing after the permission is granted.
document.querySelector('#start-btn').addEventListener('click', function () {
    Notification.requestPermission().then(function (result) {
        if (result === 'granted') {
            localStorage.setItem("NotificationPermission", "true");
            new Notification("Thank you.");
        } else {
            localStorage.setItem("NotificationPermission", "false");
        }
    });
});

function SendNotification() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            console.log('Service Worker registered with scope:', registration.scope);

            document.querySelector('#start-btn').addEventListener('click', function () {
                registration.showNotification('Custom Notification', {
                    body: 'This is a custom notification message.',
                    tag: 'custom-notification'
                });
            });
        }).catch(function (error) {
            console.error('Service Worker registration failed:', error);
        });
    }
}
