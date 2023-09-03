/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./popup/popup.css":
/*!*************************!*\
  !*** ./popup/popup.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************************!*\
  !*** ./scripts/middleware.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ../popup/popup.css */ "./popup/popup.css");
const form = document.querySelector("form");
const timeoutInput = document.querySelector("#timeout");
const waterInput = document.querySelector("#water");
const walkInput = document.querySelector("#walk");
const timeoutLabel = document.querySelector("#timeoutLabel");
const waterLabel = document.querySelector("#waterLabel");
const walkLabel = document.querySelector("#walkLabel");
const notifications = document.querySelector("#notifications");
chrome.storage.local.get(["timeout", "water", "walk", "showNotifications"], (items) => {
    const { timeout, water, walk } = items;
    timeoutInput === null || timeoutInput === void 0 ? void 0 : timeoutInput.setAttribute("value", (timeout === null || timeout === void 0 ? void 0 : timeout.toString()) || "0");
    waterInput === null || waterInput === void 0 ? void 0 : waterInput.setAttribute("value", (water === null || water === void 0 ? void 0 : water.toString()) || "0");
    walkInput === null || walkInput === void 0 ? void 0 : walkInput.setAttribute("value", (walk === null || walk === void 0 ? void 0 : walk.toString()) || "0");
    timeoutLabel.textContent = `Look away from screen - ${timeout} minutes`;
    waterLabel.textContent = `Drink water - ${water} minutes`;
    walkLabel.textContent = `Stretch/Stroll - ${walk} minutes`;
    notifications.checked = items.showNotifications;
});
timeoutInput === null || timeoutInput === void 0 ? void 0 : timeoutInput.addEventListener("input", (e) => {
    //Update the label with the current slider value
    const label = document.querySelector("#timeoutLabel");
    label.textContent = `Look away from screen - ${e.target.value} minutes`;
});
waterInput === null || waterInput === void 0 ? void 0 : waterInput.addEventListener("input", (e) => {
    //Update the label with the current slider value
    const label = document.querySelector("#waterLabel");
    label.textContent = `Drink water - ${e.target.value} minutes`;
});
walkInput === null || walkInput === void 0 ? void 0 : walkInput.addEventListener("input", (e) => {
    //Update the label with the current slider value
    const label = document.querySelector("#walkLabel");
    label.textContent = `Walk - ${e.target.value} minutes`;
});
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const formData = new FormData(form);
    const timeout = parseInt(formData.get("timeout"));
    const water = parseInt(formData.get("water"));
    const walk = parseInt(formData.get("walk"));
    const showNotifications = formData.get("notifications") === "on";
    chrome.runtime.sendMessage({ timeout, water, walk, showNotifications });
});

})();

/******/ })()
;
//# sourceMappingURL=middleware.js.map