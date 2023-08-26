/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/content.css":
/*!*****************************!*\
  !*** ./scripts/content.css ***!
  \*****************************/
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
/*!****************************!*\
  !*** ./scripts/content.ts ***!
  \****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./content.css */ "./scripts/content.css");
if (window.location.href.startsWith("http") ||
    window.location.href.startsWith("https")) {
    // const body = document.querySelector('body');
    var div_1 = document.createElement("div");
    div_1.className = "takeABreak__container";
    var h1 = document.createElement("h1");
    h1.className = "takeABreak__title";
    var timer_1 = 10000;
    var h3_1 = document.createElement("h3");
    h3_1.textContent = "You can continue in ".concat(timer_1, " seconds");
    div_1.appendChild(h1);
    div_1.appendChild(h3_1);
    var countdown_1 = setInterval(function () {
        timer_1 -= 1000;
        h3_1.innerHTML = "You can continue in ".concat(timer_1, " seconds");
    }, 1000);
    document.body.appendChild(div_1);
    var timeoutId_1 = setTimeout(function () {
        div_1.remove();
        clearTimeout(timeoutId_1);
        clearTimeout(countdown_1);
        timer_1 = 10000;
    }, 10000);
}

})();

/******/ })()
;
//# sourceMappingURL=content.js.map