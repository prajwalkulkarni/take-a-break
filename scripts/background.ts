import { Alarms } from "./types";
import { getMessageAndIntervalAndAnimation, getTaskName } from "./utils";

const alarmsFired = new Set<string>();
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    timeout: 20,
    water: 120,
    walk: 40,
    showNotifications: true,
  });
  createOrUpdateAlarms();
});
chrome.runtime.onStartup.addListener(() => {
  createOrUpdateAlarms();
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
    if (tabs.length > 0) {
      chrome.storage.local.set({ [alarm.name]: true });
      alarmsFired.add(alarm.name);
      pushNotificationIfNotDuplicate(alarm.name);
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id! },
        files: ["dist/content.js"],
      });
    }
  });
  //   }
});

function pushNotificationIfNotDuplicate(alarmName: string) {
  if (alarmsFired.size <= 1) {
    chrome.storage.local.get(
      [Alarms.ScreenBreak, Alarms.Water, Alarms.Walk, "showNotifications"],
      (items) => {
        const taskName = getTaskName(items);
        const { message } = getMessageAndIntervalAndAnimation(taskName);
        if (items.showNotifications) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: `../assets/images/${taskName}.png`,
            title: "Take a break",
            message: message,
          });
        }
      }
    );
  } else {
    alarmsFired.delete(alarmName);
  }
}
function createOrUpdateAlarms() {
  chrome.storage.local.get(["timeout", "water", "walk"], (items) => {
    const { timeout, water, walk } = items;

    chrome.alarms.clearAll();
    // updateTimeoutWeightage({ timeout, water, walk });

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
  });
}
