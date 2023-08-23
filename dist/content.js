/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./scripts/content.ts ***!
  \****************************/

var _a, _b;
var article = document.querySelector("article");
// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
    var text = article.textContent;
    var wordMatchRegExp = /[^\s]+/g; // Regular expression
    var words = (text === null || text === void 0 ? void 0 : text.matchAll(wordMatchRegExp)) || "hello";
    // matchAll returns an iterator, convert to array to get word count
    console.log(words);
    var wordCount = [words].length;
    var readingTime = Math.round(wordCount / 200);
    var badge = document.createElement("p");
    // Use the same styling as the publish information in an article's header
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = "\u23F1\uFE0F ".concat(readingTime, " min read");
    // Support for API reference docs
    var heading = article.querySelector("h1");
    // Support for article docs with date
    var date = (_a = article.querySelector("time")) === null || _a === void 0 ? void 0 : _a.parentNode;
    (_b = (date !== null && date !== void 0 ? date : heading)) === null || _b === void 0 ? void 0 : _b.insertAdjacentElement("afterend", badge);
}

/******/ })()
;
//# sourceMappingURL=content.js.map