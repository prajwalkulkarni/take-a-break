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
    // chrome.tabs.sendMessage(tabs[0].id!, { message: "breakTime" });
    //Execute content script when the alarm fires
    if (tabs.length > 0) {
      console.count("Script executed");
      chrome.storage.local.set({ [alarm.name]: true });
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id! },
        files: ["dist/content.js"],
      });
    }
  });
  //   }
});

function createOrUpdateAlarms() {
  chrome.storage.local.get(["timeout", "water", "walk"], (items) => {
    const { timeout, water, walk } = items;

    console.log(timeout, water, walk);
    chrome.alarms.clearAll();

    if (timeout) {
      chrome.alarms.create("breakAlarm", {
        delayInMinutes: timeout,
        periodInMinutes: timeout,
      });
    }

    if (water) {
      chrome.alarms.create("waterAlarm", {
        delayInMinutes: water,
        periodInMinutes: water,
      });
    }

    if (walk) {
      chrome.alarms.create("walkAlarm", {
        delayInMinutes: walk,
        periodInMinutes: walk,
      });
    }
  });
}
