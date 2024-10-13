import { Alarms } from "./constants";
import {
  getMessageAndIntervalAndAnimation,
  getNextAlarmTime,
  getTaskName,
} from "./utils.js";

const alarmsFired = new Set();
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local
    .set({
      timeout: 20,
      water: 120,
      walk: 50,
      showNotifications: true,
      lookawayDuration: 20000,
      waterDuration: 60000,
      walkDuration: 120000,
      notifyOnBreakCompletion: false,
    })
    .then(() => {
      createOrUpdateAlarms().then(() => {
        getNextAlarmTime().then((nextAlarm) => {
          chrome.storage.local.set({
            nextScheduledAlarm: nextAlarm,
          });
        });
      });
    })
    .catch(() => {
      chrome.runtime.reload();
    });
  chrome.storage.local.set({ browserOpenedTime: new Date().getTime() });
});

chrome.runtime.onStartup.addListener(() => {
  createOrUpdateAlarms()
    .then(() => {
      getNextAlarmTime().then((nextAlarm) => {
        chrome.storage.local.set({
          nextScheduledAlarm: nextAlarm,
        });
      });
    })
    .catch(() => {
      chrome.runtime.reload();
    });
  chrome.storage.local.set({ browserOpenedTime: new Date().getTime() });
});

chrome.runtime.onSuspend.addListener(() => {
  chrome.alarms.clearAll();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse({ success: true });
  if (typeof message === "object") {
    Object.entries(message).forEach(([key, value]) => {
      chrome.storage.local.set({ [key]: value });
    });

    createOrUpdateAlarms().then(() => {
      getNextAlarmTime().then((nextAlarm) => {
        chrome.storage.local.set({
          nextScheduledAlarm: nextAlarm,
        });
      });
    });
  }
  return true;
});
//Listen for the alarm to fire
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Fired", alarm.name);

  if (alarm.name === Alarms.WatchDog) {
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    //Execute content script when the alarm fires

    // Check the time difference between the current time and the time when the browser was opened
    // If the difference is less than the least possible break interval, then don't show the notification
    // This is to prevent the notification from showing up when the browser is opened after sufficient time has lapsed since the last alarm fired
    const items = await chrome.storage.local.get(["browserOpenedTime"]);
    const browserOpenedTime = items.browserOpenedTime;
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - browserOpenedTime;
    const timeDiffInMinutes = Math.floor(timeDiff / 60000);

    if (timeDiffInMinutes < 10) {
      return;
    }
    const { nextScheduledAlarm } = await chrome.storage.local.get([
      "nextScheduledAlarm",
    ]);

    // If the next scheduled/fired alarm from the queue is more than a minute away, then don't show the notification - 1 minute tolerance
    if (Math.abs(nextScheduledAlarm - Date.now()) > 60000) {
      await createOrUpdateAlarms();
      const upcomingAlarm = await getNextAlarmTime();
      await chrome.storage.local.set({ nextScheduledAlarm: upcomingAlarm });
      return;
    }

    chrome.storage.local.set({ [alarm.name]: true });
    const nextAlarm = await getNextAlarmTime();
    alarmsFired.add(alarm.name);
    chrome.scripting
      .executeScript({
        target: { tabId: tabs[0].id },
        files: ["dist/content.js"],
      })
      .then(() => {
        pushNotificationIfNotDuplicate(alarm.name);
      })
      .catch(() => {
        pushNotificationIfNotDuplicate(alarm.name);
      });
    chrome.storage.local.set({ nextScheduledAlarm: nextAlarm });
  });
});

async function pushNotificationIfNotDuplicate(alarmName) {
  if (alarmsFired.size <= 1) {
    const response = await chrome.storage.local.get([
      Alarms.ScreenBreak,
      Alarms.Water,
      Alarms.Walk,
      "showNotifications",
    ]);

    const taskName = getTaskName(response);
    const { message } = getMessageAndIntervalAndAnimation(taskName);
    if (response.showNotifications) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: `../assets/images/${taskName}.png`,
        title: "Take a break",
        message: message,
      });
      alarmsFired.delete(alarmName);
    }
  } else {
    alarmsFired.delete(alarmName);
  }
}
async function createOrUpdateAlarms() {
  const items = await chrome.storage.local.get(["timeout", "water", "walk"]);

  const { timeout, water, walk } = items;

  await chrome.alarms.clearAll();

  chrome.alarms
    .create(Alarms.WatchDog, {
      delayInMinutes: 0.5,
      periodInMinutes: 0.5,
    })
    .catch(() => {
      console.log("Error creating alarm", Alarms.WatchDog);
      chrome.runtime.reload();
    });
  chrome.alarms
    .create(Alarms.ScreenBreak, {
      delayInMinutes: timeout,
      periodInMinutes: timeout,
    })
    .catch(() => {
      console.log("Error creating alarm", Alarms.ScreenBreak);
      chrome.runtime.reload();
    });

  chrome.alarms
    .create(Alarms.Water, {
      delayInMinutes: water,
      periodInMinutes: water,
    })
    .catch(() => {
      console.log("Error creating alarm", Alarms.Water);
      chrome.runtime.reload();
    });

  chrome.alarms
    .create(Alarms.Walk, {
      delayInMinutes: walk,
      periodInMinutes: walk,
    })
    .catch(() => {
      console.log("Error creating alarm", Alarms.Walk);
      chrome.runtime.reload();
    });
}
