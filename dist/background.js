/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/background.ts":
/*!*******************************!*\
  !*** ./scripts/background.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
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
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => __awaiter(void 0, void 0, void 0, function* () {
        // chrome.tabs.sendMessage(tabs[0].id!, { message: "breakTime" });
        //Execute content script when the alarm fires
        if (tabs.length > 0) {
            console.count("Script executed");
            chrome.storage.local.set({ [alarm.name]: true });
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["dist/content.js"],
            });
        }
    }));
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./scripts/background.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=background.js.map