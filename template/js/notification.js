let NotificationPermission = window.localStorage.getItem("NotificationPermission")

function GrantNotificationPermission() {
    if ("Notification" in window && !NotificationPermission) {
        Notification.requestPermission().then(function (permission) {
            if (permission == 'granted') {
                window.localStorage.setItem("NotificationPermission", true)
                SendNotification("Thank you.")
            }
        })
    }
}


function SendNotification(details) {
    if (NotificationPermission) new Notification(title = details)
}