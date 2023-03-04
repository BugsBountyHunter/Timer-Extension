chrome.alarms.create("TimerAlarm", { periodInMinutes: 1 / 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer", "isRunning"], (result) => {
    const time = result.timer ?? 0;
    const isRunning = result.isRunning ?? true;

    if (!isRunning) {
      return;
    }
    chrome.storage.local.set({
      timer: time + 1,
    });

    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });

    chrome.storage.sync.get(["notificationTime"], (result) => {
      const notificationTime = result.notificationTime;
      if (time % notificationTime == 0) {
        this.registration.showNotification("Service worker is running!", {
          body: ` ${notificationTime} second has passed!`,
          icon: "icon.png",
        });
      }
    });
  });
});
