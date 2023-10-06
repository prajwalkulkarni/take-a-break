import { Alarms } from "./constants";
import { getMessageAndIntervalAndAnimation, getTaskName } from "./utils.js";

const alarmsFired = new Set();
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    timeout: 20,
    water: 120,
    walk: 40,
    showNotifications: true,
  });
  createOrUpdateAlarms();
  chrome.storage.local.set({ browserOpenedTime: new Date().getTime() });
});

chrome.runtime.onStartup.addListener(() => {
  createOrUpdateAlarms();
  chrome.storage.local.set({ browserOpenedTime: new Date().getTime() });
});

chrome.runtime.onMessage.addListener((message) => {
  if (typeof message === "object") {
    Object.entries(message).forEach(([key, value]) => {
      chrome.storage.local.set({ [key]: value });
    });

    createOrUpdateAlarms();
  }
});
//Listen for the alarm to fire
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Fired", alarm.name);

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
    if (tabs.length > 0) {
      chrome.storage.local.set({ [alarm.name]: true });
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
    }
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

  chrome.alarms.clearAll();

  if (timeout) {
    chrome.alarms.create(Alarms.ScreenBreak, {
      delayInMinutes: timeout,
      periodInMinutes: timeout,
    });
  }

  if (water) {
    chrome.alarms.create(Alarms.Water, {
      delayInMinutes: water,
      periodInMinutes: water,
    });
  }

  if (walk) {
    chrome.alarms.create(Alarms.Walk, {
      delayInMinutes: walk,
      periodInMinutes: walk,
    });
  }
}
