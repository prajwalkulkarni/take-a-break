/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./scripts/background.ts ***!
  \*******************************/

//Create an alarm and inject content script when the alarm fires
chrome.runtime.onInstalled.addListener(function () {
    chrome.alarms.create("breakAlarm", {
        delayInMinutes: 1,
        periodInMinutes: 1,
    });
});
//Listen for the alarm to fire
chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log("Fired", alarm.name);
    //   if (alarm.name === "breakAlarm") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // chrome.tabs.sendMessage(tabs[0].id!, { message: "breakTime" });
        //Execute content script when the alarm fires
        if (tabs.length > 0) {
            console.log(tabs);
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["dist/content.js"],
            });
        }
    });
    //   }
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    if (typeof message === "object") {
        Object.entries(message).forEach(function (_a) {
            var _b;
            var key = _a[0], value = _a[1];
            chrome.storage.local.set((_b = {}, _b[key] = value, _b));
        });
        createOrUpdateAlarms();
    }
});
function createOrUpdateAlarms() {
    chrome.storage.local.get(["timeout", "water", "walk"], function (items) {
        var timeout = items.timeout, water = items.water, walk = items.walk;
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

/******/ })()
;
//# sourceMappingURL=background.js.map