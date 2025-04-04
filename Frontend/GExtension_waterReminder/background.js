let defaultDuration = 1.0;

chrome.alarms.onAlarm.addListener(function (alarm){
    console.log(alarm)

    // this one is displayed on the windows notification
    chrome.notifications.create("my notification", {
        type: "basic",
        iconUrl: "./icons/32.png",
        title: "Drink water",
        "message": "Wash thy throat with holy water"
    }, function (notificationID){
        console.log("displayed the notification") // to debug in the background tab
    })
});

function createAlarm(){
    chrome.alarms.create("Drink water", {delayInMinutes : defaultDuration});
}

createAlarm()

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Event received in background page");
        defaultDuration = request.minutes * 1.0;
        createAlarm()
        sendResponse({success: true});
    });