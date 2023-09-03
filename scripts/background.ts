import { Alarms } from "./types";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
  //   if (alarm.name === "breakAlarm") {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    //Execute content script when the alarm fires
    if (tabs.length > 0) {
      chrome.storage.local.set({ [alarm.name]: true });
      chrome.scripting
        .executeScript({
          target: { tabId: tabs[0].id! },
          files: ["dist/content.js"],
        })
        .then(() => {
          chrome.storage.local.get("showNotifications", (items) => {
            if (items.showNotification) {
              chrome.notifications.create({
                type: "basic",
                iconUrl: "../assets/images/favicon-16x16.png",
                title: "Take a break",
                message: "It's time to take a break",
              });
            }
          });
        });
    }
  });
  //   }
});

function createOrUpdateAlarms() {
  chrome.storage.local.get(["timeout", "water", "walk"], (items) => {
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
  });
}
