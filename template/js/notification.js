let NotificationPermission = window.localStorage.getItem("NotificationPermission")

navigator.serviceWorker.register('./sw.js');
Notification.requestPermission(function (result) {
    if (result === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            window.localStorage.setItem("NotificationPermission", true)
            registration.showNotification("Thank you.")
        });
    }
});

function SendNotification(details) {
    navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification(details)
    });
}