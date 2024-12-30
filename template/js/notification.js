navigator.serviceWorker.register('/template/sw.js');

let granted = localStorage.getItem("NotificationPermission");

document.querySelector('#start-btn').addEventListener('click', function () {
    if (!granted) {
        Notification.requestPermission().then(function (result) {
            if (result === 'granted') {
                granted = true;
                localStorage.setItem("NotificationPermission", "true");
            } else {
                localStorage.setItem("NotificationPermission", "false");
            }
        });
    }
});

function SendNotification() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/template/sw.js').then(function (registration) {
            console.log('Service Worker registered with scope:', registration.scope);

            registration.showNotification('Custom Notification', {
                body: 'This is a custom notification message.',
                tag: 'custom-notification'
            });
        }).catch(function (error) {
            console.error('Service Worker registration failed:', error);
        });
    }
}
