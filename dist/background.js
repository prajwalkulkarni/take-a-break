/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/background.ts":
/*!*******************************!*\
  !*** ./scripts/background.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const types_1 = __webpack_require__(/*! ./types */ "./scripts/types.ts");
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
        //Execute content script when the alarm fires
        if (tabs.length > 0) {
            console.count("Script executed");
            chrome.storage.local.set({ [alarm.name]: true });
            chrome.scripting
                .executeScript({
                target: { tabId: tabs[0].id },
                files: ["dist/content.js"],
            })
                .then(() => {
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "../images/favicon-16x16.png",
                    title: "Take a break",
                    message: "It's time to take a break",
                });
            });
        }
    }));
    //   }
});
function createOrUpdateAlarms() {
    chrome.storage.local.get(["timeout", "water", "walk"], (items) => {
        const { timeout, water, walk } = items;
        chrome.alarms.clearAll();
        if (timeout) {
            chrome.alarms.create(types_1.Alarms.ScreenBreak, {
                delayInMinutes: timeout,
                periodInMinutes: timeout,
            });
        }
        if (water) {
            chrome.alarms.create(types_1.Alarms.Water, {
                delayInMinutes: water,
                periodInMinutes: water,
            });
        }
        if (walk) {
            chrome.alarms.create(types_1.Alarms.Walk, {
                delayInMinutes: walk,
                periodInMinutes: walk,
            });
        }
    });
}


/***/ }),

/***/ "./scripts/types.ts":
/*!**************************!*\
  !*** ./scripts/types.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Alarms = void 0;
var Alarms;
(function (Alarms) {
    Alarms["Water"] = "WATER";
    Alarms["Walk"] = "WALK";
    Alarms["ScreenBreak"] = "SCREEN_BREAK";
})(Alarms || (exports.Alarms = Alarms = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/background.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=background.js.map